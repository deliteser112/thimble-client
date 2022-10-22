import React, { useState, useEffect } from 'react';

import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import { Card, CardContent, Typography, Box } from '@material-ui/core';

// hooks
import useAuth from '../../hooks/useAuth';

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

export default function AlertTrialCard() {
  const theme = useTheme();
  const { user } = useAuth();

  const [expiredDate, setExpiredDate] = useState('');
  const [remainedDays, setRemainedDays] = useState(0);
  const [plan, setPlan] = useState('');

  useEffect(() => {
    setExpiredDate(user.expiredDay);
    setRemainedDays(user.remainedDays);
    setPlan(user.planType.toUpperCase());
  }, [user]);

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
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
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
      </CardContent>
    </Card>
  );
}
