import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Box, Container, Typography } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
const ManropeRegular = "'ManropeRegular', sans-serif";
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
                Find the best days to team up.
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
                No more boring spreadsheet.
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.root}
                  color="warning"
                  sx={{
                    marginTop: '20px',
                    backgroundColor: '#2E2836',
                    color: 'white',
                    fontSize: '24px',
                    paddingTop: '33px',
                    paddingBottom: '35px',
                    fontFamily: PoppinsRegular,
                    '&:hover': {
                      backgroundColor: '#575058'
                    }
                  }}
                >
                  Get started for free
                </Button>
                <Box sx={{ fontFamily: ManropeRegular }}>
                  Available on iOS, Android & Desktop
                </Box>
              </Box>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
