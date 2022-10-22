/* eslint-disable no-loop-func */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import BaseOptionChart from '../dashboard-component/BaseOptionChart';

// ----------------------------------------------------------------------

function getCategories(monthDays) {
  const categories = [];
  for (let i = 1; i < monthDays + 1; i += 1) {
    categories.push(`${i}`);
  }
  return categories;
}

function getCalendar(status, allStatus, allMembers, schedules, month, year) {
  const monthCalendar = [];

  for (let i = 0; i < status.length; i += 1) {
    const newData = [];
    allStatus.map((stat) => {
      const dData = stat.schedule[month][i];
      const rObj = {
        userId: stat.userId,
        data: dData
      };
      newData.push(rObj);
    });

    const schArr = [];
    let notStatus = [];
    schedules.map((sche) => {
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
            emoji: sche.emoji,
            schTitle: sche.title,
            users: userArr,
            type: 'office',
            capacity: sche.capacity,
            occupancy: parseInt(occupancy)
          };
        } else {
          schObj = {
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
            const userObj = {
              id: userId,
              photoURL: member.photoURL,
              name: member.name
            };
            updatedUsers.push(userObj);
          }
        });
      });
      schArr[sIndex].users = updatedUsers;
    });

    if (notStatus.length > 0) {
      const tmpNotStatus = notStatus;
      const updatedUsers = [];
      tmpNotStatus.map((userId) => {
        allMembers.map((member) => {
          if (userId === member.id) {
            const userObj = {
              id: userId,
              photoURL: member.photoURL,
              name: member.name
            };
            updatedUsers.push(userObj);
          }
        });
      });
      notStatus = updatedUsers;
    } else {
      notStatus = [];
    }

    const dayObj = {};

    dayObj.year = year;
    dayObj.month = month;
    dayObj.day = i;
    dayObj.notStatus = notStatus;
    monthCalendar.push(dayObj);
  }
  return monthCalendar;
}

OccupancyRateCard.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  allStatuses: PropTypes.array,
  allMembers: PropTypes.array,
  schedule: PropTypes.array,
  daystatus: PropTypes.array
};

export default function OccupancyRateCard({
  year,
  month,
  allStatuses,
  allMembers,
  schedule,
  daystatus
}) {
  const [calendar, setCalendar] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [chartData, setChartData] = useState([]);

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}%`;
          }
          return y;
        }
      }
    }
  });

  useEffect(() => {
    setStatuses(['has status', 'no status']);
  }, []);

  useEffect(() => {
    const monthData = daystatus;
    // was changed regarding allStatuses, schedule
    if (
      monthData.length > 0 &&
      allStatuses.length > 0 &&
      allMembers.length > 0 &&
      schedule.length > 0
    ) {
      const calendarInfo = getCalendar(
        monthData[month],
        allStatuses,
        allMembers,
        schedule,
        month,
        year
      );

      setCalendar(calendarInfo);
    }
  }, [daystatus, month, year, allStatuses, schedule, allMembers]);

  useEffect(() => {
    const category = getCategories(calendar.length);
    setCategories(category);
  }, [calendar]);

  useEffect(() => {
    const chartDatas = [];
    statuses.map((status) => {
      const chartObj = {};
      const statusRate = [];
      chartObj.name = `${status}`;
      calendar.map((calen) => {
        let rate = 0;
        const noStatuses = calen.notStatus.length;
        const members = allMembers.length;
        if (status === 'no status') {
          if (noStatuses > 0) {
            rate = (noStatuses / members) * 100;
          }
        } else if (status === 'has status') {
          if (noStatuses > 0) {
            rate = ((members - noStatuses) / members) * 100;
          } else {
            rate = 100;
          }
        }
        statusRate.push(parseInt(rate));
      });
      chartObj.data = statusRate;
      chartDatas.push(chartObj);
    });
    setChartData(chartDatas);
  }, [calendar, statuses, allMembers]);

  return (
    <Card>
      <CardHeader
        title="Status rate"
        subheader="Ratio of set/unset status per day"
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="area"
          series={chartData}
          options={chartOptions}
          height={300}
        />
      </Box>
    </Card>
  );
}
