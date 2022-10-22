/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';

import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@material-ui/core/styles';
// utils
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

ScheduleHeatmap.propTypes = {
  occupancy: PropTypes.number
};

export default function ScheduleHeatmap({ occupancy}) {
  const theme = useTheme();

  const [chatData, setChatData] = useState([0]);

  useEffect(() => {
    if (occupancy !== undefined) {
      setChatData([occupancy]);
    }
  }, [occupancy]);

  const chartOptions = merge(BaseOptionChart(), {
    colors: {
      ...(chatData[0] > 50 && [theme.palette.warning.main]),
      ...(chatData[0] > 75 && [theme.palette.error.main])
    },
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: 1
          }
        }
      }
    }
  });

  return (<ReactApexChart
    type="radialBar"
    series={chatData}
    options={chartOptions}
    width={45}
    height={45}
  />);
}
