// material
import {
  withStyles,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Container, Typography, Button } from '@material-ui/core';

import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import closeOutline from '@iconify/icons-eva/close-outline';
//
import { PATH_DASHBOARD } from '../../routes/paths';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0)
}));

const ContainerStyle = withStyles(() => ({
  root: {
    '& table>thead>tr>th:nth-child(2)': {
      backgroundColor: '#F4F1FF',
      borderTopRightRadius: '40px',
      borderTopLeftRadius: '40px',
      marginRight: '10px'
    },
    '& table>thead>tr>th:nth-child(4)': {
      borderTopRightRadius: '40px',
      borderTopLeftRadius: '40px',
      border: '1px solid black',
      borderBottom: '0px'
    },
    '& table>tbody>tr>td:nth-child(1)': {
      textAlign: 'left',
      padding: '0px'
    },
    '& table>tbody>tr>td:nth-child(2)': {
      backgroundColor: '#F4F1FF',
      textAlign: 'center',
      padding: '16px'
    },
    '& table>tbody>tr>td:nth-child(4)': {
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      textAlign: 'center',
      padding: '16px'
    },
    '& table>tbody>tr:last-child>td:nth-child(2)': {
      backgroundColor: '#F4F1FF',
      borderBottomRightRadius: '40px',
      borderBottomLeftRadius: '40px',
      marginRight: '10px'
    },
    '& table>tbody>tr:last-child>td:nth-child(4)': {
      borderBottomRightRadius: '40px',
      borderBottomLeftRadius: '40px',
      border: '1px solid black',
      borderTop: '0px'
    }
  }
}))(Container);

const PLANS = [
  {
    title: 'Slack & Teams integration',
    isFree: true,
    isPro: true
  },
  {
    title: 'Weekly reminder',
    isFree: true,
    isPro: true
  },
  {
    title: 'HRIS integration',
    isFree: false,
    isPro: true
  },
  {
    title: 'Custom status',
    isFree: false,
    isPro: true
  },
  {
    title: 'Half-days',
    isFree: false,
    isPro: true
  },
  {
    title: 'Overflow management',
    isFree: false,
    isPro: true
  },
  {
    title: 'Analytics dashboard',
    isFree: false,
    isPro: true
  },
  {
    title: 'Customer support',
    isFree: false,
    isPro: true
  }
];
// ----------------------------------------------------------------------

export default function LandingComparePlan() {
  const theme = useTheme();
  const PoppinsLight = "'PoppinsLight', sans-serif";
  const PoppinsRegular = "'PoppinsRegular', sans-serif";
  return (
    <RootStyle>
      <ContainerStyle maxWidth="lg">
        <table style={{ width: '100%' }} cellSpacing="0">
          <thead>
            <tr>
              <th width="350px" />
              <th width="350px">
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: '40px 10px 10px 10px',
                    [theme.breakpoints.up('md')]: {
                      padding: '40px 10px 10px 40px',
                      textAlign: 'left'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        [theme.breakpoints.down('md')]: {
                          display: 'none'
                        }
                      }}
                    >
                      €
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: PoppinsRegular,
                        [theme.breakpoints.down('md')]: {
                          display: 'none'
                        }
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontFamily: PoppinsRegular }}>
                    Free
                  </Typography>
                  <Button
                    size="large"
                    variant="contained"
                    to={PATH_DASHBOARD.root}
                    color="warning"
                    sx={{
                      marginTop: '20px',
                      backgroundColor: '#2E2836',
                      color: 'white',
                      fontSize: '24px',
                      paddingTop: '33px',
                      paddingBottom: '35px',
                      width: '180px',
                      fontFamily: PoppinsLight,
                      '&:hover': {
                        backgroundColor: '#575058'
                      },
                      [theme.breakpoints.down('sm')]: {
                        paddingTop: '10px',
                        paddingBottom: '12px',
                        fontSize: '16px',
                        width: '100%'
                      }
                    }}
                  >
                    Get started
                  </Button>
                </Box>
              </th>
              <th />
              <th width="350px">
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: '40px 10px 10px 10px',
                    [theme.breakpoints.up('md')]: {
                      padding: '40px 10px 10px 40px',
                      textAlign: 'left'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        [theme.breakpoints.down('md')]: {
                          display: 'none'
                        }
                      }}
                    >
                      €
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: PoppinsRegular,
                        [theme.breakpoints.down('md')]: {
                          display: 'none'
                        }
                      }}
                    >
                      3.4
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        textDecoration: 'underline dotted',
                        paddingTop: '10px',
                        marginLeft: '10px',
                        [theme.breakpoints.down('md')]: {
                          display: 'none'
                        }
                      }}
                    >
                      per user/month*
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontFamily: PoppinsRegular }}>
                    Premium
                  </Typography>
                  <Button
                    size="large"
                    variant="contained"
                    to={PATH_DASHBOARD.root}
                    color="warning"
                    sx={{
                      marginTop: '20px',
                      backgroundColor: '#2E2836',
                      color: 'white',
                      fontSize: '24px',
                      paddingTop: '33px',
                      paddingBottom: '35px',
                      width: '180px',
                      fontFamily: PoppinsLight,
                      '&:hover': {
                        backgroundColor: '#575058'
                      },
                      [theme.breakpoints.down('sm')]: {
                        paddingTop: '10px',
                        paddingBottom: '12px',
                        fontSize: '16px',
                        width: '100%'
                      }
                    }}
                  >
                    Try for free
                  </Button>
                </Box>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Typography variant="h4" paragraph sx={{ paddingTop: '50px' }}>
                  Usage
                </Typography>
              </td>
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>User limit</td>
              <td>50</td>
              <td />
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Offices</td>
              <td>3</td>
              <td />
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Teams</td>
              <td>Unlimited</td>
              <td />
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>
                <Typography variant="h4" paragraph sx={{ paddingTop: '50px' }}>
                  Features
                </Typography>
              </td>
              <td style={{ position: 'relative', height: '200px' }}>
                <Box
                  component="img"
                  src="/static/pricing/pricing1.webp"
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    width: '100%',
                    maxWidth: '200px',
                    height: 'auto',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </td>
              <td />
              <td style={{ position: 'relative' }}>
                <Box
                  component="img"
                  src="/static/pricing/pricing2.webp"
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    width: '100%',
                    maxWidth: '200px',
                    height: 'auto',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </td>
            </tr>
            {PLANS.map((item) => (
              <tr key={item.title}>
                <td>{item.title}</td>
                <td>
                  {item.isFree ? (
                    <Box
                      component={Icon}
                      icon={checkmarkFill}
                      sx={{ width: 30, height: 30, mr: 1.5 }}
                    />
                  ) : (
                    <Box
                      component={Icon}
                      icon={closeOutline}
                      sx={{ width: 30, height: 30, mr: 1.5 }}
                    />
                  )}
                </td>
                <td />
                <td>
                  {item.isPro ? (
                    <Box
                      component={Icon}
                      icon={checkmarkFill}
                      sx={{ width: 30, height: 30, mr: 1.5 }}
                    />
                  ) : (
                    <Box
                      component={Icon}
                      icon={closeOutline}
                      sx={{ width: 30, height: 30, mr: 1.5 }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContainerStyle>
    </RootStyle>
  );
}
