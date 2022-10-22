import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
//
import { PATH_DASHBOARD } from './paths';
// guards
import AuthGuard from '../guards/AuthGuard';
import AdminGuard from '../guards/AdminGuard';
import SuperAdminGuard from '../guards/SuperAdminGuard';
import IsSuperAdminRedirect from '../guards/IsSuperAdminRedirect';
// ----------------------------------------------------------------------

const DashboardRoutes = {
  path: PATH_DASHBOARD.root,
  guard: AuthGuard,
  layout: DashboardLayout,
  routes: [
    // SUPER ADMIN
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.superadmin.companies,
      guard: SuperAdminGuard,
      component: lazy(() => import('../views/DashboardCompaniesPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.superadmin.allusers,
      guard: SuperAdminGuard,
      component: lazy(() => import('../views/DashboardAllUserListPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.superadmin.insights,
      guard: SuperAdminGuard,
      component: lazy(() => import('../views/DashboardInsightsPage'))
    },
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.general.home,
      guard: IsSuperAdminRedirect,
      component: lazy(() => import('../views/DashboardHomePage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.calendar,
      component: lazy(() => import('../views/DashboardCalendarPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.calendarDetail,
      component: lazy(() => import('../views/DashboardCalendarPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.directory,
      component: lazy(() => import('../views/DashboardDirectoryPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.user,
      component: lazy(() => import('../views/DashboardUserPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.userEdit,
      component: lazy(() => import('../views/DashboardUserPage'))
    },
    // admin
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.admin.offices,
      guard: AdminGuard,
      component: lazy(() => import('../views/DashboardOfficesPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.admin.teams,
      guard: AdminGuard,
      component: lazy(() => import('../views/DashboardTeamsPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.admin.organization,
      guard: AdminGuard,
      component: lazy(() => import('../views/DashboardOrganizationPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.admin.analytics,
      guard: AdminGuard,
      component: lazy(() => import('../views/DashboardAnalyticsPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.admin.plans,
      guard: AdminGuard,
      component: lazy(() => import('../views/DashboardPlanPage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.admin.plansetting,
      guard: AdminGuard,
      component: lazy(() => import('../views/DashboardPlanPage'))
    },
    // other
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.other.slack,
      component: lazy(() => import('../views/Maintenance'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.other.invite,
      component: lazy(() => import('../views/DashboardInvitePage'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.other.download,
      component: lazy(() => import('../views/Maintenance'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.other.contact,
      component: lazy(() => import('../views/Maintenance'))
    },
    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DashboardRoutes;
