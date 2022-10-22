/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';

import React from 'react';

import { useTheme } from '@material-ui/core/styles';

import { Card, CardContent, Typography, Box } from '@material-ui/core';

import ScheduleButton from '../dashboard-component/ScheduleButton';

WeekSchedule.propTypes = {
  title: PropTypes.string,
  period: PropTypes.string,
  daystatus: PropTypes.array,
  schedule: PropTypes.array,
  iconProps: PropTypes.func
};

export default function WeekSchedule({
  title,
  period,
  daystatus,
  schedule,
  iconProps
}) {
  const theme = useTheme();
  const changeIcon = (icon1, icon2, detail1, detail2, status, index) => {
    iconProps(icon1, icon2, detail1, detail2, status, index);
  };

  return (
    <Card>
      <CardContent
        sx={{
          padding: theme.spacing(3, 1),
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
            margin: 'auto'
          }
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 5 }}>
          {title}
          <span style={{ fontSize: '15px', color: 'grey' }}>({period})</span>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 550,
            margin: 'auto'
          }}
        >
          {daystatus.map((day, index) => (
            <ScheduleButton
              key={day.id}
              weekday={day.weekday}
              icon={day.icon}
              halfday={day.halfday}
              work={day.work}
              detailInfo={day.detail}
              weekTitle={day.weekTitle}
              schedule={schedule}
              dayIndex={index}
              isActive={day.isActive}
              iconProps={changeIcon}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
