import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_AUTH } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node
};

export default function AuthProtect({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect to={PATH_AUTH.login} />;
  }

  return <>{children}</>;
}
