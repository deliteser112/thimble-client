// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Container,
  Typography,
  useMediaQuery
} from '@material-ui/core';
//
import { varFadeInUp, MotionInView, varFadeInRight } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

export default function LandingPlugPlay() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const PoppinsLight = "'PoppinsLight', sans-serif";
  const PoppinsRegular = "'PoppinsRegular', sans-serif";
  const textAnimate = upMd ? varFadeInRight : varFadeInUp;

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} lg={5}>
            <ContentStyle>
              <MotionInView
                variants={textAnimate}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant="h3"
                  paragraph
                  sx={{ fontFamily: PoppinsRegular }}
                >
                  Just plug and play
                </Typography>
                <Box
                  component="img"
                  src="/static/home/landing03icon.webp"
                  sx={{ width: '30px', height: '30px', marginLeft: '10px' }}
                />
              </MotionInView>

              <MotionInView variants={textAnimate} sx={{ maxWidth: '350px' }}>
                <Typography
                  sx={{ color: 'text.primary', fontFamily: PoppinsLight }}
                >
                  Facilitate people’s onboarding with our <b>HRIS</b>{' '}
                  integrations.
                </Typography>
              </MotionInView>

              <MotionInView
                variants={textAnimate}
                sx={{ mt: 5, maxWidth: '350px' }}
              >
                <Typography
                  sx={{ color: 'text.primary', fontFamily: PoppinsLight }}
                >
                  Our <b>Slack</b> plugin gives you context in real-time!
                </Typography>
                <Box
                  component="img"
                  src="/static/home/slack.png"
                  sx={{
                    width: 'auto',
                    height: '30px',
                    marginLeft: '10px',
                    mt: 3
                  }}
                />
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid
            dir="ltr"
            item
            xs={12}
            md={8}
            lg={7}
            sx={{
              position: 'relative',
              pl: { sm: '16% !important', md: '0 !important' }
            }}
          >
            <MotionInView variants={varFadeInRight}>
              <Box
                component="img"
                alt="theme mode"
                src="/static/home/landing03.webp"
                sx={{
                  maxWidth: { md: 'calc(100% - 48px)' },
                  transform: 'translateZ(0)'
                }}
              />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
