import { useRef, useState } from 'react';
import {
  useTheme,
  experimentalStyled as styled,
  withStyles
} from '@material-ui/core/styles';
// material
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography
} from '@material-ui/core';
// components
import MenuPopover from '../MenuPopover';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 0,
    label: 'Working remotely',
    icon: '🏡'
  },
  {
    value: 1,
    label: 'On the go',
    icon: '🚶‍♂️'
  },
  {
    value: 2,
    label: 'Not working',
    icon: '🏝'
  },
  {
    value: 3,
    label: 'At the office',
    icon: '💼'
  }
];

const ScheduleButton = styled('div')(({ theme }) => ({
  width: '80px',
  height: '80px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '56px',
    height: '56px'
  }
}));

const ScheduleItem = styled('div')(() => ({
  display: 'inline-block',
  width: '80px'
}));

const PopupMenu = withStyles(() => ({
  root: {
    '& .css-1uz16b9': {
      left: 90
    }
  }
}))(MenuPopover);

// ----------------------------------------------------------------------
const ManropeRegular = "'ManropeRegular', sans-serif";

export default function SchedulePopover(props) {
  // eslint-disable-next-line react/prop-types
  const { title } = props;
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState('?');
  const [selected, setSelected] = useState(0);
  const theme = useTheme();

  const handleIcon = (value) => {
    setOpen(false);
    setIcon(LANGS[value].icon);
    setSelected(value);
  };
  return (
    <ScheduleItem>
      <Typography
        align="center"
        sx={{
          fontFamily: ManropeRegular,
          color: 'black'
        }}
      >
        {title}
      </Typography>
      <ScheduleButton>
        <Button
          ref={anchorRef}
          onClick={() => setOpen(true)}
          sx={{
            border: '4px solid #FF8577',
            borderRadius: '32px',
            color: '#FF8577',
            width: '80px',
            height: '80px',
            ...(open && { bgcolor: 'action.selected' }),
            [theme.breakpoints.down('md')]: {
              border: '2px solid #FF8577',
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              minWidth: '20px'
            }
          }}
        >
          <Box
            role="img"
            aria-label="Panda"
            sx={{
              fontSize: '43px',
              [theme.breakpoints.down('md')]: {
                fontSize: '30px'
              }
            }}
          >
            {icon}
          </Box>
        </Button>
        <Box
          component="img"
          alt="checkedIcon"
          src="/static/how-it-works/checkerror.svg"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 28,
            height: 28,
            [theme.breakpoints.down('md')]: {
              width: 20,
              height: 20,
              bottom: '-5px',
              right: '-5px'
            }
          }}
        />
      </ScheduleButton>
      <PopupMenu
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 160
        }}
        sx={{ width: 220 }}
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === selected}
              onClick={() => handleIcon(option.value)}
              sx={{
                py: 0.2,
                px: 1,
                width: '90%',
                ml: '5%',
                borderRadius: '10px',
                mt: 1,
                mb: 1
              }}
            >
              <ListItemIcon>
                <span
                  role="img"
                  aria-label="Panda"
                  style={{ fontSize: '30px' }}
                >
                  {option.icon}
                </span>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </PopupMenu>
    </ScheduleItem>
  );
}
