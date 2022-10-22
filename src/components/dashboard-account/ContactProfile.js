/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';

import { Card, CardContent, Grid, Box } from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';

export default function ContactProfile() {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" placeholder="+XXX..." />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={4}
              label="Best way to contact me?"
              placeholder="slack? voice message? email?"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            variant="contained"
            // pending={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
}
