import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/core/Alert';

ColorAPI.propTypes = {
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  status: PropTypes.string,
  vertical: PropTypes.string,
  horizontal: PropTypes.string
};

export default function ColorAPI({
  message,
  isOpen,
  status,
  vertical,
  horizontal
}) {
  const [open, setOpen] = useState(isOpen);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
}
