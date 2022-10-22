// components
import { Container } from '@material-ui/core';

import Page from '../components/Page';

import { OfficesContent } from '../components/dashboard-offices';
import HeaderDashboard from '../components/HeaderDashboard';
import { PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

export default function OfficesPage() {
  return (
    <Page title="Thimble | Offices">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Offices"
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.general.home },
            { name: 'Offices' }
          ]}
        />
        <OfficesContent />
      </Container>
    </Page>
  );
}
