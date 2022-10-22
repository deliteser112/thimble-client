// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_AUTH = '/auth';
// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_HOME = {
  components: '/components',
  cloud: '/',
  purchase: '/',
  dashboard: ROOTS_DASHBOARD,
  how_it_works: '/how-it-works',
  pricing: '/pricing'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  superadmin: {
    companies: path(ROOTS_DASHBOARD, '/companylist'),
    allusers: path(ROOTS_DASHBOARD, '/allusers'),
    insights: path(ROOTS_DASHBOARD, '/insights')
  },
  general: {
    home: path(ROOTS_DASHBOARD, '/home'),
    calendar: path(ROOTS_DASHBOARD, '/calendar'),
    calendarDetail: path(ROOTS_DASHBOARD, '/calendar/:userId/detail'),
    directory: path(ROOTS_DASHBOARD, '/directory'),
    user: path(ROOTS_DASHBOARD, '/user'),
    userEdit: path(ROOTS_DASHBOARD, '/user/:userId/edit')
  },
  admin: {
    offices: path(ROOTS_DASHBOARD, '/offices'),
    teams: path(ROOTS_DASHBOARD, '/teams'),
    organization: path(ROOTS_DASHBOARD, '/organization'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    plans: path(ROOTS_DASHBOARD, '/plans'),
    plansetting: path(ROOTS_DASHBOARD, '/plans/:sessionId')
  },
  other: {
    slack: path(ROOTS_DASHBOARD, '/slack'),
    invite: path(ROOTS_DASHBOARD, '/invite'),
    mobile: path(ROOTS_DASHBOARD, '/download'),
    contact: path(ROOTS_DASHBOARD, '/contact')
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/drop'),
    pageFour: path(ROOTS_DASHBOARD, '/drop/four'),
    pageFive: path(ROOTS_DASHBOARD, '/drop/five'),
    pageSix: path(ROOTS_DASHBOARD, '/drop/six')
  }
};
