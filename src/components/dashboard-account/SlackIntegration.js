import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import { Button, Typography, Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

export default function SlackIntegration() {
  const handleClick = () => {
    console.log('Hello');
  };
  const theme = useTheme();
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        sx={{
          marginTop: '20px',
          width: '600px',
          py: theme.spacing(2),
          px: theme.spacing(3),
          borderRadius: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            px: theme.spacing(2),
            width: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/dashboard/home/slack.svg"
              sx={{
                width: theme.spacing(6),
                height: theme.spacing(6),
                marginRight: theme.spacing(3)
              }}
            />
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="subtitle1">Synchronize slack</Typography>
              <Typography variant="caption">
                Your status will always be up-to-date!
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#2E2836',
              borderRadius: theme.spacing(3),
              py: 1.5,
              px: 3,
              [theme.breakpoints.down('md')]: {
                display: 'none'
              }
            }}
          >
            <Typography variant="subtitle1" color="white">
              Synchronize
            </Typography>
          </Box>
        </Box>
      </Button>
    </div>
  );
}
