import PropTypes from 'prop-types';

// material
import { Box, Typography, Paper } from '@material-ui/core';

// ----------------------------------------------------------------------

Block.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object
};

export default function Block({ title, children, sx, ...other }) {
  return (
    <Box sx={{ position: 'relative' }} {...other}>
      {title && (
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {title}
        </Typography>
      )}
      <Paper
        variant="outlined"
        sx={{
          overflowY: 'auto',
          p: 1,
          minHeight: 60,
          height: 150,
          borderRadius: 1.5,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
