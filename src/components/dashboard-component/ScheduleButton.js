/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import {
  withStyles,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import { Button, Popover, Typography, Box } from '@material-ui/core';

import PopupContent from './SchedulePopupContent';

const PopoverStyle = withStyles(() => ({
  paper: {
    borderRadius: 24
  }
}))(Popover);

const ScheduleDivider = styled('div')(() => ({
  position: 'absolute',
  zIndex: 10,
  width: '2px',
  height: '40px',
  borderRadius: '8px',
  backgroundColor: '#e7ecf5',
  transform: 'rotate(15deg)'
}));

ScheduleButton.propTypes = {
  dayIndex: PropTypes.number,
  schedule: PropTypes.array,
  weekday: PropTypes.string,
  weekTitle: PropTypes.string,
  icon: PropTypes.string,
  halfday: PropTypes.bool,
  work: PropTypes.bool,
  detailInfo: PropTypes.object,
  isActive: PropTypes.bool,
  iconProps: PropTypes.func
};

export default function ScheduleButton({
  dayIndex,
  schedule,
  weekday,
  weekTitle,
  icon,
  halfday,
  work,
  detailInfo,
  isActive,
  iconProps
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHalf, setHalf] = useState(false);
  const [mInit, setMInit] = useState(0);
  const [aInit, setAInit] = useState(0);

  useEffect(() => {
    // console.log('MInit, AInit:', mInit, aInit);
  }, [mInit, aInit]);

  useEffect(() => {
    if (detailInfo !== undefined) {
      schedule.map((sche, index) => {
        if (
          sche.id === detailInfo.morning.id &&
          sche.type === detailInfo.morning.type
        ) {
          setMInit(index);
        }
        if (
          sche.id === detailInfo.afternoon.id &&
          sche.type === detailInfo.afternoon.type
        ) {
          setAInit(index);
        }
      });
    }
  }, [detailInfo, schedule]);

  const handleClick = (event) => {
    if (isActive) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeIcon = (icon1, icon2, detail1, detail2, status) => {
    handleClose();
    setHalf(status);
    iconProps(icon1, icon2, detail1, detail2, status, dayIndex);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const theme = useTheme();
  return (
    <div>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="body2"
          sx={{ [theme.breakpoints.up('md')]: { textAlign: 'center' } }}
        >
          {weekday}
        </Typography>
        <Button
          onClick={handleClick}
          sx={{
            border: '1px solid #E7ECF5',
            borderRadius: '40%',
            padding: theme.spacing(1.7, 0),
            maxWidth: '66px',
            maxHeight: '67px',
            position: 'relative',
            ...(!work && { backgroundColor: '#FEB6AC', color: 'black' }),
            ...(!isActive && { backgroundColor: '#f7f5f5' }),
            [theme.breakpoints.down('md')]: {
              minWidth: '0px',
              width: '50px'
            }
          }}
        >
          <Box
            role="img"
            aria-label="Panda"
            sx={{
              fontSize: '15px',
              [theme.breakpoints.up('md')]: {
                fontSize: '20px',
                ...(isHalf && { fontSize: '20px' })
              }
            }}
          >
            {icon}
          </Box>
          {halfday && <ScheduleDivider />}
          {work ? (
            <Box
              component="img"
              src="/static/dashboard/home/ok.svg"
              sx={{
                width: 18,
                height: 18,
                position: 'absolute',
                right: 0,
                bottom: 0
              }}
            />
          ) : (
            <Box
              component="img"
              src="/static/dashboard/home/cancel.svg"
              sx={{
                width: 18,
                height: 18,
                position: 'absolute',
                right: 0,
                bottom: 0
              }}
            />
          )}
        </Button>
      </Box>
      <PopoverStyle
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 90,
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{ backgroundColor: '#00000040' }}
      >
        <PopupContent
          Schedule={schedule}
          weekTitle={weekTitle}
          iconProps={changeIcon}
          halfday={halfday}
          detailInfo={detailInfo}
          mInit={mInit}
          aInit={aInit}
        />
      </PopoverStyle>
    </div>
  );
}
