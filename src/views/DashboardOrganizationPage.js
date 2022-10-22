// components
import { Container } from '@material-ui/core';

import Page from '../components/Page';

import { OrganizationContent } from '../components/dashboard-organization';
import HeaderDashboard from '../components/HeaderDashboard';
import { PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

export default function OrganizationPage() {
  return (
    <Page title="Thimble | Organization">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Organization"
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.general.home },
            { name: 'Organization' }
          ]}
        />
        <OrganizationContent />
      </Container>
    </Page>
  );
}
