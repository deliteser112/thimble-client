import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

IsSuperAdminRedirect.propTypes = {
  children: PropTypes.node
};

export default function IsSuperAdminRedirect({ children }) {
  const { isLoading, isAuthenticated, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && user.roles === 'SUPER ADMIN') {
    return <Redirect to={PATH_DASHBOARD.superadmin.companies} />;
  }
  return <>{children}</>;
}
