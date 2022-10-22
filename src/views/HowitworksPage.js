// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingMakeDecision,
  LandingPluginView,
  LandingSchedule
} from '../components/how-it-works';

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
    <RootStyle title="Thimble | How it works" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingMakeDecision />
        <LandingSchedule />
        <LandingPluginView />
      </ContentStyle>
    </RootStyle>
  );
}
