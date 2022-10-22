import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';

//------------------------------------------------------------

const LeftInit = [
  {
    value: 10,
    label: 'Working remotely',
    icon: '🏡'
  },
  {
    value: 11,
    label: 'On the go',
    icon: '🚶‍♂️'
  }
];

const RightInit = [
  {
    value: 20,
    label: 'At the office',
    icon: '💼'
  },
  {
    value: 21,
    label: 'With family',
    icon: '👨‍👨‍👦‍👦'
  }
];

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function AlertDialog() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(LeftInit);
  const [right, setRight] = React.useState(RightInit);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper
      sx={{
        width: '100%',
        [theme.breakpoints.up('md')]: {
          minWidth: '550px',
          border: '1px solid #E7ECF5',
          mb: 4
        }
      }}
    >
      <List dense component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-item-${item.value}-label`;

          return (
            <ListItem
              key={labelId}
              role="listitem"
              button
              onClick={handleToggle(item)}
              selected={checked.indexOf(item) !== -1}
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    borderRadius: '50%',
                    border: '3px solid #E7ECF5',
                    width: '50px',
                    height: '50px',
                    textAlign: 'center'
                  }}
                >
                  <span
                    role="img"
                    aria-label="Panda"
                    style={{ fontSize: '25px' }}
                  >
                    {item.icon}
                  </span>
                </Box>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <div>
      <Box
        component="img"
        src="/static/dashboard/home/setting_icon.svg"
        sx={{ cursor: 'pointer' }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography
          variant="h4"
          sx={{ padding: theme.spacing(3, 3, 1, 3), textAlign: 'center' }}
        >
          Offices preferences
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center'
          }}
        >
          Set offices according to the order you want to see first.
        </Typography>
        <DialogContent>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                padding: theme.spacing(4, 3, 1, 3),
                textAlign: 'center',
                letterSpacing: '2px'
              }}
            >
              MAIN OFFICES
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center'
              }}
            >
              Main offices are where you go regularly
            </Typography>
            <Box> {customList(left)} </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
                sx={{ mr: 1, [theme.breakpoints.up('md')]: { mr: 3 } }}
              >
                <Box
                  component="img"
                  src="/static/dashboard/home/angle-double-down.svg"
                  sx={{ height: '30px' }}
                />
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
                sx={{ mr: 1, [theme.breakpoints.up('md')]: { mr: 3 } }}
              >
                <Box
                  component="img"
                  src="/static/dashboard/home/angle-down.svg"
                  sx={{ height: '30px' }}
                />
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
                sx={{ mr: 1, [theme.breakpoints.up('md')]: { mr: 3 } }}
              >
                <Box
                  component="img"
                  src="/static/dashboard/home/angle-up.svg"
                  sx={{ height: '30px' }}
                />
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                <Box
                  component="img"
                  src="/static/dashboard/home/angle-double-up.svg"
                  sx={{ height: '30px' }}
                />
              </Button>
            </Box>
            <Typography
              variant="subtitle2"
              sx={{
                padding: theme.spacing(4, 3, 1, 3),
                textAlign: 'center',
                letterSpacing: '2px'
              }}
            >
              SECONDARY OFFICES
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center'
              }}
            >
              Secondary offices will be hidden by default
            </Typography>
            <Box>{customList(right)}</Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            color="primary"
            autoFocus
          >
            Validate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
