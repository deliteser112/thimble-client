import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

SuperAdminProtect.propTypes = {
  children: PropTypes.node
};

export default function SuperAdminProtect({ children }) {
  const { isLoading, isAuthenticated, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (
    !isAuthenticated ||
    user.roles === 'MEMBER' ||
    user.roles === 'TEAM LEADER' ||
    user.roles === 'ADMIN'
  ) {
    return <Redirect to={PATH_DASHBOARD.general.home} />;
  }
  return <>{children}</>;
}
