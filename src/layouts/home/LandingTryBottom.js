// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Button, Box, Container, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
//
// ----------------------------------------------------------------------
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { varFadeInUp } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: '#2E2836',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(15)
  }
}));

const HeroImgStyleRight = styled(motion.img)(({ theme }) => ({
  top: 50,
  right: 0,
  bottom: 0,
  zIndex: 8,
  display: 'none',
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '100px',
    width: 'auto',
    height: '200px',
    display: 'block'
  }
}));

const HeroImgStyleLeft = styled(motion.img)(({ theme }) => ({
  top: 50,
  left: 0,
  bottom: 0,
  zIndex: 8,
  display: 'none',
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    left: 0,
    width: 'auto',
    height: '400px',
    display: 'block'
  }
}));

const PoppinsBlack = "'PoppinsBlack', sans-serif";
const PoppinsRegular = "'PoppinsRegular', sans-serif";
// ----------------------------------------------------------------------

export default function LandingTryBottom() {
  return (
    <RootStyle sx={{ position: 'relative' }}>
      <HeroImgStyleRight
        alt="hero"
        src="/static/home/footerRight.svg"
        variants={varFadeInUp}
      />

      <HeroImgStyleLeft
        alt="hero"
        src="/static/home/footerLeft.webp"
        variants={varFadeInUp}
      />
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 2, md: 5 }, mt: '30px', textAlign: 'center' }}>
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontFamily: PoppinsBlack,
              color: '#FCEEE2'
            }}
          >
            Try Thimble with your
            <br />
            team today
          </Typography>
          <Button
            size="large"
            variant="contained"
            component={RouterLink}
            to={PATH_DASHBOARD.root}
            color="warning"
            sx={{
              marginTop: '20px',
              backgroundColor: '#FCEEE2',
              color: 'black',
              fontSize: '24px',
              paddingTop: '33px',
              paddingBottom: '35px',
              fontFamily: PoppinsRegular,
              '&:hover': {
                backgroundColor: '#D3C6C0'
              }
            }}
          >
            Get started for free
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
