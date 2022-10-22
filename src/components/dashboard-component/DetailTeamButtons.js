import PropTypes from 'prop-types';

import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';

import { Typography, ToggleButtonGroup, ToggleButton } from '@material-ui/core';

DetailTeamButtons.propTypes = {
  daygroups: PropTypes.array,
  sx: PropTypes.object
};

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))(ToggleButtonGroup);

export default function DetailTeamButtons({ daygroups, sx }) {
  const theme = useTheme();

  return (
    <StyledToggleButtonGroup aria-label="team category">
      {daygroups.map((item) => (
        <ToggleButton
          key={item.id}
          value={item.id}
          sx={{
            py: 0.6,
            borderColor: item.color,
            borderRadius: `${theme.spacing(3)} !important`,
            borderLeft: `1px solid ${item.color} !important`,
            color: 'white',
            backgroundColor: item.color,
            '&:hover': {
              backgroundColor: item.color
            },
            ...sx
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {item.label}
          </Typography>
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
}
