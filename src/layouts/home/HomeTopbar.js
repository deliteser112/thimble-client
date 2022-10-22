// material
import { motion } from 'framer-motion';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
// ----------------------------------------------------------------------

const ProductHuntImg = styled(motion.img)(({ theme }) => ({
  zIndex: 8,
  width: '100%',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    left: 0,
    display: 'block',
    width: 'auto',
    height: '40px',
    marginRight: 10
  }
}));

const TechCrunchImg = styled(motion.img)(({ theme }) => ({
  zIndex: 8,
  width: '100%',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    left: 0,
    display: 'block',
    width: 'auto',
    height: '19px',
    marginRight: 10
  }
}));

const IsDesktopTopbar = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    alignItems: 'center'
  }
}));

const IsMobileTopbar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
  marginTop: '10px',
  marginBottom: '10px',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'none'
  }
}));

export default function HomeTopbar() {
  return (
    <>
      <IsDesktopTopbar>
        <>
          <TechCrunchImg alt="hero" src="/static/brand/techcrunch.png" />
          <span role="img" aria-label="Panda">
            Read our coverage in TechCrunch
          </span>
        </>
        <Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2 }} />
        <>
          <ProductHuntImg alt="hero" src="/static/brand/producthunt.png" />
          <span role="img" aria-label="Panda">
            Product of the week 🏅 on Product Hunt
          </span>
        </>
      </IsDesktopTopbar>
      <IsMobileTopbar>
        <span role="img" aria-label="Panda">
          We are on TechCrunch & Product Hunt 🥇
        </span>
      </IsMobileTopbar>
    </>
  );
}
