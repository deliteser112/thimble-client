/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { Box, Typography, ToggleButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const WeekTitle = ['Sa', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: 0
    },
    '&:first-child': {
      borderRadius: 0
    }
  },
  root: {
    width: '100%',
    display: 'flex !important',
    justifyContent: 'space-between'
  }
}))(ToggleButtonGroup);

// ----------------------------------------------------------------------

WeekList.propTypes = {
  dayIndex: PropTypes.number,
  daystatus: PropTypes.array,
  viewDetailByClick: PropTypes.func
};

// ----------------------------------------------------------------------

export default function WeekList({ dayIndex, viewDetailByClick, daystatus }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(dayIndex);
  }, [dayIndex]);

  const handleListItemClick = (event, id, month, index) => {
    viewDetailByClick(id, month, index);
    setSelected(index);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: 120,
        transform: 'translate(-50%, -50%)',
        minWidth: '80%',
        margin: 'auto',
        backgroundColor: 'white'
      }}
    >
      <Box
        sx={{
          mx: 0.6,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {daystatus.map((item, index) => (
          <Box key={index} sx={{ width: 50, textAlign: 'center' }}>
            <Typography variant="h6">{WeekTitle[item.week]}</Typography>
          </Box>
        ))}
      </Box>
      <StyledToggleButtonGroup
        value={selected}
        exclusive
        aria-label="text alignment"
      >
        {daystatus.map((item, index) => (
          <ToggleButton
            key={index}
            onClick={(event) =>
              handleListItemClick(event, item.id, item.month, index)
            }
            value={index}
            aria-label="week view"
            sx={{ borderRadius: '50% !important', width: 50, height: 50 }}
          >
            <Typography variant="h6" sx={{ padding: 1 }}>
              {item.id + 1}
            </Typography>
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
}
