import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';

import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
// utils
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

Heatmap.propTypes = {
  occupancy: PropTypes.number,
  isCalendar: PropTypes.bool
};

export default function Heatmap({ occupancy, isCalendar }) {
  const theme = useTheme();

  const [chatData, setChatData] = useState([0]);
  const [isMobile, setIsMobile] = useState(false);

  const upSm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (occupancy !== undefined) {
      setChatData([occupancy]);
    }
  }, [occupancy]);

  useEffect(() => {
    setIsMobile(upSm);
  }, [upSm]);

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

  return (
    <>
      {isCalendar ? (
        <>
          {isMobile ? (
            <ReactApexChart
              type="radialBar"
              series={chatData}
              options={chartOptions}
              width={50}
              height={50}
            />
          ) : (
            <ReactApexChart
              type="radialBar"
              series={chatData}
              options={chartOptions}
              width={68}
              height={68}
            />
          )}
        </>
      ) : (
        <ReactApexChart
          type="radialBar"
          series={chatData}
          options={chartOptions}
          width={60}
          height={60}
        />
      )}
    </>
  );
}
