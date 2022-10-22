// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@material-ui/core';

//
// ----------------------------------------------------------------------
// routes
import { varFadeInUp } from '../animate';

import SchedulePopover from './SchedulePopover';
import ScheduleNotWork from './ScheduleNotWork';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: '#F8F8F8',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(9)
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
    right: 0,
    width: 'auto',
    height: '300px',
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
    height: '300px',
    display: 'block'
  }
}));

const Weeks = [
  {
    value: 0,
    label: 'Mon 14',
    icon: '🏡',
    isWork: 1
  },
  {
    value: 1,
    label: 'Tue 15',
    icon: '🚶‍♂️',
    isWork: 1
  },
  {
    value: 2,
    label: 'Wed 16',
    icon: '💼',
    isWork: 1
  },
  {
    value: 3,
    label: 'Thu 17',
    icon: '🏝',
    isWork: 1
  },
  {
    value: 4,
    label: 'Fri 18',
    isWork: 0
  }
];

// const PoppinsBlack = "'PoppinsBlack', sans-serif";
const PoppinsRegular = "'PoppinsRegular', sans-serif";
// ----------------------------------------------------------------------

export default function LandingTryCafe() {
  return (
    <RootStyle sx={{ position: 'relative' }}>
      <HeroImgStyleRight
        alt="hero"
        src="/static/how-it-works/productRight.webp"
        variants={varFadeInUp}
      />

      <HeroImgStyleLeft
        alt="hero"
        src="/static/how-it-works/productLeft.webp"
        variants={varFadeInUp}
      />
      <Container maxWidth="sm">
        <Box sx={{ mb: { xs: 2, md: 5 }, mt: '30px', textAlign: 'center' }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontFamily: PoppinsRegular,
              color: 'black',
              marginBottom: '20px'
            }}
          >
            Schedule your week in seconds.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '30px'
            }}
          >
            {Weeks.map((day) =>
              day.isWork === 1 ? (
                <SchedulePopover
                  title={day.label}
                  emoji={day.icon}
                  key={day.value}
                />
              ) : (
                <ScheduleNotWork
                  title={day.label}
                  emoji={day.icon}
                  key={day.value}
                />
              )
            )}
          </Box>
          <span role="img" aria-label="Panda" style={{ fontSize: '30px' }}>
            Try it out now 👆
          </span>
        </Box>
      </Container>
    </RootStyle>
  );
}
