import React, { useState, useEffect } from 'react';
// material
import { Grid, Box } from '@material-ui/core';
// ----------------------------------------------------------------------
// HOOKS
import useAuth from '../../hooks/useAuth';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrganizations } from '../../redux/slices/adminSetting';

import AlertTrialCard from './AlertTrialCard';
import CompanyCard from './CompanyCard';
import CalendarCard from './CalendarCard';
import FeaturesCard from './FeaturesCard';
import IntegrationCard from './IntegrationCard';
import StatusesCard from './StatusesCard';
import SaveChanges from './SaveChanges';

export default function OrganizationContent() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.adminSetting);

  const [organization, setOrganization] = useState({});
  const [company, setCompany] = useState({});
  const [calendar, setCalendar] = useState({});
  const [features, setFeatures] = useState({});
  const [statuses, setStatuses] = useState({});
  const [isSave, setIsSave] = useState(false);

  const [plan, setPlan] = useState('');

  useEffect(() => {
    setPlan(user.planType.toUpperCase());
  }, [user]);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    const { result } = organizations;
    if (result !== undefined) {
      setCompany(result.company);
      setCalendar(result.calendar);
      setFeatures(result.features);
      setStatuses(result.statuses);
      setOrganization(result);
    }
  }, [organizations]);

  useEffect(() => {
    setIsSave(true);
  }, [organization]);

  const handleCompanySetting = (companySetting) => {
    setOrganization({
      ...organization,
      company: companySetting
    });
  };

  const handleCalendarSetting = (calendarSetting) => {
    setOrganization({
      ...organization,
      calendar: calendarSetting
    });
  };

  const handleFeatureSetting = (featuresSetting) => {
    setOrganization({
      ...organization,
      features: featuresSetting
    });
  };

  const handleStatusSetting = (statusSetting) => {
    setOrganization({
      ...organization,
      statuses: statusSetting
    });
  };

  const handleViewSaveChanges = (isCancel) => {
    setIsSave(!isCancel);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AlertTrialCard />
      </Grid>
      <Grid item md={6} xs={12}>
        <CompanyCard
          dataProps={company}
          setCompanyProps={handleCompanySetting}
        />
        <Box m={3} />
        <IntegrationCard />
      </Grid>
      <Grid item md={6} xs={12}>
        <CalendarCard
          dataProps={calendar}
          setCalendarProps={handleCalendarSetting}
        />
        <Box m={3} />
        <FeaturesCard
          plan={plan}
          dataProps={features}
          setFeatureProps={handleFeatureSetting}
        />
        <Box m={3} />
        <StatusesCard
          plan={plan}
          dataProps={statuses}
          setStatusProps={handleStatusSetting}
        />
      </Grid>
      {isSave && (
        <SaveChanges
          setCancelProps={handleViewSaveChanges}
          saveDataProps={organization}
        />
      )}
    </Grid>
  );
}
