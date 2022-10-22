/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

CompanyCard.propTypes = {
  dataProps: PropTypes.object,
  setCompanyProps: PropTypes.func
};

export default function CompanyCard({ dataProps, setCompanyProps }) {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [isEmail, setIsEmail] = useState(0);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(0);

  useEffect(() => {
    const cData = dataProps;
    setName(cData.name);
    setDomain(cData.domain);
    setIsEmail(cData.isEmail);
    setIsGoogleSignIn(cData.isGoogleSignIn);
  }, [dataProps]);

  useEffect(() => {
    const tempCompany = {};
    tempCompany.name = name;
    tempCompany.domain = domain;
    tempCompany.isEmail = isEmail;
    tempCompany.isGoogleSignIn = isGoogleSignIn;
    setCompanyProps(tempCompany);
  }, [domain, isEmail, isGoogleSignIn, name]);

  const handleChangeIsEmail = () => {
    setIsEmail(isEmail === 1 ? 0 : 1);
  };

  const handleChangeIsGoogleSignIn = () => {
    setIsGoogleSignIn(isGoogleSignIn === 1 ? 0 : 1);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Card>
      <CardHeader subheader="COMPANY" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1"> Company Name </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              onChange={handleNameChange}
              value={name || ''}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1"> Approved Domains </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Users can sign up with email from these domains:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label={domain}
              disabled
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1"> Allowed providers </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Users can sign up from these providers:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isEmail === 1}
                    onChange={handleChangeIsEmail}
                    name="email+password"
                  />
                }
                label="Email + Password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isGoogleSignIn === 1}
                    onChange={handleChangeIsGoogleSignIn}
                    name="googleSignIn"
                  />
                }
                label="Google Sign In (G Suite)"
              />
              <FormControlLabel
                disabled
                control={<Checkbox name="azure" />}
                label="Microsoft Azure AD*"
              />
              <FormControlLabel
                disabled
                control={<Checkbox name="okata" />}
                label="Okta*"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="caption">*coming soon</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
