// components
import Page from '../components/Page';

import { AccountContent } from '../components/dashboard-account';

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <Page title="Thimble | Account" sx={{ display: 'flex' }}>
      <AccountContent />
    </Page>
  );
}
