// material
import {
  alpha,
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
    icon: '/static/home/team01.webp',
    title: 'People & HR',
    description:
      'Give your people flexibility, improve company culture and employee experience'
  },
  {
    icon: '/static/home/team02.webp',
    title: 'Office & Workplace',
    description:
      'Understand the office usage and drive decisions with real data'
  },
  {
    icon: '/static/home/team03.webp',
    title: 'Employees',
    description: 'View who’s in the office and meet your teammates in 1-click'
  }
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
  }
}));

const CardStyle = styled(Card)(() => ({
  maxWidth: 380,
  minHeight: 240,
  margin: 'auto',
  textAlign: 'center',
  boxShadow: 'none'
}));

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 'auto',
  height: 75,
  margin: 'auto',
  marginBottom: theme.spacing(1),
  filter: shadowIcon(theme.palette.primary.main)
}));

const CardIconSubStyle = styled('img')(({ theme }) => ({
  width: 'auto',
  height: 15,
  margin: 'auto',
  filter: shadowIcon(theme.palette.primary.main)
}));

const PoppinsRegular = "'PoppinsRegular', sans-serif";
const PoppinsLight = "'PoppinsLight', sans-serif";
// ----------------------------------------------------------------------

export default function LandingMyTeamCafe() {
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
              Is Thimble right for my team?
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 1 : 1}>
          {CARDS.map((card) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle>
                  <CardIconStyle src={card.icon} alt={card.title} />
                  <CardIconSubStyle
                    src="/static/home/accent.webp"
                    alt="small icon"
                  />
                  <Typography variant="h5" paragraph>
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{ color: 'text.primary', fontFamily: PoppinsLight }}
                  >
                    {card.description}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
