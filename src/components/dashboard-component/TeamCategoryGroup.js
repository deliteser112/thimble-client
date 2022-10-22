import PropTypes from 'prop-types';

import React, { useEffect } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';

import { Typography, ToggleButtonGroup, ToggleButton } from '@material-ui/core';

TeamCategoryGroup.propTypes = {
  daygroups: PropTypes.array,
  teamInitProps: PropTypes.array,
  teamStatusProps: PropTypes.func,
  sx: PropTypes.object
};

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))(ToggleButtonGroup);

export default function TeamCategoryGroup({
  daygroups,
  teamInitProps,
  teamStatusProps,
  sx
}) {
  const theme = useTheme();

  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    setCategories(teamInitProps);
  }, [teamInitProps]);

  const handleCategories = (event, newCategories) => {
    teamStatusProps(newCategories);
    setCategories(newCategories);
  };

  return (
    <StyledToggleButtonGroup
      value={categories}
      onChange={handleCategories}
      aria-label="team category"
      sx={{ display: 'block', textAlign: 'center', mb: 3, ...sx }}
    >
      {daygroups.map((item) => (
        <ToggleButton
          key={item.id}
          value={item.id}
          sx={{
            borderColor: item.color,
            borderRadius: `${theme.spacing(3)} !important`,
            color: item.color,
            borderLeft: `1px solid ${item.color} !important`,
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: item.color
            },
            '&.Mui-selected:hover': {
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
