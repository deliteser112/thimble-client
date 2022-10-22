// components
import { Container } from '@material-ui/core';

import Page from '../components/Page';

import { AnalyticsContent } from '../components/dashboard-analytics';
import HeaderDashboard from '../components/HeaderDashboard';
import { PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

export default function AnalyticsPage() {
  return (
    <Page title="Thimble | Analytics">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Analytics"
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.general.home },
            { name: 'Analytics' }
          ]}
        />
        <AnalyticsContent />
      </Container>
    </Page>
  );
}
