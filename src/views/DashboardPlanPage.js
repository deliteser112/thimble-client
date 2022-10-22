// components
import { Container } from '@material-ui/core';

import Page from '../components/Page';

import { PlanContent } from '../components/dashboard-plans';
import HeaderDashboard from '../components/HeaderDashboard';
import { PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

export default function DashboardPlanPage() {
  return (
    <Page title="Thimble | Plans">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Plans"
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.general.home },
            { name: 'Plans' }
          ]}
        />
        <PlanContent />
      </Container>
    </Page>
  );
}
