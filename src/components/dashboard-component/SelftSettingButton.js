/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import {
  withStyles,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import { Button, Popover, Typography, Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import useAuth from '../../hooks/useAuth';
import PopupContent from './SchedulePopupContent';

const PopoverStyle = withStyles(() => ({
  paper: {
    borderRadius: 24
  }
}))(Popover);

const ScheduleDivider = styled('div')(() => ({
  position: 'absolute',
  zIndex: 10,
  top: 5,
  left: '50%',
  width: '2px',
  height: '40px',
  borderRadius: '8px',
  backgroundColor: '#e7ecf5',
  transform: 'rotate(15deg)'
}));

SelfSettingButton.propTypes = {
  schedule: PropTypes.array,
  icon: PropTypes.string,
  halfday: PropTypes.bool,
  work: PropTypes.bool,
  detailInfo: PropTypes.object,
  statusTitle: PropTypes.string,
  weekTitle: PropTypes.string,
  notStatus: PropTypes.bool,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  currentUser: PropTypes.object,
  iconProps: PropTypes.func
};

export default function SelfSettingButton({
  schedule,
  icon,
  halfday,
  work,
  detailInfo,
  statusTitle,
  weekTitle,
  notStatus,
  isActive,
  disabled,
  currentUser,
  iconProps
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHalf, setHalf] = useState(false);
  const [mInit, setMInit] = useState(0);
  const [aInit, setAInit] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (detailInfo.morning !== undefined) {
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
    iconProps(icon1, icon2, detail1, detail2, status);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const theme = useTheme();

  return (
    <div>
      <Button
        disabled={disabled}
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          marginTop: '20px',
          width: '100%',
          py: theme.spacing(1.5),
          px: theme.spacing(3),
          borderRadius: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            py: 1,
            px: 1
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Avatar
              alt={disabled ? currentUser.firstname : user.firstname}
              src={disabled ? currentUser.photoURL : user.photoURL}
              sx={{
                width: theme.spacing(6),
                height: theme.spacing(6),
                marginRight: theme.spacing(3),
                [theme.breakpoints.down('md')]: {
                  marginRight: theme.spacing(1)
                }
              }}
            />
            {notStatus ? (
              <Box sx={{ textAlign: 'left' }}>
                <Typography
                  variant="body2"
                  sx={{ py: 1.7, [theme.breakpoints.down('sm')]: { py: 0.5 } }}
                >
                  What's your status for this day?
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2">You are working from</Typography>
                <Typography variant="subtitle1">{statusTitle}</Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              border: '1px solid #E7ECF5',
              borderRadius: '50%',
              padding: theme.spacing(1.2, 0),
              width: 50,
              height: 50,
              position: 'relative',
              ...(!work && { backgroundColor: '#FEB6AC', color: 'black' }),
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
                  fontSize: '15px',
                  ...(isHalf && { fontSize: '15px' })
                }
              }}
            >
              {icon}
            </Box>
            {halfday && <ScheduleDivider />}
          </Box>
        </Box>
      </Button>
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
          iconProps={changeIcon}
          halfday={halfday}
          detailInfo={detailInfo}
          weekTitle={weekTitle}
          mInit={mInit}
          aInit={aInit}
        />
      </PopoverStyle>
    </div>
  );
}
