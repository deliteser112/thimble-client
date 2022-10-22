// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery
} from '@material-ui/core';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    id: 0,
    icon: '/static/pricing/platform.svg',
    title: 'Web app',
    description: 'Desktop and Mobile'
  },
  {
    id: 1,
    icon: '/static/pricing/platform.svg',
    title: 'Mobile app',
    description: 'App Store',
    description1: 'Google Play Store'
  },
  {
    id: 2,
    icon: '/static/pricing/platform.svg',
    title: 'Slack plugin',
    description: 'Real-time status'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  backgroundColor: '#FCEEE2',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
  }
}));

const CardStyle = styled(Card)(() => ({
  maxWidth: 'none',
  minHeight: 240,
  margin: 'auto',
  textAlign: 'center',
  boxShadow: 'none',
  backgroundColor: '#FCEEE2'
}));

const CardIconStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  margin: 'auto',
  marginBottom: theme.spacing(3)
}));

const CardIconSubStyle = styled('img')(() => ({
  width: 'auto',
  height: 20,
  margin: 'auto'
}));

const MobileItem = styled('div')(() => ({
  display: 'flex'
}));

const AppleItem = styled('div')(() => ({
  minWidth: '110px',
  marginRight: '20px'
}));

const GoogleItem = styled('div')(() => ({
  minWidth: '165px'
}));

const PoppinsRegular = "'PoppinsRegular', sans-serif";
const PoppinsLight = "'PoppinsLight', sans-serif";
// ----------------------------------------------------------------------

export default function LandingForEveryone() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 2, md: 5 }, mt: '30px' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography
              variant="h3"
              align="center"
              sx={{ fontFamily: PoppinsRegular }}
            >
              For everyone, everywhere.
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 4 : 1}>
          {CARDS.map((card) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle>
                  <CardIconStyle src={card.icon} alt={card.title} />
                  <Typography
                    variant="h5"
                    paragraph
                    sx={{
                      textAlign: 'center',
                      fontFamily: PoppinsRegular,
                      [theme.breakpoints.up('md')]: {
                        textAlign: 'left',
                        marginBottom: '5px'
                      }
                    }}
                  >
                    {card.title}
                  </Typography>
                  {card.id === 1 && (
                    <MobileItem>
                      <AppleItem>
                        <CardIconSubStyle
                          src="/static/pricing/apple_icon.svg"
                          alt="small icon"
                          sx={{ float: 'left' }}
                        />

                        <Typography
                          sx={{
                            color: 'text.primary',
                            fontFamily: PoppinsLight,
                            textAlign: 'center',
                            [theme.breakpoints.up('md')]: {
                              textAlign: 'left'
                            }
                          }}
                        >
                          {card.description}
                        </Typography>
                      </AppleItem>
                      <GoogleItem>
                        <CardIconSubStyle
                          src="/static/pricing/google_icon.svg"
                          alt="small icon"
                          sx={{ float: 'left' }}
                        />

                        <Typography
                          sx={{
                            color: 'text.primary',
                            fontFamily: PoppinsLight,
                            textAlign: 'center',
                            [theme.breakpoints.up('md')]: {
                              textAlign: 'left'
                            }
                          }}
                        >
                          {card.description1}
                        </Typography>
                      </GoogleItem>
                    </MobileItem>
                  )}
                  {card.id !== 1 && (
                    <Typography
                      sx={{
                        color: 'text.primary',
                        fontFamily: PoppinsLight,
                        textAlign: 'center',
                        [theme.breakpoints.up('md')]: {
                          textAlign: 'left'
                        }
                      }}
                    >
                      {card.description}
                    </Typography>
                  )}
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
