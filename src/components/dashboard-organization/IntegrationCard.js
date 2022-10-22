/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import { useTheme } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  Grid
} from '@material-ui/core';

export default function IntegrationCard() {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader subheader="INTEGRATION" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Box
                component="img"
                src="/static/dashboard/home/slack.svg"
                sx={{
                  width: theme.spacing(8),
                  height: theme.spacing(8),
                  marginRight: theme.spacing(3)
                }}
              />
              <Box sx={{ textAlign: 'left', mt: 1 }}>
                <Typography variant="h5">Synchronize slack</Typography>
                <Typography variant="body1">
                  Your status will always be up-to-date!
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Box m={2} />
          <Grid item xs={12}>
            <Typography variant="subtitle1"> HRIS </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Get your employees holidays directly synced in Café! We won't edit
              any data in your HRIS 🙏
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 3 }}
                startIcon={
                  <Box
                    component="img"
                    src="/static/dashboard/home/payfit.svg"
                  />
                }
              >
                Payfit
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={
                  <Box component="img" src="/static/dashboard/home/lucca.svg" />
                }
              >
                Lucca
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="caption">
              We are working on more integrations, contact us to know more
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
