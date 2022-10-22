// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Grid, Container, Typography, Box } from '@material-ui/core';

// components
import PricingPlanCard from './PricingPlanCard';

// ----------------------------------------------------------------------

const PLANS = [
  {
    subscription: 'Free',
    icon: '/static/how-it-works/plan1.webp',
    price: 0,
    caption: 'For now & for ever!',
    lists: [
      { text: 'Basic features', isAvailable: true },
      { text: 'Up to 50 users', isAvailable: true },
      { text: 'Slack integration', isAvailable: true },
      { text: 'Teams integration', isAvailable: true }
    ],
    backColor: '#F4F1FF',
    labelAction: 'Get Started'
  },
  {
    subscription: 'Premium',
    icon: '/static/how-it-works/plan2.webp',
    price: 3.4,
    caption: 'Everything in Free plan +',
    lists: [
      { text: 'Advanced features', isAvailable: true },
      { text: 'Unlimited users', isAvailable: true },
      { text: 'Analytics dashboard', isAvailable: true },
      { text: 'Unlimited integrations', isAvailable: true }
    ],
    backColor: '#FFFFFF',
    labelAction: 'Try for Free'
  },
  {
    subscription: 'Enterprise',
    icon: '/static/how-it-works/plan3.webp',
    price: 9.99,
    caption: 'Suitable for large organizations',
    lists: [
      { text: 'Dedicated Manager', isAvailable: true },
      { text: 'Customized contracts', isAvailable: true }
    ],
    backColor: '#FBE489',
    labelAction: 'Contact us'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  backgroundColor: '#2E2836'
}));

const Layer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: '180px',
  backgroundColor: '#FCEEE2'
}));
const HeroImageLogo = styled('img')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    left: 0,
    width: 'auto',
    height: '50px'
  }
}));

const Image = [
  {
    id: 1,
    img_src: '/static/how-it-works/hris2.webp'
  },
  {
    id: 2,
    img_src: '/static/how-it-works/hris3.webp'
  },
  {
    id: 3,
    img_src: '/static/how-it-works/hris4.webp'
  }
];

// ----------------------------------------------------------------------

const PoppinsRegular = "'PoppinsRegular', sans-serif";

export default function LandingPrice() {
  return (
    <>
      <Layer />
      <RootStyle>
        <Container maxWidth="lg" sx={{ marginTop: '-430px' }}>
          <Grid container spacing={3}>
            {PLANS.map((card, index) => (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard card={card} index={index} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: '60px' }}>
            <Typography
              variant="h4"
              sx={{ color: 'white', fontFamily: PoppinsRegular }}
            >
              Integrate with your HRIS tools
            </Typography>
            <Container maxWidth="md" sx={{ mt: 7, mb: 3 }}>
              <Grid container spacing={3}>
                {Image.map((item) => (
                  <Grid
                    item
                    sx={{ color: 'white' }}
                    xs={4}
                    sm={4}
                    md={4}
                    key={item.id}
                  >
                    <HeroImageLogo alt="hero" src={item.img_src} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Container>
      </RootStyle>
    </>
  );
}
