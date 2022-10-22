import { useEffect, useState } from 'react';
// material
import { useTheme } from '@material-ui/core/styles';

import { Container, Typography } from '@material-ui/core';
// ----------------------------------------------------------------------

import InviteLists from './InviteLists';
// eslint-disable-next-line import/no-unresolved
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrganizations } from '../../redux/slices/adminSetting';

export default function InviteContent() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.adminSetting);

  const [domain, setDomain] = useState('');

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (organizations.result !== undefined) {
      const { company } = organizations.result;
      setDomain(company.domain);
    }
  }, [organizations]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
        Invite your colleagues
      </Typography>
      <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
        Your colleagues will need to use their <strong>{domain}</strong> email
        to join your organization!
      </Typography>
      <Container
        maxWidth="lg"
        sx={{ [theme.breakpoints.down('md')]: { px: 0 } }}
      >
        <InviteLists domain={domain} />
      </Container>
    </Container>
  );
}
