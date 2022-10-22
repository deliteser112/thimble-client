import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

// material
import { useTheme } from '@material-ui/core/styles';

//
// hooks
import HomeNavbar from './HomeNavbar';
import LandingFooter from './LandingFooter';
import LandingTryBottom from './LandingTryBottom';

// material
// ----------------------------------------------------------------------

HomeLayout.propTypes = {
  children: PropTypes.node
};

export default function HomeLayout({ children }) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isAuth =
    pathname === '/auth/register' ||
    pathname === '/auth/login' ||
    pathname === '/auth/reset-password';
  return (
    <>
      <Box sx={{ height: '100%' }}>
        {!isAuth && <HomeNavbar />}
        {isAuth ? (
          <Box>{children}</Box>
        ) : (
          <Box
            sx={{
              marginTop: '64px',
              [theme.breakpoints.up('md')]: {
                marginTop: '96px'
              }
            }}
          >
            {children}
          </Box>
        )}
        {!isAuth && <LandingTryBottom />}
        {!isAuth && <LandingFooter />}
      </Box>
    </>
  );
}
