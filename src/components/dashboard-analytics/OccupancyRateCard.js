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

function getCalendar(status, allStatus, schedules, month, year) {
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
    const dayObj = {};

    dayObj.year = year;
    dayObj.month = month;
    dayObj.day = i;
    dayObj.officeInfo = schArr;
    monthCalendar.push(dayObj);
  }
  return monthCalendar;
}

OccupancyRateCard.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  allStatuses: PropTypes.array,
  schedule: PropTypes.array,
  daystatus: PropTypes.array
};

export default function OccupancyRateCard({
  year,
  month,
  allStatuses,
  schedule,
  daystatus
}) {
  const [calendar, setCalendar] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offices, setOffices] = useState([]);
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
    if (monthData.length > 0 && allStatuses.length > 0 && schedule.length > 0) {
      const calendarInfo = getCalendar(
        monthData[month],
        allStatuses,
        schedule,
        month,
        year
      );

      setCalendar(calendarInfo);

      const office = [];
      schedule.map((sche) => {
        if (sche.type === 'office') {
          office.push(sche);
        }
      });
      setOffices(office);
    }
  }, [daystatus, month, year, allStatuses, schedule]);

  useEffect(() => {
    const category = getCategories(calendar.length);
    setCategories(category);
  }, [calendar]);

  useEffect(() => {
    const chartDatas = [];
    offices.map((office) => {
      const chartObj = {};
      const occupancy = [];
      chartObj.name = `${office.emoji} ${office.title}`;
      calendar.map((calen) => {
        calen.officeInfo.map((oInfos) => {
          if (office.id === oInfos.id) {
            occupancy.push(oInfos.occupancy);
          }
        });
      });
      chartObj.data = occupancy;
      chartDatas.push(chartObj);
    });
    setChartData(chartDatas);
  }, [calendar, offices]);

  return (
    <Card>
      <CardHeader
        title="Office(s) occupancy rate"
        subheader="Percentage of office occupancy per day"
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
