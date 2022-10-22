/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import CreditCardIcon from '@material-ui/icons/CreditCard';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';
// import CheckoutDialog from './CheckoutDialog';

// hooks
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
// redux
import { useDispatch, useSelector } from '../../redux/store';

import { getUserList } from '../../redux/slices/user';

const YellowBadge = styled('div')(({ theme }) => ({
  backgroundColor: '#FAF6D0',
  borderRadius: '20px',
  padding: theme.spacing(0.5, 2),
  fontWeight: 800,
  fontSize: 13
}));

const GreyBadge = styled('div')(({ theme }) => ({
  backgroundColor: '#DCE7FB',
  borderRadius: '20px',
  padding: theme.spacing(0.5, 2),
  fontWeight: 800,
  fontSize: 13
}));

const RedBadge = styled('div')(({ theme }) => ({
  backgroundColor: '#FF5050',
  borderRadius: '20px',
  padding: theme.spacing(0.5, 2),
  fontWeight: 800,
  fontSize: 13,
  color: 'white'
}));

PlanStatus.propTypes = {
  planProps: PropTypes.func
};

export default function PlanStatus({ planProps }) {
  const theme = useTheme();
  const { sessionId } = useParams();
  const { user } = useAuth();
  const { createCheckoutSession, updatePaidStatus } = useAdmin();
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.user);

  const [planType, setPlanType] = useState('yearly');
  const [planPrice, setPlanPrice] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [expiredDate, setExpiredDate] = useState('');
  const [remainedDays, setRemainedDays] = useState(0);
  const [plan, setPlan] = useState('');

  useEffect(() => {
    if (sessionId !== undefined && user.customerId !== null) {
      if (sessionId === user.customerId) {
        setPlan('PREMIUM');
        const payData = {
          planType: 'premium',
          isPaid: 1
        };
        updatePaidStatus({ payData });
      }
    }
  }, [sessionId, user]);

  useEffect(() => {
    setExpiredDate(user.expiredDay);
    setRemainedDays(user.remainedDays);
    setPlan(user.planType.toUpperCase());
  }, [user]);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    setActiveUsers(userList.length);
    if (planType === 'yearly') {
      setPlanPrice(userList.length * 5);
      planProps(5);
    } else if (planType === 'monthly') {
      setPlanPrice(userList.length * 7);
      planProps(7);
    }
  }, [planType, userList]);

  const handleRadioChange = (event) => {
    setPlanType(event.target.value);
  };

  const handleClickCheckout = async () => {
    setIsSubmitting(true);
    const payData = {
      trialEnd: remainedDays,
      quantity: activeUsers,
      plan: planType
    };
    const url = await createCheckoutSession({ payData });
    setIsSubmitting(false);
    window.location.href = url;
  };

  return (
    <Card>
      <CardContent
        sx={{
          [theme.breakpoints.down('sm')]: { padding: theme.spacing(2.5, 0) }
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid lightgrey',
            mb: 2,
            padding: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
              display: 'block',
              textAlign: 'center'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                mb: 1,
                display: 'block'
              }
            }}
          >
            <Typography variant="subtitle1" sx={{ mr: 1, py: 0.3 }}>
              Subscription
            </Typography>
            <YellowBadge>{plan}</YellowBadge>
          </Box>
          <Box
            sx={{
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                display: 'block',
                mb: 1
              }
            }}
          >
            {plan === 'TRIAL' && (
              <>
                <Typography>ends on</Typography>
                <Box m={1} />
                <GreyBadge>{expiredDate}</GreyBadge>
                <Box m={1} />
                <RedBadge>{remainedDays} Days Left</RedBadge>
              </>
            )}
          </Box>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="h4">{activeUsers}</Typography>
                  <Typography variant="subtitle1">
                    &nbsp; Active Users
                  </Typography>
                </Box>
                <Typography variant="caption">in the past 30 days</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRight: '1px solid lightgrey',
                  borderLeft: '1px solid lightgrey',
                  [theme.breakpoints.down('sm')]: {
                    borderRight: '0px solid lightgrey',
                    borderLeft: '0px solid lightgrey',
                    display: 'block',
                    textAlign: 'center'
                  }
                }}
              >
                <Box sx={{ textAlign: 'center', mr: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="h4">${planPrice}</Typography>
                    <Typography variant="subtitle1">&nbsp; /month</Typography>
                  </Box>
                  <Typography variant="caption">
                    {activeUsers} active users x ${planPrice}
                  </Typography>
                </Box>
                <Box>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="top"
                      value={planType}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="yearly"
                        control={<Radio color="secondary" />}
                        label="Yearly"
                      />
                      <FormControlLabel
                        value="monthly"
                        control={<Radio color="secondary" />}
                        label="Monthly"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ py: 2, textAlign: 'center' }}>
                <LoadingButton
                  type="button"
                  pending={isSubmitting}
                  disabled={plan === 'PREMIUM' || plan === 'ENTERPRISE'}
                  variant="contained"
                  color="secondary"
                  onClick={handleClickCheckout}
                  startIcon={<CreditCardIcon />}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ minWidth: 210 }}
                >
                  Upgrade plan now
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
