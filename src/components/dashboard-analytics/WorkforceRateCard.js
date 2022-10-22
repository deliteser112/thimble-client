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
    const statusArr = [];
    schedules.map((sche) => {
      if (sche.type !== 'office') {
        const userArr = [];
        const eachStatuses = [];
        newData.map((user) => {
          if (user.data.isWork) {
            if (user.data.isHalf) {
              if (
                sche.id === user.data.morning.id &&
                sche.type === user.data.morning.type
              ) {
                userArr.push(user.userId);
                eachStatuses.push({
                  id: sche.id,
                  title: sche.title,
                  emoji: sche.emoji,
                  type: sche.type
                });
              }
              if (
                sche.id === user.data.afternoon.id &&
                sche.type === user.data.afternoon.type
              ) {
                userArr.push(user.userId);
                eachStatuses.push({
                  id: sche.id,
                  title: sche.title,
                  emoji: sche.emoji,
                  type: sche.type
                });
              }
            } else if (!user.data.isHalf) {
              if (
                sche.id === user.data.morning.id &&
                sche.type === user.data.morning.type
              ) {
                userArr.push(user.userId);
                eachStatuses.push({
                  id: sche.id,
                  title: sche.title,
                  emoji: sche.emoji,
                  type: sche.type
                });
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

        const sObj = {
          id: sche.id,
          type: sche.type,
          statuses: eachStatuses.length
        };

        statusArr.push(sObj);
      }
    });

    const dayObj = {};

    dayObj.year = year;
    dayObj.month = month;
    dayObj.day = i;
    dayObj.statusArr = statusArr;
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

      const status = [];
      schedule.map((sche) => {
        if (sche.type !== 'office') {
          status.push(sche);
        }
      });

      setStatuses(status);
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
      chartObj.name = `${status.emoji} ${status.title}`;
      calendar.map((calen) => {
        let rate = 0;
        let totalStatues = 0;
        calen.statusArr.map((state) => {
          totalStatues += state.statuses;
        });
        if (totalStatues === 0) {
          totalStatues = 1;
        }
        calen.statusArr.map((state) => {
          if (state.id === status.id && state.type === status.type) {
            rate = (state.statuses / totalStatues) * 100;
          }
        });
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
        title="Workforce distribution"
        subheader="Percentage of each status per day"
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
