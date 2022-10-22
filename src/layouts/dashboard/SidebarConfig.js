// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name, type) => (
  <SvgIconStyle
    src={`/static/icons/navbar/new/${name}.svg`}
    sx={{ width: 22, height: 22 }}
    type={type}
  />
);

const ICONS = {
  page: getIcon('ic_page', 'general'),
  dashboard: getIcon('ic_dashboard', 'admin'),
  ndashboard: getIcon('dashboard', 'admin'),
  plans: getIcon('plans', 'admin'),
  organization: getIcon('organization-line', 'admin'),
  home: getIcon('home-line', 'general'),
  calendar: getIcon('calendar-date', 'general'),
  directory: getIcon('directory-line', 'general'),
  user: getIcon('user-avatar', 'general'),
  offices: getIcon('office', 'admin'),
  teams: getIcon('team-outlined', 'admin'),
  slack: getIcon('slack', 'app'),
  invite: getIcon('invite', 'app'),
  mobile: getIcon('mobile-phone-with-arrow', 'app'),
  contact: getIcon('online-support', 'app'),
  insights: getIcon('insights', 'superadmin')
};

const sidebarConfig = [
  // SUPERADMIN
  // ----------------------------------------------------------------------
  {
    subheader: 'super admin',
    items: [
      {
        title: 'Company List',
        href: PATH_DASHBOARD.superadmin.companies,
        icon: ICONS.offices
      },
      {
        title: 'User List',
        href: PATH_DASHBOARD.superadmin.allusers,
        icon: ICONS.teams
      },
      {
        title: 'Insights',
        href: PATH_DASHBOARD.superadmin.insights,
        icon: ICONS.insights
      }
    ]
  },
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Home',
        href: PATH_DASHBOARD.general.home,
        icon: ICONS.home
      },
      {
        title: 'Calendar',
        href: PATH_DASHBOARD.general.calendar,
        icon: ICONS.calendar
      },
      {
        title: 'Directory',
        href: PATH_DASHBOARD.general.directory,
        icon: ICONS.directory
      },
      {
        title: 'My Info',
        href: PATH_DASHBOARD.general.user,
        icon: ICONS.user
      }
    ]
  },

  // admin setting
  {
    subheader: 'admin settings',
    items: [
      {
        title: 'Offices',
        href: PATH_DASHBOARD.admin.offices,
        icon: ICONS.offices
      },
      {
        title: 'Teams',
        href: PATH_DASHBOARD.admin.teams,
        icon: ICONS.teams
      },
      {
        title: 'Organization',
        href: PATH_DASHBOARD.admin.organization,
        icon: ICONS.organization
      },
      {
        title: 'Dashboard',
        href: PATH_DASHBOARD.admin.analytics,
        icon: ICONS.ndashboard
      },
      {
        title: 'Subscription',
        href: PATH_DASHBOARD.admin.plans,
        icon: ICONS.plans
      }
    ]
  },

  // integration & contact us
  {
    subheader: '',
    items: [
      {
        title: 'Sync with Slack',
        href: PATH_DASHBOARD.other.slack,
        icon: ICONS.slack
      },
      {
        title: 'Invite',
        href: PATH_DASHBOARD.other.invite,
        icon: ICONS.invite
      },
      {
        title: 'Get Mobile App',
        href: PATH_DASHBOARD.other.mobile,
        icon: ICONS.mobile
      },
      {
        title: 'Contact Support',
        href: PATH_DASHBOARD.other.contact,
        icon: ICONS.contact
      }
    ]
  }
];

export default sidebarConfig;
