/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
// material
import { useTheme } from '@material-ui/core/styles';
import { useParams, useLocation } from 'react-router-dom';

import { Container, Box, Stack, Avatar, Typography } from '@material-ui/core';
// ----------------------------------------------------------------------
// hooks
import useGeneral from '../../hooks/useGeneral';
import useAuth from '../../hooks/useAuth';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getCalendar,
  getCalendarList,
  getAllStatusById,
  getUsersByCompany
} from '../../redux/slices/general';
import {
  getOfficeList,
  getTeamList,
  getOrganizations
} from '../../redux/slices/adminSetting';

import { getUserList } from '../../redux/slices/user';

import CalendarCard from './CalendarCard';
import DayStatusButtonGroup from '../dashboard-component/DayStatusButtonGroup';
import TeamCategoryGroup from '../dashboard-component/TeamCategoryGroup';

import DetailOfficeButtons from '../dashboard-component/DetailOfficeButtons';
import DetailTeamButtons from '../dashboard-component/DetailTeamButtons';

import RightSideBar from './RightSideBar';

export default function CalendarContent() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { updateSchedule } = useGeneral();
  const { user } = useAuth();
  const { officeList, teamList } = useSelector((state) => state.adminSetting);
  const { calendar, calendarList, allStatus, allUsers } = useSelector(
    (state) => state.general
  );
  const { userList } = useSelector((state) => state.user);
  const { organizations } = useSelector((state) => state.adminSetting);

  const { pathname } = useLocation();
  const { userId } = useParams();
  const isDetail = pathname.includes('detail');
  const currentCalendar = calendarList.find(
    (calendar) => calendar.userId === Number(userId)
  );

  const currentUser = userList.find((user) => user.id === Number(userId));

  // startind the code

  const [newCalendar, setNewCalendar] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamIds, setTeamIds] = useState([]);

  const [offices, setOffices] = useState([]);
  const [officeIds, setOfficeIds] = useState(initialStatus);

  const [calendarProps, setCalendarProps] = useState([]);

  const [todayTitle, setTodayTitle] = useState('');

  const [userInfo, setUserInfo] = useState({});

  // calendar setting
  const [cToday, setCToday] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [allStatuses, setAllStatuses] = useState([]);
  const [allMembers, setAllMembers] = useState([]);

  const [isWorking, setIsWorking] = useState([]);

  // right side bar user setting
  const [scheduleUsers, setScheduleUsers] = useState([]);
  const [notStatusUsers, setNotStatusUsers] = useState([]);

  // detail info

  const [cUser, setCUser] = useState({});

  useEffect(() => {
    dispatch(getCalendar());
    dispatch(getCalendarList());
    dispatch(getOfficeList());
    dispatch(getTeamList());
    dispatch(getUserList());
    dispatch(getOrganizations());
    dispatch(getAllStatusById());
    dispatch(getUsersByCompany());
  }, [dispatch]);

  useEffect(() => {
    if (
      isDetail &&
      currentCalendar !== undefined &&
      currentUser !== undefined
    ) {
      const { sch } = currentCalendar;
      setNewCalendar(sch);
      setCUser(currentUser);

      const { officeIds, teamIds } = currentUser;
      const OfficeStatus = [];
      officeList.map((office) => {
        officeIds.map((officeId) => {
          if (office.id === Number(officeId)) {
            const data = {
              id: office.id,
              label: office.name,
              icon: office.emoji
            };
            OfficeStatus.push(data);
          }
        });
      });

      const TeamStatus = [];
      teamList.map((team) => {
        teamIds.map((teamId) => {
          if (team.id === Number(teamId)) {
            const data = {
              id: team.id,
              label: team.name,
              color: team.color
            };
            TeamStatus.push(data);
          }
        });
      });

      setOffices([...OfficeStatus]);
      setTeams([...TeamStatus]);
    } else {
      setNewCalendar(calendar);
      const { offices, teams, roles } = user;
      const OfficeStatus = [];
      const TeamStatus = [];
      if (roles === 'ADMIN') {
        officeList.map((office) => {
          const data = {
            id: office.id,
            label: office.name,
            icon: office.emoji
          };

          OfficeStatus.push(data);
        });

        teamList.map((team) => {
          const data = {
            id: team.id,
            label: team.name,
            color: team.color
          };

          TeamStatus.push(data);
        });
      } else {
        officeList.map((office) => {
          offices.map((uOfficeId) => {
            if (Number(office.id) === Number(uOfficeId)) {
              const data = {
                id: office.id,
                label: office.name,
                icon: office.emoji
              };

              OfficeStatus.push(data);
            }
          });
        });

        teamList.map((team) => {
          teams.map((uTeamId) => {
            if (Number(team.id) === Number(uTeamId)) {
              const data = {
                id: team.id,
                label: team.name,
                color: team.color
              };

              TeamStatus.push(data);
            }
          });
        });
      }

      setOffices([...OfficeStatus]);
      setTeams([...TeamStatus]);
    }
  }, [
    currentCalendar,
    currentUser,
    isDetail,
    calendar,
    officeList,
    teamList,
    user
  ]);

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
    const curr = new Date();
    const today = {
      year: curr.getFullYear(),
      month: curr.getMonth(),
      day: curr.getDate()
    };

    const dayOfweek =
      WeekListTitles[curr.getDay() - 1 < 0 ? 6 : curr.getDay() - 1];
    const tmpMonth = Months[curr.getMonth()];
    const tmpYear = curr.getFullYear();
    const tmpTodaytitle = `${dayOfweek} ${today.day} ${tmpMonth}. ${tmpYear}`;

    setTodayTitle(tmpTodaytitle);

    setCToday(today);
  }, []);

  useEffect(() => {
    if (newCalendar.length > 0) {
      const today = new Date().getDate();
      const tMonth = new Date().getMonth();
      const yearData = [];
      newCalendar.map((months, mIndex) => {
        const curr = new Date();
        curr.setMonth(mIndex);
        const thisMonth = months;

        const monthData = [];

        thisMonth.map((mDay, dIndex) => {
          curr.setDate(dIndex + 1);
          const dayListIndex = curr.getDay() - 1 < 0 ? 6 : curr.getDay() - 1;

          // eslint-disable-next-line prettier/prettier
          const isAvailable = tMonth < mIndex ? true : today <= dIndex + 1 && tMonth === mIndex;

          let isActive = false;

          if (isWorking[curr.getDay()]) {
            isActive = isAvailable;
          }

          const dayObj = {
            id: dIndex + 1,
            weekTitle: `${WeekListTitles[dayListIndex]} ${
              Months[curr.getMonth()]
            } ${dIndex + 1}`,
            icon: mDay.icon,
            detail: {
              morning: { id: mDay.morning.id, type: mDay.morning.type },
              afternoon: { id: mDay.afternoon.id, type: mDay.afternoon.type }
            },
            halfday: mDay.isHalf,
            work: mDay.isWork,
            isActive
          };
          monthData.push(dayObj);
        });
        yearData.push(monthData);
      });

      setCalendarProps(yearData);
    }
  }, [newCalendar, isWorking]);

  useEffect(() => {
    if (organizations.result !== undefined) {
      const { statuses, calendar } = organizations.result;

      const { workDays } = calendar;

      let wDays = [...workDays];
      wDays = wDays.sort();

      const isWorkingArr = [];

      for (let i = 0; i < 7; i += 1) {
        let isWorking = false;
        wDays.map((day) => {
          if (i === day) isWorking = true;
        });
        if (isWorking) isWorkingArr.push(1);
        else isWorkingArr.push(0);
      }

      setIsWorking([...isWorkingArr]);

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
      cToday.month,
      cToday.day
    );

    setNotStatusUsers(notStatus);
    setScheduleUsers(scheduleUsers);
  }, [allStatuses, cToday, allMembers, userInfo]);

  const setStatusProps = (selectedIds) => {
    setOfficeIds(selectedIds);
  };

  const handleTeamSelected = (teamStatus) => {
    setTeamIds(teamStatus);
  };

  const handleClickShowDetail = (year, month, day) => {
    dispatch(getAllStatusById());
    const today = {
      year,
      month,
      day
    };
    setCToday(today);

    const curr = new Date();
    curr.setMonth(month);
    curr.setDate(day);
    const dayOfweek =
      WeekListTitles[curr.getDay() - 1 < 0 ? 6 : curr.getDay() - 1];
    const tmpMonth = Months[curr.getMonth()];
    const tmpYear = curr.getFullYear();
    const tmpTodaytitle = `${dayOfweek} ${day} ${tmpMonth}. ${tmpYear}`;

    setTodayTitle(tmpTodaytitle);
  };

  // change icon when set icon in schedule card
  const changeIcon = (icon1, icon2, detail1, detail2, status, month, day) => {
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
    const CalendarSchedule = calendarProps;
    let settingDay = 0;
    calendarProps.map((months, mIndex) => {
      months.map((schedule, sIndex) => {
        if (mIndex === month && schedule.id === day) {
          CalendarSchedule[mIndex][sIndex].icon = resIcon;
          CalendarSchedule[mIndex][sIndex].halfday = dayStatus;
          CalendarSchedule[mIndex][sIndex].work = true;
          CalendarSchedule[mIndex][sIndex].detail.morning.id = detail1.id;
          CalendarSchedule[mIndex][sIndex].detail.morning.type = detail1.type;
          settingDay = sIndex;
        }
      });
    });

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
    });
    setCalendarProps([...CalendarSchedule]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: -10,
        [theme.breakpoints.down('md')]: { marginTop: 0 }
      }}
    >
      <Container maxWidth="xl">
        <Container
          maxWidth="sm"
          sx={{ [theme.breakpoints.down('md')]: { px: 0 } }}
        >
          {isDetail ? (
            <Box sx={{ mb: 3, mt: 1 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  alt={cUser.name}
                  src={cUser.photoURL}
                  sx={{ width: theme.spacing(10), height: theme.spacing(10) }}
                />
                <Box>
                  <Typography variant="h6" noWrap>
                    {cUser.name}
                  </Typography>
                  <Typography variant="body1" noWrap>
                    {cUser.jobtitle}
                  </Typography>
                </Box>
              </Stack>
              <Box m={3} />
              <Box sx={{ pl: 7 }}>
                <DetailOfficeButtons officeGroups={offices} />
                <DetailTeamButtons
                  teamInitProps={teamIds}
                  daygroups={teams}
                  teamStatusProps={handleTeamSelected}
                />
              </Box>
            </Box>
          ) : (
            <>
              <DayStatusButtonGroup
                officeInitProps={officeIds}
                statusProps={setStatusProps}
                officeGroups={offices}
                isMulti={false}
              />
              <TeamCategoryGroup
                teamInitProps={teamIds}
                daygroups={teams}
                teamStatusProps={handleTeamSelected}
              />
            </>
          )}

          <CalendarCard
            officeFilterId={officeIds[0]}
            allStatuses={allStatuses}
            schedule={schedule}
            daystatus={calendarProps}
            isWorkingArr={isWorking}
            viewDetailByClick={handleClickShowDetail}
          />
        </Container>
      </Container>
      <RightSideBar
        todayTitle={todayTitle}
        daystatus={calendarProps}
        schedule={schedule}
        iconProps={changeIcon}
        cToday={cToday}
        scheduleUsers={scheduleUsers}
        notStatusUsers={notStatusUsers}
        isDetail={isDetail}
        currentUser={cUser}
      />
    </Box>
  );
}

const initialStatus = [1];
const WeekListTitles = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
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
