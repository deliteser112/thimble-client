import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Link,
  Hidden,
  Container,
  Typography
} from '@material-ui/core';
// hooks
// import useAuth from '../../hooks/useAuth';
// routes
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { RegisterForm } from '../../components/authentication/register';
// import AuthWithSocial from '../../components/authentication/AuthWithSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  // const { method } = useAuth();

  return (
    <RootStyle title="Thimble | Register">
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden smDown>
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Already have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_AUTH.login}
            >
              Login
            </Link>
          </Typography>
        </Hidden>
      </HeaderStyle>

      <Hidden mdDown>
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 15 }}>
            Manage the job more effectively with Thimble
          </Typography>
          <img
            alt="register"
            src="/static/illustrations/illustration_register.svg"
          />
        </SectionStyle>
      </Hidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Get started absolutely free.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Free forever. No credit card needed.
              </Typography>
            </Box>
            {/* <Box
              component="img"
              src={`/static/icons/${
                method === 'firebase' ? 'ic_firebase' : 'ic_jwt'
              }.png`}
              sx={{ width: 32, height: 32 }}
            /> */}
          </Box>

          {/* {method === 'firebase' && <AuthWithSocial />} */}

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'text.secondary', mt: 3 }}
          >
            By registering, I agree to Thimble&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <Hidden smUp>
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to={PATH_AUTH.login} component={RouterLink}>
                Login
              </Link>
            </Typography>
          </Hidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
