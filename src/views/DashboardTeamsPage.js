// components
import { Container } from '@material-ui/core';

import Page from '../components/Page';

import { TeamsContent } from '../components/dashboard-teams';
import HeaderDashboard from '../components/HeaderDashboard';
import { PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

export default function TeamsPage() {
  return (
    <Page title="Thimble | Teams">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Teams"
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.general.home },
            { name: 'Teams' }
          ]}
        />
        <TeamsContent />
      </Container>
    </Page>
  );
}
