/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';

import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Checkbox
} from '@material-ui/core';

const ScheduleDivider = styled('div')(() => ({
  position: 'absolute',
  zIndex: 10,
  width: '2px',
  height: '40px',
  borderRadius: '8px',
  backgroundColor: '#e7ecf5',
  transform: 'rotate(15deg)'
}));

FeaturesCard.propTypes = {
  plan: PropTypes.string,
  dataProps: PropTypes.object,
  setFeatureProps: PropTypes.func
};

export default function FeaturesCard({ dataProps, setFeatureProps, plan }) {
  const theme = useTheme();

  const [isHalfDays, setIsHalfDays] = useState(0);
  const [isCities, setIsCities] = useState(0);

  useEffect(() => {
    const fData = dataProps;
    setIsHalfDays(fData.isHalfDays);
    setIsCities(fData.isCities);
  }, [dataProps]);

  useEffect(() => {
    const tempFeature = {};
    tempFeature.isHalfDays = isHalfDays;
    tempFeature.isCities = isCities;
    setFeatureProps(tempFeature);
  }, [isHalfDays, isCities]);

  const handleChangeIsHalfDays = () => {
    setIsHalfDays(isHalfDays === 1 ? 0 : 1);
  };

  const handleChangeIsCities = () => {
    setIsCities(isCities === 1 ? 0 : 1);
  };

  return (
    <Card>
      <CardHeader subheader="FEATURES" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Half days</Typography>
              <Checkbox
                disabled={plan === 'FREE'}
                checked={isHalfDays === 1 && plan !== 'FREE'}
                onChange={handleChangeIsHalfDays}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  backgroundColor: '#FCEEE2',
                  padding: theme.spacing(2, 3),
                  borderRadius: theme.spacing(2),
                  maxHeight: 90
                }}
              >
                <Button
                  disabled
                  sx={{
                    backgroundColor: 'white',
                    border: '1px solid #E7ECF5',
                    borderRadius: '40%',
                    padding: theme.spacing(1.7, 0),
                    position: 'relative',
                    [theme.breakpoints.down('md')]: {
                      minWidth: '0px',
                      width: '63px'
                    }
                  }}
                >
                  <Box
                    role="img"
                    aria-label="Panda"
                    sx={{
                      fontSize: 15,
                      [theme.breakpoints.up('md')]: { fontSize: '20px' }
                    }}
                  >
                    <span role="img" aria-label="Panda">
                      🤒🏠
                    </span>
                  </Box>
                  <ScheduleDivider />
                </Button>
              </Box>
              <Typography
                variant="body1"
                sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
              >
                Users can set a different status for the morning and the
                afternoon.
              </Typography>
            </Box>
          </Grid>
          <Box m={2} />
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Cities (working remotely)</Typography>
              <Checkbox
                checked={isCities === 1}
                onChange={handleChangeIsCities}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  backgroundColor: '#E4DDFD',
                  padding: theme.spacing(3.5, 1),
                  borderRadius: theme.spacing(2),
                  maxHeight: 90
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    fontWeight: 900,
                    backgroundColor: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: theme.spacing(1)
                  }}
                >
                  <span role="img" aria-label="Panda" style={{ fontSize: 14 }}>
                    📍 London
                  </span>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
              >
                Users can set specific city to help their colleague know where
                they’re working remotely from.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
