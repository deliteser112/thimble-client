/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';

import DayGroup from '../dashboard-component/TeamCategoryGroup';

CalendarCard.propTypes = {
  dataProps: PropTypes.object,
  setCalendarProps: PropTypes.func
};

export default function CalendarCard({ dataProps, setCalendarProps }) {
  const [workDays, setWorkDays] = useState([]);
  const [startingDay, setStartingDay] = useState(0);
  const [monthRange, setMonthRange] = useState(1);

  useEffect(() => {
    const cData = dataProps;
    setWorkDays(cData.workDays);
    setStartingDay(cData.startingDay);
    setMonthRange(cData.monthRange);
  }, [dataProps]);

  useEffect(() => {
    const tempCalendar = {};
    tempCalendar.startingDay = startingDay;
    tempCalendar.monthRange = Number(monthRange);
    tempCalendar.workDays = workDays;
    setCalendarProps(tempCalendar);
  }, [monthRange, startingDay, workDays]);

  const handleSelectedDays = (selectedItems) => {
    setWorkDays(selectedItems);
  };

  const handleChangeStartingDay = (e) => {
    setStartingDay(e.target.value);
  };

  const handleChangeMonthRange = (e) => {
    setMonthRange(e.target.value);
  };

  return (
    <Card>
      <CardHeader subheader="CALENDAR" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1"> First day of the week </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Typography variant="body1" sx={{ py: 1 }}>
                  You start to work on
                </Typography>
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Week of day
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={startingDay || 0}
                    onChange={handleChangeStartingDay}
                    label="Week of day"
                  >
                    {WeekDays.map((day, index) => (
                      <MenuItem key={index} value={day.id}>
                        {day.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1"> Working days </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Other days will still be available but in a more discrete way. 98%
              of the time it’s weekends.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DayGroup
              daygroups={days}
              teamInitProps={workDays}
              teamStatusProps={handleSelectedDays}
              sx={{ minWidth: 40 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1"> Range </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              How many months in advance people can set their status:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                id="filled-number"
                label="Months"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                value={monthRange || ''}
                onChange={handleChangeMonthRange}
              />
              <Typography variant="body1" sx={{ py: 2, ml: 2 }}>
                month(s)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const WeekDays = [
  // { id: 0, title: 'Sunday' },
  { id: 1, title: 'Monday' },
  { id: 2, title: 'Tuesday' },
  { id: 3, title: 'Wednesday' },
  { id: 4, title: 'Thursday' },
  { id: 5, title: 'Friday' },
  { id: 6, title: 'Saturday' }
];

const days = [
  {
    id: 0,
    label: 'Su',
    color: '#00AB55'
  },
  {
    id: 1,
    label: 'Mo',
    color: '#00AB55'
  },
  {
    id: 2,
    label: 'Tu',
    color: '#00AB55'
  },
  {
    id: 3,
    label: 'We',
    color: '#00AB55'
  },
  {
    id: 4,
    label: 'Th',
    color: '#00AB55'
  },
  {
    id: 5,
    label: 'Fr',
    color: '#00AB55'
  },
  {
    id: 6,
    label: 'Sa',
    color: '#00AB55'
  }
];
