import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';

import { Button, Popover, Box } from '@material-ui/core';

import ColorContent from './ColorAPI';

const PopoverStyle = withStyles(() => ({
  paper: {
    borderRadius: 24
  }
}))(Popover);

ColorButton.propTypes = {
  color: PropTypes.string,
  changeColorProps: PropTypes.func,
  index: PropTypes.number
};

export default function ColorButton({ color, changeColorProps, index }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(color);

  useEffect(() => {
    setBackgroundColor(color);
  }, [color]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadColorFromContent = (color) => {
    handleClose();
    changeColorProps(color, index);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const theme = useTheme();

  return (
    <div>
      <Box sx={{ width: 64, mr: 0, [theme.breakpoints.up('md')]: { mr: 9 } }}>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            border: '1px solid #E7ECF5',
            borderRadius: '10px',
            position: 'relative',
            width: '60px',
            height: '60px',
            backgroundColor: { backgroundColor },
            [theme.breakpoints.down('md')]: {
              minWidth: '0px',
              width: '50px',
              height: '50px'
            }
          }}
        />
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
        <ColorContent updateColor={uploadColorFromContent} />
      </PopoverStyle>
    </div>
  );
}
