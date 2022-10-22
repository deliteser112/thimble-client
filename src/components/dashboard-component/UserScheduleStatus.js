import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  AvatarGroup
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { PATH_DASHBOARD } from '../../routes/paths';
import Heatmap from './Heatmap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    padding: theme.spacing(1.5, 0, 1, 2),
    minWidth: '200px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.5, 0, 1, 2)
  }
}));

UserScheduleStatus.propTypes = {
  notStatusUsers: PropTypes.array,
  scheduleUsers: PropTypes.array
};

export default function UserScheduleStatus({ notStatusUsers, scheduleUsers }) {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {scheduleUsers.map((status, index) => (
        <Accordion
          key={index}
          expanded={expanded === status.schTitle}
          onChange={handleChange(status.schTitle)}
          sx={{
            margin: theme.spacing(1, 0, 0),
            border: '1px solid #E7ECF5',
            borderRadius: '12px !important',
            mb: 5,
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 60,
                    height: 60
                  }}
                >
                  {status.type === 'office' ? (
                    <Heatmap occupancy={status.occupancy} isCalendar={false} />
                  ) : (
                    <Heatmap occupancy={0} />
                  )}
                  <Box
                    role="img"
                    aria-label="Panda"
                    sx={{
                      fontSize: '25px',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {status.emoji}
                  </Box>
                </Box>
                <Typography variant="subtitle1" sx={{ py: 2, px: 1 }}>
                  {status.schTitle}{' '}
                  {status.type === 'office' ? (
                    <Typography variant="caption">
                      ({status.users.length}/{status.capacity})
                    </Typography>
                  ) : (
                    <Typography variant="caption">
                      ({status.users.length})
                    </Typography>
                  )}
                </Typography>
              </Box>

              {expanded !== status.schTitle && (
                <AvatarGroup max={3}>
                  {status.users.map((item, index) => (
                    <Avatar
                      key={index}
                      alt={item.name}
                      src={item.photoURL}
                      sx={{
                        width: theme.spacing(5),
                        height: theme.spacing(5),
                        ...(item.isTeam && {
                          border: '2px solid #003cff !important'
                        })
                      }}
                    />
                  ))}
                </AvatarGroup>
              )}
            </Box>
          </AccordionSummary>
          {/* <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              '& .css-o4b71y-MuiAccordionSummary-content.Mui-expanded': {
                margin: theme.spacing(1, 0, 0)
              }
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'block'
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 60,
                    height: 60
                  }}
                >
                  {status.type === 'office' ? (
                    <Heatmap occupancy={status.occupancy} isCalendar={false} />
                  ) : (
                    <Heatmap occupancy={0} />
                  )}
                  <Box
                    role="img"
                    aria-label="Panda"
                    sx={{
                      fontSize: '25px',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {status.emoji}
                  </Box>
                </Box>
                <Typography variant="subtitle1" sx={{ py: 2, px: 1 }}>
                  {status.schTitle}{' '}
                  {status.type === 'office' ? (
                    <Typography variant="caption">
                      ({status.users.length}/{status.capacity})
                    </Typography>
                  ) : (
                    <Typography variant="caption">
                      ({status.users.length})
                    </Typography>
                  )}
                </Typography>
              </Box>

              {expanded !== status.schTitle && (
                <AvatarGroup
                  max={3}
                  // sx={{
                  //   justifyContent: 'flex-end',
                  //   marginLeft: '30px',
                  //   marginTop: '5px'
                  // }}
                >
                  {status.users.map((item, index) => (
                    <Avatar
                      key={index}
                      alt={item.name}
                      src={item.photoURL}
                      sx={{ width: theme.spacing(5), height: theme.spacing(5) }}
                    />
                  ))}
                </AvatarGroup>
              )}
            </Box>
          </AccordionSummary> */}
          <AccordionDetails>
            {status.users.map((item, index) => (
              <ListItem
                key={index}
                button
                // onClick={handleProfile}
                component={RouterLink}
                to={`${PATH_DASHBOARD.general.calendar}/${item.id}/detail`}
                sx={{ borderRadius: '10px' }}
              >
                <ListItemIcon sx={{ marginRight: '3px' }}>
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px'
                    }}
                  >
                    <Avatar
                      alt={item.name}
                      src={item.photoURL}
                      sx={{
                        width: theme.spacing(6),
                        height: theme.spacing(6),
                        ...(item.isTeam && {
                          border: '2px solid #003cff !important'
                        })
                      }}
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      {notStatusUsers.length > 0 && (
        <Accordion
          expanded={expanded === 'not-status'}
          onChange={handleChange('not-status')}
          sx={{
            border: '1px solid #E7ECF5',
            borderRadius: '24px !important',
            mb: 5,
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex' }}>
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
                    style={{ fontSize: '25px', marginTop: '10px' }}
                  >
                    🤔
                  </span>
                </Box>
                <Typography variant="subtitle1" sx={{ py: 2, px: 1 }}>
                  No Status yet{' '}
                  <Typography variant="caption">
                    ({notStatusUsers.length})
                  </Typography>
                </Typography>
              </Box>

              {expanded !== 'not-status' && (
                <AvatarGroup max={3}>
                  {notStatusUsers.map((item, index) => (
                    <Avatar key={index} alt={item.name} src={item.photoURL} />
                  ))}
                </AvatarGroup>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {notStatusUsers.map((item, index) => (
              <ListItem
                key={index}
                button
                component={RouterLink}
                to={`${PATH_DASHBOARD.general.calendar}/${item.id}/detail`}
                sx={{ borderRadius: '10px' }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px'
                    }}
                  >
                    <Avatar
                      alt={item.name}
                      src={item.photoURL}
                      sx={{
                        width: theme.spacing(6),
                        height: theme.spacing(6),
                        marginLeft: theme.spacing(-1)
                      }}
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

// photoURL: "user.photoURL"
// id: 3
// name: "Zlenko Sofia"
