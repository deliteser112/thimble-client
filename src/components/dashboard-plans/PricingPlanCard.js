import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Button, Typography, Box } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
//

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'left',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object
};

const ManropeRegular = "'ManropeRegular', sans-serif";
const PoppinsRegular = "'PoppinsRegular', sans-serif";

export default function PricingPlanCard({ card, index }) {
  const {
    subscription,
    icon,
    price,
    caption,
    lists,
    labelAction,
    backColor
  } = card;

  return (
    <RootStyle
      sx={{
        backgroundColor: backColor,
        boxShadow:
          '0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)',
        borderRadius: '40px'
      }}
    >
      <Box
        component="img"
        alt={subscription}
        src={icon}
        sx={{ width: 80, height: 80, mt: 3 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: 'text.secondary', fontFamily: PoppinsRegular }}
        >
          {index !== 2 ? '$' : ''}
        </Typography>
        {index === 0 || index === 1 ? (
          <Typography variant="h3" sx={{ fontFamily: PoppinsRegular }}>
            {price}
          </Typography>
        ) : (
          <Typography variant="h5">Tailored</Typography>
        )}

        {index === 1 ? (
          <Typography
            gutterBottom
            component="span"
            variant="subtitle2"
            sx={{
              marginLeft: '10px',
              alignSelf: 'flex-end',
              fontFamily: PoppinsRegular
            }}
          >
            / active user* /month*
          </Typography>
        ) : (
          ''
        )}
      </Box>

      <Typography variant="h3" sx={{ fontFamily: PoppinsRegular }}>
        {subscription}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'black',
          textTransform: 'capitalize',
          fontFamily: ManropeRegular
        }}
      >
        {caption}
      </Typography>

      <Box
        component="ul"
        sx={{
          my: 2,
          width: '100%',
          ...(subscription === 'Enterprise' && { marginBottom: '55px' })
        }}
      >
        {lists.map((item) => (
          <Box
            key={item.text}
            component="li"
            sx={{
              display: 'flex',
              typography: 'body2',
              alignItems: 'center',
              color: item.isAvailable ? 'text.primary' : 'text.disabled',
              '&:not(:last-of-type)': { mb: 1 }
            }}
          >
            <Box
              component={Icon}
              icon={checkmarkFill}
              sx={{ width: 20, height: 20, mr: 1.5 }}
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: ManropeRegular
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {subscription !== 'Free' && (
        <Button
          size="large"
          variant="contained"
          component={RouterLink}
          to={PATH_DASHBOARD.root}
          color="warning"
          sx={{
            marginTop: '20px',
            backgroundColor: '#2E2836',
            color: 'white',
            fontSize: '18px',
            fontFamily: ManropeRegular,
            '&:hover': {
              backgroundColor: '#575058'
            }
          }}
        >
          {labelAction}
        </Button>
      )}
    </RootStyle>
  );
}
