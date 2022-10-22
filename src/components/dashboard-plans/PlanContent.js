import React, { useState, useEffect } from 'react';
// import { useTheme } from '@material-ui/core/styles';

import { Container, Box, Grid } from '@material-ui/core';

import PlanStatus from './PlanStatus';
import PricingPlanCard from './PricingPlanCard';

export default function PlanContent() {
  // const theme = useTheme();
  const [plans, setPlans] = useState(PLANS);

  useEffect(() => {
    setPlans(PLANS);
  }, []);

  const handlePlanPrice = (price) => {
    if (plans.length > 0) {
      const tmpPlans = plans;
      tmpPlans[1].price = price;
      setPlans([...tmpPlans]);
    }
  };

  return (
    <Container maxWidth="xl">
      <PlanStatus planProps={handlePlanPrice} />
      <Box m={3} />
      <Grid container spacing={3}>
        {plans.map((card, index) => (
          <Grid item xs={12} md={6} lg={4} key={card.subscription}>
            <PricingPlanCard card={card} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

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
    price: 5,
    caption: 'Everything in Free plan +',
    lists: [
      { text: 'Advanced features', isAvailable: true },
      { text: 'Unlimited users', isAvailable: true },
      { text: 'Analytics dashboard', isAvailable: true },
      { text: 'Unlimited integrations', isAvailable: true }
    ],
    backColor: '#FFFFFF',
    labelAction: 'Upgrade now'
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
