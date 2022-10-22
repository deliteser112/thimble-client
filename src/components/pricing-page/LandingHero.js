import { motion } from 'framer-motion';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
//
import { varWrapEnter, varFadeInRight } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#F2F3F5',
  // marginTop: '154px',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    alignItems: 'center'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  zIndex: 10,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: 30,
  paddingBottom: 30,
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const PoppinsBlack = "'PoppinsBlack', sans-serif";
const PoppinsRegular = "'PoppinsRegular', sans-serif";
// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <Container sx={{ backgroundColor: '#FCEEE2' }} maxWidth={false}>
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography
                variant="h1"
                sx={{
                  color: '#2E2836',
                  textAlign: 'center',
                  fontFamily: PoppinsBlack
                }}
              >
                Coordinate your team, for free.
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography
                variant="h3"
                sx={{
                  py: 2,
                  color: '#2E2836',
                  textAlign: 'center',
                  fontFamily: PoppinsRegular
                }}
              >
                Get advanced features, <br />
                if necessary.
              </Typography>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
