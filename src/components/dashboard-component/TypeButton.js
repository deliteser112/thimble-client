import PropTypes from 'prop-types';

import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { Box } from '@material-ui/core';

TypeButton.propTypes = {
  type: PropTypes.string
};

export default function TypeButton({ type }) {
  return (
    <>
      {type === 'all' && (
        <Box sx={{ display: 'flex', itemAlign: 'center' }}>
          {' '}
          ALL DAY <CloseIcon />{' '}
        </Box>
      )}
      {type === 'half' && (
        <Box sx={{ display: 'flex', itemAlign: 'center' }}>
          {' '}
          HALF DAY <AddIcon />{' '}
        </Box>
      )}
    </>
  );
}
