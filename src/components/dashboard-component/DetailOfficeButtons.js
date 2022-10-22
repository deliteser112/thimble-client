import PropTypes from 'prop-types';

import React from 'react';

import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton
} from '@material-ui/core';

DetailOfficeButtons.propTypes = {
  officeGroups: PropTypes.array.isRequired,
  sx: PropTypes.object
};

export default function DetailOfficeButtons({ officeGroups, sx }) {
  return (
    <ToggleButtonGroup
      aria-label="day type"
      sx={{
        textAlign: 'center',
        ...sx
      }}
    >
      {officeGroups.map((item) => (
        <ToggleButton
          key={item.id}
          value={item.id}
          style={{ height: '42px', zIndex: 1202 }}
          sx={{
            mr: 1,
            mb: 1,
            heigth: '42px !important',
            borderRadius: '20px !important',
            border: '1px solid #00AB55',
            borderLeft: '1px solid #00AB55 !important',
            color: '#00AB55',
            backgroundColor: 'white',
            '&.css-am98t8-MuiButtonBase-root-MuiToggleButton-root': {
              zIndex: '1202 !important'
            }
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <span role="img" aria-label="Panda" style={{ fontSize: '23px' }}>
              {item.icon}
            </span>
            <Typography variant="body2" sx={{ paddingTop: 1, ml: 1 }}>
              {item.label}
            </Typography>
          </Box>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
