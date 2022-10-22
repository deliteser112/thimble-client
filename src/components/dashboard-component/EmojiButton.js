import PropTypes from 'prop-types';

import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';

import { Button, Popover, Box } from '@material-ui/core';

import EmojiContent from './EmojiAPI';

const PopoverStyle = withStyles(() => ({
  paper: {
    borderRadius: 24
  }
}))(Popover);

EmojiButton.propTypes = {
  icon: PropTypes.string,
  changeIconProps: PropTypes.func,
  index: PropTypes.number
};

export default function EmojiButton({ icon, changeIconProps, index }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadIconFromContent = (icon) => {
    handleClose();
    changeIconProps(icon, index);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const theme = useTheme();
  return (
    <div>
      <Box sx={{ width: 64, mr: 0, [theme.breakpoints.up('md')]: { mr: 1 } }}>
        <Button
          onClick={handleClick}
          sx={{
            border: '1px solid #E7ECF5',
            borderRadius: '40%',
            padding: theme.spacing(1, 0),
            position: 'relative',
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
              fontSize: '22px',
              [theme.breakpoints.up('md')]: { fontSize: '28px' }
            }}
          >
            {icon}
          </Box>
          <Box
            component="img"
            src="/static/dashboard/home/edit.svg"
            sx={{
              width: 20,
              height: 20,
              position: 'absolute',
              right: 0,
              bottom: 0,
              backgroundColor: '#2E2836',
              borderRadius: '10px',
              padding: '3px'
            }}
          />
        </Button>
      </Box>
      <PopoverStyle
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <EmojiContent updateIcon={uploadIconFromContent} />
      </PopoverStyle>
    </div>
  );
}
