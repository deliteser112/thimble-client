/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';

import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { CardContent, IconButton, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrganizations } from '../../redux/slices/adminSetting';

import DayScheduleButton from '../dashboard-component/DayScheduleButton';

const Weeks = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
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
const MonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function init() {
  const date = new Date();
  const firstDate = getFirstDay(date.getFullYear(), date.getMonth());
  return firstDate;
}

function getDaybyWeek(year, month) {
  const monthCalendar = [];
  let day = 0;
  let monthday = MonthDays[month];
  const firstDay = getFirstDay(year, month).getDay();
  const startPos = firstDay - 1 < 0 ? 6 : firstDay - 1; // when first day of this month is Sunday.
  if (month === 1) monthday = year % 4 === 0 ? 29 : monthday; // in case of leap year
  const endPos = startPos + monthday - 1;

  for (let i = 0; i < 42; i += 1) {
    // the position of first day of this month.
    if (i < startPos) monthCalendar[i] = -1;
    else if (i > endPos) monthCalendar[i] = -1;
    else {
      day += 1;
      monthCalendar[i] = day;
    }
  }

  const res = [];
  for (let i = 0; i < 42; i += 7) {
    const row = [];
    for (let j = 0, k = i; j < 7; j += 1, k += 1) {
      row.push(monthCalendar[k]); // save by week.
    }
    res.push(row);
  }
  if (res[5][0] === -1) res.pop();
  return res;
}

// eslint-disable-next-line prettier/prettier
function getCalendar(days, status, allStatus, schedules, isWorkingArr, month, year) {
  const monthCalendar = [];

  days.map((weekdays) => {
    const weeks = [];
    for (let dIndex = 0; dIndex < weekdays.length; dIndex += 1) {
      const dayObj = {};
      for (let i = 0; i < status.length; i += 1) {
        dayObj.day = weekdays[dIndex];
        if (weekdays[dIndex] - 1 === i) {
          // set occupancy by day
          const newData = [];
          allStatus.map((stat) => {
            const dData = stat.schedule[month][weekdays[dIndex] - 1];
            const rObj = {
              userId: stat.userId,
              data: dData
            };
            newData.push(rObj);
          });

          const schArr = [];
          schedules.map((sche) => {
            if (sche.type === 'office') {
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
              let schObj = {};
              const occupancy = (userArr.length / sche.capacity) * 100;
              schObj = {
                id: sche.id,
                schTitle: sche.title,
                users: userArr,
                capacity: sche.capacity,
                occupancy: parseInt(occupancy)
              };
              schArr.push(schObj);
            }
          });

          const today = new Date().getDate();
          const thisMonth = new Date().getMonth();

          const isAvailable =
            thisMonth < month
              ? true
              : today <= weekdays[dIndex] + 1 && thisMonth === month;

          let isActive = false;

          if (isWorkingArr[(dIndex + 1) % 7]) {
            isActive = isAvailable;
          }

          dayObj.year = year;
          dayObj.month = month;
          dayObj.day = weekdays[dIndex];
          dayObj.officeInfo = schArr;
          dayObj.icon = status[i].icon;
          dayObj.halfday = status[i].halfday;
          dayObj.selected = false;
          dayObj.isActive = isActive;
          break;
        }
      }
      weeks.push(dayObj);
    }
    monthCalendar.push(weeks);
  });
  return monthCalendar;
}

function getFirstDay(y, m) {
  return new Date(y, m, 1);
}

function getMonthNamebyNumber(month) {
  return Months[month];
}

// styling conponent
const GridContainer = styled('div')(() => ({
  display: 'flex'
}));

const GridItem = styled('div')(() => ({
  flex: 1
}));

CalendarCard.propTypes = {
  allStatuses: PropTypes.array,
  schedule: PropTypes.array,
  daystatus: PropTypes.array,
  officeFilterId: PropTypes.number,
  isWorkingArr: PropTypes.array,
  viewDetailByClick: PropTypes.func
};

export default function CalendarCard({
  daystatus,
  allStatuses,
  schedule,
  officeFilterId,
  isWorkingArr,
  viewDetailByClick
}) {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { organizations } = useSelector((state) => state.adminSetting);

  const [month, setMonth] = useState(init().getMonth());
  const [year, setYear] = useState(init().getFullYear());
  const [calendar, setCalendar] = useState([]);

  const [count, setCount] = useState(0);
  const [isDisableNext, setIsDisableNext] = useState(false);
  const [isDisableBack, setIsDisableBack] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    const { result } = organizations;
    let mRange = 0;
    if (result !== undefined) {
      mRange = result.calendar.monthRange;
      const isOdd = mRange % 2;
      setMin(1);
      if (isOdd) {
        setMax(mRange);
        setCount((mRange - 1) / 2 + 1);
      } else {
        setMax(mRange + 1);
        setCount(mRange / 2 + 1);
      }
    }
  }, [organizations]);

  useEffect(() => {
    const monthData = daystatus;
    // was changed regarding allStatuses, schedule
    if (monthData.length > 0) {
      const days = getDaybyWeek(year, month);
      const calendarInfo = getCalendar(
        days,
        monthData[month],
        allStatuses,
        schedule,
        isWorkingArr,
        month,
        year
      );

      setCalendar(calendarInfo);
    }
  }, [daystatus, month, year, isWorkingArr]);
  // }, [daystatus, month, year, allStatuses, schedule]);

  useEffect(() => {
    if (count < max) {
      setIsDisableNext(false);
    }
    if (count > min) {
      setIsDisableBack(false);
    }
  }, [count]);

  const handleBackMonth = () => {
    const newCount = count - 1;
    if (newCount < min) {
      setIsDisableBack(true);
    } else {
      let m = month - 1;
      let y = year;
      y = m < 0 ? year - 1 : year;
      m = m < 0 ? 11 : m;
      setYear(y);
      setMonth(m);
      setCount(newCount);
    }
  };

  const handleNextMonth = () => {
    const newCount = count + 1;
    if (newCount > max) {
      setIsDisableNext(true);
    } else {
      let m = month + 1;
      let y = year;
      y = m > 11 ? year + 1 : year;
      m = m > 11 ? 0 : m;
      setYear(y);
      setMonth(m);
      setCount(newCount);
    }
  };

  const handleSelected = (selected, year, month, day) => {
    const agenda = calendar;
    calendar.map((weeks, wIndex) => {
      weeks.map((item, dIndex) => {
        agenda[wIndex][dIndex].selected = false;
        if (item.day === day) agenda[wIndex][dIndex].selected = selected;
      });
    });
    setCalendar([...agenda]);
    viewDetailByClick(year, month, day);
  };

  return (
    <Card>
      <CardContent
        sx={{
          padding: theme.spacing(2, 3),
          [theme.breakpoints.down('md')]: { padding: theme.spacing(1, 0.2) }
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <IconButton
            disabled={isDisableBack}
            aria-label="delete"
            onClick={handleBackMonth}
          >
            <ArrowBackIosIcon fontSize="medium" />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {getMonthNamebyNumber(month)} {year}
          </Typography>
          <IconButton
            disabled={isDisableNext}
            aria-label="delete"
            onClick={handleNextMonth}
          >
            <ArrowForwardIosIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Box m={1} />
        <Box sx={{ textAlign: 'center' }}>
          <GridContainer spacing={2}>
            {Weeks.map((week, index) => (
              <GridItem key={index}>
                <Typography variant="caption">{week}</Typography>
              </GridItem>
            ))}
          </GridContainer>
        </Box>
        <Box m={1} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {calendar.map((weeks, wIndex) => (
            <GridContainer spacing={3} key={wIndex}>
              {weeks.map((day, dIndex) => (
                <GridItem key={dIndex}>
                  {day.day > 0 && (
                    <DayScheduleButton
                      year={day.year}
                      month={day.month}
                      day={day.day}
                      officeFilterId={officeFilterId}
                      officeInfo={day.officeInfo}
                      icon={day.icon}
                      halfday={day.halfday}
                      Selection={handleSelected}
                      isSelected={day.selected}
                      isActive={day.isActive}
                    />
                  )}
                </GridItem>
              ))}
            </GridContainer>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
