import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import HomeLayout from '../layouts/home';
// guards
import GuestGuard from '../guards/GuestGuard';
// ----------------------------------------------------------------------

const HomeRoutes = {
  path: '*',
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: '/',
      component: lazy(() => import('../views/LandingPage'))
    },
    {
      exact: true,
      path: '/how-it-works',
      component: lazy(() => import('../views/HowitworksPage'))
    },
    {
      exact: true,
      path: '/pricing',
      component: lazy(() => import('../views/PricingPage'))
    },
    {
      exact: true,
      guard: GuestGuard,
      path: '/auth/register',
      component: lazy(() => import('../views/authentication/Register'))
    },
    {
      exact: true,
      guard: GuestGuard,
      path: '/auth/login',
      component: lazy(() => import('../views/authentication/Login'))
    },
    {
      exact: true,
      path: '/auth/verify',
      component: lazy(() => import('../views/authentication/VerifyCode'))
    },
    {
      exact: true,
      path: '/auth/reset-password',
      component: lazy(() => import('../views/authentication/ResetPassword'))
    },
    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
