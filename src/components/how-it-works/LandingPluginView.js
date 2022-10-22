// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
//

import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MotionInView, varFadeInRight } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: '#FCEEE2'
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

const RightItem = styled('div')(() => ({
  height: '100%'
}));

// ----------------------------------------------------------------------

export default function LandingPluginView() {
  const theme = useTheme();
  const PoppinsMedium = "'PoppinsMedium', sans-serif";
  const PoppinsStandard = "'PoppinsStandard', sans-serif";

  const [expanded, setExpanded] = React.useState('panel1');
  const [imageSrc, setImage] = React.useState(
    '/static/how-it-works/product4.webp'
  );

  const handleChange = (panel) => (event, isExpanded) => {
    switch (panel) {
      case 'panel1':
        setImage('/static/how-it-works/product4.webp');
        break;
      case 'panel2':
        setImage('/static/how-it-works/product5.webp');
        break;
      case 'panel3':
        setImage('/static/how-it-works/product6.webp');
        break;
      default:
        setImage('/static/how-it-works/product4.webp');
        break;
    }
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} lg={5}>
            <ContentStyle>
              <RightItem
                sx={{
                  borderRadius: '0px !important',
                  '& .Mui-expanded': {
                    boxShadow: 'none !important',
                    borderRadius: '0px !important'
                  }
                }}
              >
                <Accordion
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                  sx={{
                    py: 2,
                    backgroundColor: 'transparent',
                    borderRadius: '0px !important',
                    borderTop: '2px solid black'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{ paddingLeft: '0px' }}
                  >
                    <Typography variant="h5" sx={{ fontFamily: PoppinsMedium }}>
                      Slack plugin
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingLeft: '0px' }}>
                    <Typography sx={{ fontFamily: PoppinsStandard }}>
                      Your Slack status is always up to date. Your teammates
                      never need to ask “Where are you today?”
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel2'}
                  onChange={handleChange('panel2')}
                  sx={{
                    py: 2,
                    backgroundColor: 'transparent',
                    borderRadius: '0px !important',
                    borderTop: '2px solid black'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    sx={{ paddingLeft: '0px' }}
                  >
                    <Typography variant="h5" sx={{ fontFamily: PoppinsMedium }}>
                      HRIS plugin
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingLeft: '0px' }}>
                    <Typography sx={{ fontFamily: PoppinsStandard }}>
                      Your holidays are synchronized without any action.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel3'}
                  onChange={handleChange('panel3')}
                  sx={{
                    py: 2,
                    backgroundColor: 'transparent',
                    borderRadius: '0px !important',
                    borderTop: '2px solid black'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    sx={{ paddingLeft: '0px' }}
                  >
                    <Typography variant="h5" sx={{ fontFamily: PoppinsMedium }}>
                      Weekly reminder
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingLeft: '0px' }}>
                    <Typography sx={{ fontFamily: PoppinsStandard }}>
                      When necessary, we will remind you to give your teammates
                      visibility.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </RightItem>
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
            <MotionInView variants={varFadeInRight} sx={{ textAlign: 'right' }}>
              <Box
                component="img"
                alt="theme mode"
                src={imageSrc}
                sx={{
                  marginLeft: '0px',
                  [theme.breakpoints.up('md')]: {
                    marginLeft: '148px',
                    maxWidth: { md: 'calc(100% - 148px)' },
                    transform: 'translateZ(0)'
                  }
                }}
              />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
