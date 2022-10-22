import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Typography, Container } from '@material-ui/core';

import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function FreePlanCard() {
  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Your company is in Free plan!
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        If the plan is upgraded, you can manage it more effectively.
      </Typography>

      <Box
        component="img"
        alt="comingsoon"
        src="/static/illustrations/illustration_coming_soon.svg"
        sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
      />

      <Button
        variant="contained"
        size="large"
        component={RouterLink}
        to={PATH_DASHBOARD.admin.plans}
      >
        Upgrade now
      </Button>
    </Container>
  );
}
