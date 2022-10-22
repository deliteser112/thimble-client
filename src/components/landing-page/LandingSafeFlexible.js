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
    justifyContent: 'top',
    paddingRight: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

export default function LandingSafeFlexible() {
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
                  variant="h2"
                  paragraph
                  sx={{ fontFamily: PoppinsRegular }}
                >
                  Safe and Flexible
                </Typography>
                <Box
                  component="img"
                  src="/static/home/landing01icon.webp"
                  sx={{ width: '30px', height: '30px', marginLeft: '10px' }}
                />
              </MotionInView>

              <MotionInView variants={textAnimate} sx={{ maxWidth: '350px' }}>
                <Typography
                  sx={{ color: 'text.primary', fontFamily: PoppinsLight }}
                >
                  No more spreadsheet to manage your flexible office.
                </Typography>
              </MotionInView>

              <MotionInView
                variants={textAnimate}
                sx={{ mt: 5, maxWidth: '350px' }}
              >
                <Typography
                  sx={{ color: 'text.primary', fontFamily: PoppinsLight }}
                >
                  Return to the office with effortless Contact Tracing.
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
                src="/static/home/landing01.webp"
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
