/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';

import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import { Box, Typography } from '@material-ui/core';

import Heatmap from './Heatmap';

DayScheduleButton.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  officeFilterId: PropTypes.number,
  officeInfo: PropTypes.array,
  icon: PropTypes.string,
  halfday: PropTypes.bool,
  isSelected: PropTypes.bool,
  isActive: PropTypes.bool,
  Selection: PropTypes.func
};

const ScheduleDivider = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '10px',
  zIndex: 10,
  width: '2px',
  height: '48px',
  borderRadius: '8px',
  backgroundColor: '#e0e0e0',
  transform: 'rotate(15deg)',
  [theme.breakpoints.down('sm')]: {
    height: '30px'
  }
}));

export default function DayScheduleButton({
  year,
  month,
  day,
  officeFilterId,
  officeInfo,
  icon,
  halfday,
  isSelected,
  isActive,
  Selection
}) {
  const theme = useTheme();

  const [occupancy, setOccupancy] = useState(0);

  useEffect(() => {
    if (officeInfo.length > 0) {
      officeInfo.map((office) => {
        if (office.id === officeFilterId) {
          setOccupancy(office.occupancy);
        }
      });
    }
  }, [officeInfo, officeFilterId]);

  const handleClick = () => {
    Selection(true, year, month, day);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        ...(isSelected && { backgroundColor: '#f7f5f5' }),
        transition: 'all .3s',
        borderRadius: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
          width: '70px',
          margin: 'auto'
        },
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#f7f5f5'
        }
      }}
    >
      <Typography variant="caption">{day}</Typography>
      <Box
        sx={{
          position: 'relative',
          margin: '0px 1px',
          borderRadius: '50%',
          ...(!isActive && { backgroundColor: '#f7f5f5' }),
          [theme.breakpoints.down('sm')]: {
            width: 45,
            height: 50
          }
        }}
      >
        <Heatmap occupancy={occupancy} isCalendar />
        <Box
          role="img"
          aria-label="Panda"
          sx={{
            position: 'absolute',
            width: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
            [theme.breakpoints.up('sm')]: { fontSize: '18px' }
          }}
        >
          {icon}
        </Box>
        {halfday && <ScheduleDivider />}
      </Box>
      {/* <Box
        sx={{
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          width: '60px',
          height: '60px',
          textAlign: 'center',
          margin: 'auto',
          py: 1.2,
          border: '1px solid #e8e8e8',
          [theme.breakpoints.down('sm')]: {
            border: '3px solid #E7ECF5',
            py: 1,
            width: '40px',
            height: '40px'
          }
        }}
      >
        <Box
          role="img"
          aria-label="Panda"
          sx={{
            position: 'absolute',
            width: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
            [theme.breakpoints.up('sm')]: { fontSize: '18px' }
          }}
        >
          {icon}
        </Box>
        {halfday && <ScheduleDivider />}
        <Box m={3} />
      </Box> */}
    </Box>
  );
}
