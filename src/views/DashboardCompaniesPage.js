// components
import Page from '../components/Page';

import { CompanyContent } from '../components/dashboard-companies';

// ----------------------------------------------------------------------

export default function DashboardCompaniesPage() {
  return (
    <Page title="Thimble | Company List">
      <CompanyContent />
    </Page>
  );
}
