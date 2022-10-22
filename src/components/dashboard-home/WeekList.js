/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  // ListItemIcon,
  Divider,
  // Button,
  Typography,
  AvatarGroup,
  Avatar
} from '@material-ui/core';

import ScheduleHeatmap from '../dashboard-component/ScheduleHeatmap';

// ----------------------------------------------------------------------

const ListWrapperStyle = styled('div')(() => ({
  width: '100%'
}));

// const ScheduleDivider = styled('div')(() => ({
//   position: 'absolute',
//   width: '2px',
//   height: '40px',
//   borderRadius: '8px',
//   backgroundColor: '#e7ecf5',
//   transform: 'rotate(15deg)'
// }));

WeekList.propTypes = {
  firstDay: PropTypes.number,
  lastDay: PropTypes.number,
  dayIndex: PropTypes.number,
  daystatus: PropTypes.array,
  initShowDetail: PropTypes.func,
  viewDetailByClick: PropTypes.func
};

// ----------------------------------------------------------------------

export default function WeekList({
  firstDay,
  lastDay,
  dayIndex,
  initShowDetail,
  viewDetailByClick,
  daystatus
}) {
  const [selected, setSelected] = useState(dayIndex);

  const theme = useTheme();

  useEffect(() => {
    if (initShowDetail !== undefined && firstDay > 0 && lastDay > 0) {
      let today = new Date().getDate();
      const thisMonth = new Date().getMonth();
      if (today > lastDay) {
        today = firstDay;
      }

      let isset = false;
      daystatus.map((schedule, sIndex) => {
        if (schedule.id + 1 === today && schedule.month === thisMonth) {
          isset = true;
          initShowDetail(today, sIndex);
        }
      });
      if (!isset) initShowDetail(today, 0);
    }
  }, [firstDay, lastDay]);

  useEffect(() => {
    setSelected(dayIndex);
  }, [dayIndex]);

  const handleListItemClick = (event, id, month, index) => {
    viewDetailByClick(id, month, index);
    setSelected(index);
  };

  return (
    <>
      <ListWrapperStyle>
        <List component="nav" aria-label="main mailbox folders">
          {daystatus.map((item, index) => (
            <Box key={item.id}>
              <ListItem
                button
                selected={selected === index}
                onClick={(event) =>
                  handleListItemClick(event, item.id, item.month, index)
                }
                sx={{
                  display: 'block',
                  '&.Mui-selected': {
                    borderLeft: '3px solid #00AB55',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                  }
                }}
              >
                <Box m={2} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <ListItemIcon>
                    <Button
                      disabled
                      sx={{
                        border: '1px solid red',
                        borderRadius: '40%',
                        padding: theme.spacing(1.7, 0),
                        position: 'relative',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '0px',
                          width: '50px'
                        }
                      }}
                    >
                      <Box
                        role="img"
                        aria-label="Panda"
                        sx={{
                          fontSize: '15px',
                          [theme.breakpoints.up('md')]: { fontSize: '20px' }
                        }}
                      >
                        {item.icon}
                      </Box>
                      {item.halfday && <ScheduleDivider />}
                      {item.work ? (
                        <Box
                          component="img"
                          src="/static/dashboard/home/ok.svg"
                          sx={{
                            width: 18,
                            height: 18,
                            position: 'absolute',
                            right: 0,
                            bottom: 0
                          }}
                        />
                      ) : (
                        <Box
                          component="img"
                          src="/static/dashboard/home/cancel.svg"
                          sx={{
                            width: 18,
                            height: 18,
                            position: 'absolute',
                            right: 0,
                            bottom: 0
                          }}
                        />
                      )}
                    </Button>
                  </ListItemIcon> */}
                  <ListItemText primary={item.weekTitle} />
                </Box>
                {item.isOffice && (
                  <Box sx={{ ml: 4, mt: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box
                        sx={{
                          position: 'relative',
                          width: 45,
                          height: 45
                        }}
                      >
                        <ScheduleHeatmap
                          occupancy={item.officeInfos.occupancy}
                        />
                        <Box
                          role="img"
                          aria-label="Panda"
                          sx={{
                            fontSize: '20px',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          {item.officeInfos.emoji}
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ py: 1.2, px: 0.5 }}>
                        {item.officeInfos.schTitle}{' '}
                        <Typography variant="caption">
                          ({item.officeInfos.users.length}/
                          {item.officeInfos.capacity})
                        </Typography>
                      </Typography>
                    </Box>
                    <Box>
                      <AvatarGroup
                        max={5}
                        sx={{ ml: 2, justifyContent: 'flex-end' }}
                      >
                        {item.officeInfos.users.map((item, index) => (
                          <Avatar
                            key={index}
                            alt={item.name}
                            src={item.photoURL}
                            sx={{
                              width: theme.spacing(4.5),
                              height: theme.spacing(4.5)
                            }}
                          />
                        ))}
                      </AvatarGroup>
                    </Box>
                  </Box>
                )}
                <Box m={2} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </ListWrapperStyle>
    </>
  );
}
