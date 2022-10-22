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
    icon: '/static/pricing/faq1.webp',
    title: 'Will I pay for every employees?',
    description:
      'No, with Thimble you only get billed for what you use. You will get billed for each active user, meaning people going to an office every month (i.e. 100% remote workers can use Thimble for free). Also, you can cancel at any time.'
  },
  {
    icon: '/static/pricing/faq2.webp',
    title: 'Do you have a desk-booking tool?',
    description:
      "We have a space-booking system that allows employees to book their seats in the office and easily see who's around. It's faster and easier than desk-booking."
  },
  {
    icon: '/static/pricing/faq3.webp',
    title: 'We need to add new users to our team. How will that be billed?',
    description:
      'We’ll make a one-time, prorated charge to your credit card to cover your new team member’s account for the remainder of the current billing period.'
  },
  {
    icon: '/static/pricing/faq4.webp',
    title: 'How long is my trial period?',
    description: '1 month starting on the account creation.'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
  }
}));

const FaqCard = styled('div')(() => ({
  display: 'flex'
}));

const CardStyle = styled(Card)(() => ({
  maxWidth: '100%',
  minHeight: 240,
  textAlign: 'left',
  boxShadow: 'none'
}));

const CardIconStyle = styled('img')(() => ({
  width: 'auto',
  height: 75,
  marginRight: '10px'
}));

const PoppinsRegular = "'PoppinsRegular', sans-serif";
const PoppinsLight = "'PoppinsLight', sans-serif";
// ----------------------------------------------------------------------

export default function LandingFrequentlyAsk() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 2, md: 5 }, mt: '30px' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography
              variant="h3"
              align="left"
              sx={{ fontFamily: PoppinsRegular }}
            >
              Frequently asked
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 1 : 1}>
          {CARDS.map((card) => (
            <Grid key={card.title} item xs={12} md={6}>
              <MotionInView variants={varFadeInUp}>
                <FaqCard>
                  <CardIconStyle src={card.icon} alt={card.title} />
                  <CardStyle>
                    <Typography
                      variant="h5"
                      paragraph
                      sx={{ fontFamily: PoppinsRegular, textAlign: 'left' }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'text.primary',
                        fontFamily: PoppinsLight,
                        textAlign: 'left'
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardStyle>
                </FaqCard>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
