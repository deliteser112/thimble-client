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
  padding: theme.spacing(15, 0),
  backgroundColor: '#FCEEE2'
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
    justifyContent: 'top',
    paddingRight: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

export default function LandingHybridPolicy() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const PoppinsLight = "'PoppinsLight', sans-serif";
  const PoppinsRegular = "'PoppinsRegular', sans-serif";
  const textAnimate = upMd ? varFadeInRight : varFadeInUp;

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5} direction="row-reverse">
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
                  paragraph
                  sx={{
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    fontFamily: PoppinsRegular
                  }}
                >
                  Monitor your hybrid policy
                </Typography>
                <Box
                  component="img"
                  src="/static/home/landing04icon.webp"
                  sx={{ width: '30px', height: '30px', marginLeft: '10px' }}
                />
              </MotionInView>

              <MotionInView variants={textAnimate}>
                <Typography
                  sx={{
                    color: 'text.primary',
                    textAlign: 'center',
                    fontFamily: PoppinsLight,
                    [theme.breakpoints.up('md')]: {
                      textAlign: 'right'
                    }
                  }}
                >
                  Understand how your people are adapting to the new hybrid
                  policies.
                </Typography>
              </MotionInView>

              <MotionInView
                variants={textAnimate}
                sx={{ mt: 5, width: '100%' }}
              >
                <Typography
                  sx={{
                    color: 'text.primary',
                    textAlign: 'center',
                    fontFamily: PoppinsLight,
                    [theme.breakpoints.up('md')]: {
                      textAlign: 'right'
                    }
                  }}
                >
                  Get all the data you need to optimize your workplace.
                </Typography>
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
                src="/static/home/landing04.webp"
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
