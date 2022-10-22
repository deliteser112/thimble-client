// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingPrice,
  LandingComparePlan,
  LandingForEveryone,
  LandingFrequentlyAsk
} from '../components/pricing-page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function HowitworksPage() {
  return (
    <RootStyle title="Thimble | Pricing" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingPrice />
        <LandingComparePlan />
        <LandingForEveryone />
        <LandingFrequentlyAsk />
      </ContentStyle>
    </RootStyle>
  );
}
