/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
// ----------------------------------------------------------------------
// hooks
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
  getTeamList,
  getOrganizations
} from '../../redux/slices/adminSetting';

// ----------------------------------------------------------------------

import OccupancyRateCard from './OccupancyRateCard';
import StatusRate from './StatusRateCard';
import WorkforceRateCard from './WorkforceRateCard';
import AverageWeekCard from './AverageWeekCard';
import FreePlanCard from './FreePlanCard';

function getFirstDay(y, m) {
  return new Date(y, m, 1);
}

function init() {
  const date = new Date();
  const firstDate = getFirstDay(date.getFullYear(), date.getMonth());
  return firstDate;
}

export default function AnalyticsContent() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { officeList, organizations } = useSelector(
    (state) => state.adminSetting
  );
  const { calendar, allStatus, allUsers } = useSelector(
    (state) => state.general
  );

  const [calendarProps, setCalendarProps] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [allStatuses, setAllStatuses] = useState([]);
  const [allMembers, setAllMembers] = useState([]);

  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const [plan, setPlan] = useState('');

  useEffect(() => {
    setMonth(init().getMonth());
    setYear(init().getFullYear());
  }, []);

  useEffect(() => {
    dispatch(getCalendar());
    dispatch(getOfficeList());
    dispatch(getTeamList());
    dispatch(getOrganizations());
    dispatch(getAllStatusById());
    dispatch(getUsersByCompany());
  }, [dispatch]);

  useEffect(() => {
    setPlan(user.planType.toUpperCase());
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
      setCalendarProps(calendar);
    }
  }, [calendar]);

  useEffect(() => {
    if (organizations.result !== undefined) {
      const { statuses } = organizations.result;

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

  return (
    <Grid container spacing={3}>
      {plan === 'FREE' ? (
        <Grid item xs={12}>
          <FreePlanCard />
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <OccupancyRateCard
              year={year}
              month={month}
              allStatuses={allStatuses}
              schedule={schedule}
              daystatus={calendarProps}
            />
          </Grid>
          <Grid item xs={12}>
            <StatusRate
              year={year}
              month={month}
              allStatuses={allStatuses}
              allMembers={allMembers}
              schedule={schedule}
              daystatus={calendarProps}
            />
          </Grid>
          <Grid item xs={12}>
            <WorkforceRateCard
              year={year}
              month={month}
              allStatuses={allStatuses}
              allMembers={allMembers}
              schedule={schedule}
              daystatus={calendarProps}
            />
          </Grid>
          <Grid item xs={12}>
            <AverageWeekCard />
          </Grid>
        </>
      )}
    </Grid>
  );
}
