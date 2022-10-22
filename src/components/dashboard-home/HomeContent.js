/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import { Container, Typography, Box, useMediaQuery } from '@material-ui/core';
// ----------------------------------------------------------------------

import WeekScheduleCard from './WeekScheduleCard';
import WeekList from './WeekList';
import RightSideBar from './RightSideBar';
import MobileViewDetail from './MobileViewDetail';
import MobileWeekView from './MobileWeekView';

// hooks
import useGeneral from '../../hooks/useGeneral';
import useAuth from '../../hooks/useAuth';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getCalendar,
  getAllStatusById,
  getUsersByCompany
} from '../../redux/slices/general';
import {
  getOfficeList,
  getOrganizations
} from '../../redux/slices/adminSetting';

const SpaceStyle = styled('div')(({ theme }) => ({
  height: theme.spacing(4)
}));

function createObj(
  mIndex,
  mDay,
  day,
  weekCount,
  curr,
  scheduleUsers,
  isWorkingArr
) {
  const w = weekCount % 7;
  let isOffice = false;
  let officeInfos = [];
  scheduleUsers.map((scheUser) => {
    if (
      scheUser.id === mDay.morning.id &&
      scheUser.type === mDay.morning.type
    ) {
      isOffice = true;
      officeInfos = scheUser;
    }
  });

  const today = new Date().getDate();
  const thisMonth = new Date().getMonth();

  const isAvailable =
    thisMonth < curr.getMonth()
      ? true
      : today <= mIndex + 1 && thisMonth === curr.getMonth();

  let isActive = false;

  if (isWorkingArr[w]) {
    isActive = isAvailable;
  }

  const dayObj = {
    id: mIndex,
    month: curr.getMonth(),
    week: w,
    weekday: `${Weeks[w]} ${day}`,
    weekTitle: `${WeekListTitles[w]} ${Months[curr.getMonth()]} ${day}`,
    icon: mDay.icon,
    detail: {
      morning: { id: mDay.morning.id, type: mDay.morning.type },
      afternoon: { id: mDay.afternoon.id, type: mDay.afternoon.type }
    },
    halfday: mDay.isHalf,
    work: mDay.isWork,
    isOffice,
    officeInfos,
    isActive
  };
  return dayObj;
}

function getTitle(firstmonth, lastmonth, firstday, lastday) {
  return `${Months[firstmonth]} ${firstday} - ${Months[lastmonth]} ${lastday}`;
}

function getTodayTitle(month, day) {
  const curr = new Date();
  curr.setMonth(month);
  curr.setDate(day);
  const dayOfweek = WeekListTitles[curr.getDay() < 0 ? 6 : curr.getDay()];
  const tmpMonth = Months[curr.getMonth()];
  const tmpYear = curr.getFullYear();
  const tmpTodaytitle = `${dayOfweek} ${day} ${tmpMonth}. ${tmpYear}`;
  return tmpTodaytitle;
}

function getScheduleUsersInfo(
  userInfo,
  allStatuses,
  allMembers,
  schedule,
  cMonth,
  cToday
) {
  const resData = {};
  const newData = [];

  allStatuses.map((status) => {
    const dData = status.schedule[cMonth][cToday - 1];
    const rObj = {
      userId: status.userId,
      data: dData
    };
    newData.push(rObj);
  });

  let schArr = [];
  let notStatus = [];
  schedule.map((sche) => {
    const userArr = [];
    newData.map((user) => {
      if (user.data.isWork) {
        if (user.data.isHalf) {
          if (
            sche.id === user.data.morning.id &&
            sche.type === user.data.morning.type
          ) {
            userArr.push(user.userId);
          } else if (
            sche.id === user.data.afternoon.id &&
            sche.type === user.data.afternoon.type
          ) {
            userArr.push(user.userId);
          }
        } else if (!user.data.isHalf) {
          if (
            sche.id === user.data.morning.id &&
            sche.type === user.data.morning.type
          ) {
            userArr.push(user.userId);
          }
        }
      }
    });
    if (userArr.length > 0) {
      let schObj = {};
      if (sche.type === 'office') {
        const occupancy = (userArr.length / sche.capacity) * 100;
        schObj = {
          id: sche.id,
          emoji: sche.emoji,
          schTitle: sche.title,
          users: userArr,
          type: 'office',
          capacity: sche.capacity,
          occupancy: parseInt(occupancy)
        };
      } else {
        schObj = {
          id: sche.id,
          emoji: sche.emoji,
          schTitle: sche.title,
          users: userArr,
          type: 'status'
        };
      }
      schArr.push(schObj);
    }
  });

  newData.map((user) => {
    let isSet = false;
    schArr.map((sUser) => {
      for (let i = 0; i < sUser.users.length; i += 1) {
        if (user.userId === sUser.users[i]) {
          isSet = true;
          break;
        }
      }
    });
    if (!isSet) {
      notStatus.push(user.userId);
    }
  });

  const tmpSchArr = schArr;
  tmpSchArr.map((sche, sIndex) => {
    const updatedUsers = [];
    sche.users.map((userId) => {
      allMembers.map((member) => {
        if (userId === member.id) {
          let isTeam = false;
          if (userInfo.teams.length > 0) {
            for (let i = 0; i < userInfo.teams.length; i += 1) {
              for (let j = 0; j < member.teamIds.length; j += 1) {
                if (Number(userInfo.teams[i]) === member.teamIds[j]) {
                  isTeam = true;
                  break;
                }
              }
            }
          }
          const userObj = {
            id: userId,
            photoURL: member.photoURL,
            name: member.name,
            isTeam
          };
          updatedUsers.push(userObj);
        }
      });
    });
    schArr[sIndex].users = updatedUsers;
    const tmpSchArr = schArr;
    schArr = [];
    for (let i = 0; i < tmpSchArr.length; i += 1) {
      let isTeam = false;
      for (let j = 0; j < tmpSchArr[i].users.length; j += 1) {
        if (tmpSchArr[i].users[j].isTeam) {
          isTeam = true;
          break;
        }
      }
      if (isTeam) {
        schArr.push(tmpSchArr[i]);
      }
    }
    for (let i = 0; i < tmpSchArr.length; i += 1) {
      let isTeam = false;
      for (let j = 0; j < tmpSchArr[i].users.length; j += 1) {
        if (tmpSchArr[i].users[j].isTeam) {
          isTeam = true;
          break;
        }
      }
      if (!isTeam) {
        schArr.push(tmpSchArr[i]);
      }
    }
  });

  if (notStatus.length > 0) {
    const tmpNotStatus = notStatus;
    const updatedUsers = [];
    tmpNotStatus.map((userId) => {
      allMembers.map((member) => {
        if (userId === member.id) {
          let isTeam = false;
          if (userInfo.teams.length > 0) {
            for (let i = 0; i < userInfo.teams.length; i += 1) {
              for (let j = 0; j < member.teamIds.length; j += 1) {
                if (Number(userInfo.teams[i]) === member.teamIds[j]) {
                  isTeam = true;
                  break;
                }
              }
            }
          }
          const userObj = {
            id: userId,
            photoURL: member.photoURL,
            name: member.name,
            isTeam
          };
          updatedUsers.push(userObj);
        }
      });
    });

    notStatus = updatedUsers;
    resData.notStatus = notStatus;
  } else {
    resData.notStatus = [];
  }
  resData.scheduleUsers = schArr;
  return resData;
}

export default function HomeContent() {
  const theme = useTheme();
  const { updateSchedule } = useGeneral();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { calendar, allStatus, allUsers } = useSelector(
    (state) => state.general
  );
  const { officeList, organizations } = useSelector(
    (state) => state.adminSetting
  );

  const [startingDay, setStartingDay] = useState(0);
  const [workingDays, setWorkingDays] = useState([]);
  const [thisWeekSchedule, setThisWeekSchedule] = useState([]);
  const [thisWeekTitle, setThisWeekTitle] = useState('');
  const [todayTitle, setTodayTitle] = useState('');
  const [dayofweek, setDayOfWeek] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [allStatuses, setAllStatuses] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [cMonth, setCMonth] = useState(0);
  const [cToday, setCToday] = useState(1);
  const [firstDay, setFirstDay] = useState(0);
  const [lastDay, setLastDay] = useState(0);

  const [userInfo, setUserInfo] = useState({});

  // right side bar user setting
  const [scheduleUsers, setScheduleUsers] = useState([]);
  const [notStatusUsers, setNotStatusUsers] = useState([]);

  // detail dialog
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    dispatch(getAllStatusById());
    dispatch(getCalendar());
    dispatch(getOrganizations());
    dispatch(getOfficeList());
    dispatch(getUsersByCompany());
  }, [dispatch]);

  useEffect(() => {
    const curr = new Date();
    const today = curr.getDate();
    const dayOfweek =
      WeekListTitles[curr.getDay() - 1 < 0 ? 6 : curr.getDay() - 1];
    const tmpMonth = Months[curr.getMonth()];
    const tmpYear = curr.getFullYear();
    const tmpTodaytitle = `${dayOfweek} ${today} ${tmpMonth}. ${tmpYear}`;

    setCMonth(curr.getMonth());
    setDayOfWeek(curr.getDay());
    setTodayTitle(tmpTodaytitle);
  }, []);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    if (allStatus.length > 0) {
      setAllStatuses(allStatus);
    }
  }, [allStatus]);

  useEffect(() => {
    if (allUsers.length > 0) {
      setAllMembers(allUsers);
    }
  }, [allUsers]);

  useEffect(() => {
    if (calendar.length > 0) {
      const curr = new Date();
      const thisMonth = calendar[curr.getMonth()];
      const nextMonth = calendar[curr.getMonth() + 1];

      // setCMonth(curr.getMonth());

      let first = 0;
      let last = 0;
      first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      last = first + 6; // last day is the first day + 6

      let tmpFirstDay = 0;
      let tmpStartingDay = startingDay;
      let wDays = [...workingDays];
      wDays = wDays.sort();
      for (let i = first; i <= last; i += 1) {
        curr.setDate(i);
        const thisDay = curr.getDay();
        if (thisDay === tmpStartingDay) {
          if (wDays.indexOf(tmpStartingDay) !== -1) {
            tmpFirstDay = i;
            break;
          } else {
            tmpStartingDay += 1;
          }
        }
      }

      if (tmpFirstDay === 0) {
        for (let i = first; i <= last; i += 1) {
          curr.setDate(i);
          const thisDay = curr.getDay();
          if (wDays.length > 0) {
            if (thisDay === wDays[0]) {
              tmpFirstDay = i;
              break;
            }
          }
        }
      }

      first = tmpFirstDay;
      last = first + 4;

      setFirstDay(first);
      setLastDay(last);

      const fMonth = new Date();
      const eMonth = new Date();
      const fday = new Date(fMonth.setDate(first)).getDate();
      const eday = new Date(eMonth.setDate(last)).getDate();

      const isWorkingArr = [];

      for (let i = 0; i < 7; i += 1) {
        let isWorking = false;
        wDays.map((day) => {
          if (i === day) isWorking = true;
        });
        if (isWorking) isWorkingArr.push(1);
        else isWorkingArr.push(0);
      }

      const thisWeekSchedules = [];

      const tmpDate = new Date();
      tmpDate.setDate(fday);
      let weekCount = tmpDate.getDay();
      const title = getTitle(fMonth.getMonth(), eMonth.getMonth(), fday, eday);
      setThisWeekTitle(title);

      if (fMonth.getMonth() === eMonth.getMonth()) {
        // schedule setting
        thisMonth.map((mDay, mIndex) => {
          const day = mIndex + 1;
          fMonth.setDate(day);
          if (fday <= day && day <= eday) {
            const { scheduleUsers } = getScheduleUsersInfo(
              userInfo,
              allStatuses,
              allMembers,
              schedule,
              fMonth.getMonth(),
              day
            );
            // eslint-disable-next-line prettier/prettier
            const dayObj = createObj(mIndex, mDay, day, weekCount, fMonth, scheduleUsers, isWorkingArr);
            thisWeekSchedules.push(dayObj);
            weekCount += 1;
          }
        });
      } else {
        // schedule setting
        thisMonth.map((mDay, mIndex) => {
          const day = mIndex + 1;
          fMonth.setDate(day);
          if (day >= fday) {
            const { scheduleUsers } = getScheduleUsersInfo(
              userInfo,
              allStatuses,
              allMembers,
              schedule,
              fMonth.getMonth(),
              day
            );
            // eslint-disable-next-line prettier/prettier
            const dayObj = createObj(mIndex, mDay, day, weekCount, fMonth, scheduleUsers, isWorkingArr);
            thisWeekSchedules.push(dayObj);
            weekCount += 1;
          }
        });
        // schedule setting
        nextMonth.map((mDay, mIndex) => {
          const day = mIndex + 1;
          eMonth.setDate(day);
          if (day <= eday) {
            const { scheduleUsers } = getScheduleUsersInfo(
              userInfo,
              allStatuses,
              allMembers,
              schedule,
              eMonth.getMonth(),
              day
            );
            // eslint-disable-next-line prettier/prettier
            const dayObj = createObj(mIndex, mDay, day, weekCount, eMonth, scheduleUsers, isWorkingArr);
            thisWeekSchedules.push(dayObj);
            weekCount += 1;
          }
        });
      }

      setThisWeekSchedule(thisWeekSchedules);
    }
  }, [calendar, allStatuses, startingDay, allMembers, schedule, userInfo]);

  useEffect(() => {
    if (organizations.result !== undefined) {
      const { statuses, calendar } = organizations.result;

      setStartingDay(calendar.startingDay);
      setWorkingDays(calendar.workDays);

      const schedules = [];
      const { basicList, customList } = statuses;
      officeList.map((office) => {
        const rowObj = {
          id: office.id,
          type: 'office',
          emoji: office.emoji,
          title: office.name,
          capacity: office.capacity
        };
        schedules.push(rowObj);
      });

      basicList.map((basic) => {
        if (basic.isActive > 0) {
          const rowObj = {
            id: basic.id,
            type: 'basic',
            emoji: basic.emoji,
            title: basic.title
          };
          schedules.push(rowObj);
        }
      });

      customList.map((custom) => {
        if (custom.isActive > 0) {
          const rowObj = {
            id: custom.id,
            type: 'custom',
            emoji: custom.emoji,
            title: custom.title
          };
          schedules.push(rowObj);
        }
      });
      setSchedule(schedules);
    }
  }, [organizations, officeList]);

  useEffect(() => {
    const { notStatus, scheduleUsers } = getScheduleUsersInfo(
      userInfo,
      allStatuses,
      allMembers,
      schedule,
      cMonth,
      cToday
    );

    setNotStatusUsers(notStatus);
    setScheduleUsers(scheduleUsers);
  }, [allStatuses, cMonth, cToday, allMembers, userInfo]);

  // change icon when set icon in schedule card
  const changeIcon = (icon1, icon2, detail1, detail2, status, index) => {
    let emoji1 = '';
    let emoji2 = '';
    let resIcon = '';
    schedule.map((item, i) => {
      if (i === icon1) emoji1 = item.emoji;
      if (i === icon2) emoji2 = item.emoji;
    });
    let dayStatus = status;
    if (icon1 === icon2) dayStatus = false;
    resIcon = dayStatus ? `${emoji1}${emoji2}` : emoji1;
    const ThisWeekSchedule = thisWeekSchedule;
    let settingDay = 0;
    let weekTitle = '';
    thisWeekSchedule.map((schedule, sIndex) => {
      if (sIndex === index) {
        ThisWeekSchedule[sIndex].icon = resIcon;
        ThisWeekSchedule[sIndex].halfday = dayStatus;
        ThisWeekSchedule[sIndex].work = true;
        ThisWeekSchedule[sIndex].detail.morning.id = detail1.id;
        ThisWeekSchedule[sIndex].detail.morning.type = detail1.type;
        settingDay = ThisWeekSchedule[sIndex].id;
        weekTitle = ThisWeekSchedule[sIndex].weekTitle;
      }
    });

    const monthText = weekTitle.split(' ')[1];
    const month = reverseMonths[monthText];

    const updatedSchedule = {
      month,
      day: settingDay,
      emoji: resIcon,
      morning: detail1,
      afternoon: detail2,
      isHalf: dayStatus,
      isWork: true
    };

    updateSchedule({ updatedSchedule }).then(() => {
      dispatch(getAllStatusById());
      dispatch(getCalendar());
    });
  };

  const initShowDetail = (day, selectedIndex) => {
    dispatch(getAllStatusById());
    setCToday(day);

    const curr = new Date();
    const tmpTodaytitle = getTodayTitle(curr.getMonth(), day);
    setDayOfWeek(selectedIndex);
    setTodayTitle(tmpTodaytitle);
  };

  const handleClickShowDetail = (id, month, selectedIndex) => {
    const day = id + 1;
    dispatch(getAllStatusById());
    setCMonth(month);
    setCToday(day);

    const tmpTodaytitle = getTodayTitle(month, day);
    setDayOfWeek(selectedIndex);
    setTodayTitle(tmpTodaytitle);
    setShowMobileDetail(true);
  };

  const handleClickShowMobileDetail = (id, month, selectedIndex) => {
    const day = id + 1;
    dispatch(getAllStatusById());
    setCMonth(month);
    setCToday(day);

    const tmpTodaytitle = getTodayTitle(month, day);
    setDayOfWeek(selectedIndex);
    setTodayTitle(tmpTodaytitle);
  };

  const handleShowMobileDetail = (isView) => {
    setShowMobileDetail(isView);
  };

  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="h1"
          paragraph
          sx={{ textAlign: 'center' }}
        >
          Welcome to Thimble
        </Typography>
        <Container
          maxWidth="sm"
          sx={{ [theme.breakpoints.down('md')]: { px: 0 } }}
        >
          <WeekScheduleCard
            title="This Week "
            period={thisWeekTitle}
            daystatus={thisWeekSchedule}
            schedule={schedule}
            iconProps={changeIcon}
          />
          <SpaceStyle />
          <WeekList
            firstDay={firstDay}
            lastDay={lastDay}
            daystatus={thisWeekSchedule}
            dayIndex={dayofweek}
            viewDetailByClick={handleClickShowDetail}
            initShowDetail={initShowDetail}
          />
          <SpaceStyle />
        </Container>
      </Container>
      <RightSideBar
        todayTitle={todayTitle}
        daystatus={thisWeekSchedule}
        schedule={schedule}
        iconProps={changeIcon}
        dayIndex={dayofweek}
        scheduleUsers={scheduleUsers}
        notStatusUsers={notStatusUsers}
      />
      <Box sx={{ backgroundColor: 'red !important' }}>
        {showMobileDetail && !upLg && (
          <>
            <MobileViewDetail
              todayTitle={todayTitle}
              daystatus={thisWeekSchedule}
              schedule={schedule}
              iconProps={changeIcon}
              dayIndex={dayofweek}
              scheduleUsers={scheduleUsers}
              notStatusUsers={notStatusUsers}
              showDetail={handleShowMobileDetail}
            />
            <MobileWeekView
              daystatus={thisWeekSchedule}
              dayIndex={dayofweek}
              viewDetailByClick={handleClickShowMobileDetail}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

const Weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const WeekListTitles = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Set',
  'Oct',
  'Nov',
  'Dec'
];

const reverseMonths = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Set: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};
