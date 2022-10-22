/* eslint-disable prettier/prettier */
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery
} from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/home/testimonial1logo.webp',
    title: 'UI & UX Design',
    description:
      'The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.',
    avatar: '/static/home/testimonial1.png', 
    name: 'Jacques-Edouard',
    duty: 'Co-founder & CEO',
    contact: '@ JOW'
  },
  {
    icon: '/static/home/testimonial2logo.webp',
    title: 'Development',
    description:
      'Easy to customize and extend each component, saving you time and money.',
    avatar: '/static/home/testimonial2.png',
    name: 'Aurelie',
    duty: 'Head of People',
    contact: '@ Gymlib'
  },
  {
    icon: '/static/home/testimonial3logo.webp',
    title: 'Branding',
    description:
      'Consistent design in colors, fonts ... makes brand recognition easy.',
    avatar: '/static/home/testimonial3.png',
    name: 'Laure',
    duty: 'Employee Experience Coordinator',
    contact: '@ Livestorm'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: '#FCEEE2',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(7),
    paddingTop: theme.spacing(7)
  }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    maxWidth: '100%',
    minHeight: 335,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(5, 5, 0),
    boxShadow: 'none',
    borderRadius: 50,
    overflow: 'inherit',
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor:"#FFFFFF",
      overflow: 'inherit',
    }
  }));

const Avatar = styled('img')(({ theme }) => ({
    width: 'auto',
    height: '90px',
    margin: 'auto',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  }));

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 'auto',
  height: '50px',
  margin: 'auto',
  marginBottom: theme.spacing(4),
}));

const CardArrow = styled('div')(() => ({
  width: '25px',
  height: '25px',
  backgroundColor: 'white',
  position: 'absolute',
  left: 'calc(50% - 12.5px)',
  bottom: '-12.5px',
  transform: 'matrix(-0.71, 0.71, 0.71, 0.71, 0, 0)'
}));

// ----------------------------------------------------------------------

export default function LandingLeaders() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const PoppinsRegular = "'PoppinsRegular', sans-serif";
  const PoppinsLight = "'PoppinsLight', sans-serif";
  
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle>
                  <CardIconStyle src={card.icon} alt={card.title} />
                  <Typography variant="h5" paragraph>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: 'text.primary', fontFamily: PoppinsLight }}>
                    {card.description}
                  </Typography>
                  <CardArrow />
                </CardStyle>
              </MotionInView>
              <Avatar src={card.avatar}/>
              <Typography variant="h4" paragraph sx={{ textAlign: 'center', fontFamily: PoppinsRegular }}>
                {card.name}
              </Typography>
              <Typography sx={{ color: 'text.primary', textAlign: 'center', fontFamily: PoppinsLight }}>
                {card.duty}
              </Typography>
              <Typography sx={{ color: 'text.primary', textAlign: 'center', fontFamily: PoppinsLight }}>
                {card.contact}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
