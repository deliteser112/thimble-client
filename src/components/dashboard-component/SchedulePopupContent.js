import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Card,
  Box,
  List,
  Typography,
  ListItem,
  Button,
  CardContent,
  ListItemText,
  ListItemIcon,
  ToggleButton
} from '@material-ui/core';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrganizations } from '../../redux/slices/adminSetting';

// routes
// components
import BlockSchedule from './BlockSchedule';
import TypeButton from './TypeButton';
import SimpleDialogDemo from './SettingDialog';

SchedulePopupContent.propTypes = {
  mInit: PropTypes.number,
  aInit: PropTypes.number,
  halfday: PropTypes.bool,
  Schedule: PropTypes.array,
  detailInfo: PropTypes.object,
  weekTitle: PropTypes.string,
  iconProps: PropTypes.func
};

// ----------------------------------------------------------------------

const ListWrapperStyle = styled('div')(() => ({
  width: '100%'
}));

// ----------------------------------------------------------------------

export default function SchedulePopupContent({
  mInit,
  aInit,
  halfday,
  Schedule,
  detailInfo,
  weekTitle,
  iconProps
}) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { organizations } = useSelector((state) => state.adminSetting);

  const [selectedMorning, setSelectedMorning] = useState(mInit);
  const [selectedAfternoon, setSelectedAfternoon] = useState(aInit);
  const [isHalf, setIsHalf] = useState(!halfday);
  const [isHalfOrg, setIsHalfOrg] = useState(false);

  const [morningDetail, setMorningDetail] = useState({});
  const [afternoonDetail, setAfternoonDetail] = useState({});

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    const { result } = organizations;
    if (result.features.isHalfDays === 0) {
      setIsHalf(true);
      setIsHalfOrg(true);
    }
  }, [organizations]);

  useEffect(() => {
    setSelectedMorning(mInit);
    setSelectedAfternoon(aInit);
  }, [mInit, aInit]);

  const handleListItemClickMorning = (event, index, id, type) => {
    const detail = {
      id,
      type
    };
    setMorningDetail(detail);
    setSelectedMorning(index);
  };

  const handleListItemClickAfternoon = (event, index, id, type) => {
    const detail = {
      id,
      type
    };
    setAfternoonDetail(detail);
    setSelectedAfternoon(index);
  };

  const handleClick = () => {
    iconProps(
      selectedMorning,
      selectedAfternoon,
      morningDetail.id === undefined ? detailInfo.morning : morningDetail,
      afternoonDetail.id === undefined ? detailInfo.afternoon : afternoonDetail,
      !isHalf
    );
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: theme.spacing(2.4),
          minWidth: 320,
          [theme.breakpoints.up('sm')]: { minWidth: 350 }
        }}
      >
        <Box
          sx={{
            padding: '24px 24px 0',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h5" sx={{ margin: 'auto' }}>
            {weekTitle}
          </Typography>
          <SimpleDialogDemo />
        </Box>
        <CardContent>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: 'rgb(135, 143, 177)',
                mb: 1
              }}
            >
              <Box
                component="img"
                src="/static/dashboard/home/light_mode_black_24dp.svg"
                sx={{ mr: 1 }}
              />
              {!isHalf ? (
                <Typography variant="body2">MORNING</Typography>
              ) : (
                <Typography variant="body2">ALL DAY</Typography>
              )}
            </Box>
            <BlockSchedule sx={{ mb: 3, ...(isHalf && { height: 360 }) }}>
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  {Schedule.map((item, index) => (
                    <ListItem
                      key={index}
                      button
                      selected={selectedMorning === index}
                      onClick={(event) =>
                        handleListItemClickMorning(
                          event,
                          index,
                          item.id,
                          item.type
                        )
                      }
                      sx={{ borderRadius: '10px' }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            borderRadius: '50%',
                            border: '3px solid #E7ECF5',
                            width: '50px',
                            height: '50px',
                            paddingTop: '2px',
                            textAlign: 'center'
                          }}
                        >
                          <span
                            role="img"
                            aria-label="Panda"
                            style={{ fontSize: '25px' }}
                          >
                            {item.emoji}
                          </span>
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  ))}
                </List>
              </ListWrapperStyle>
            </BlockSchedule>
          </Box>

          <Box sx={{ ...(isHalf && { display: 'none' }) }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: 'rgb(135, 143, 177)',
                mb: 1
              }}
            >
              <Box
                component="img"
                src="/static/dashboard/home/nightlight_black_24dp.svg"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2">AFTERNOON</Typography>
            </Box>
            <BlockSchedule sx={{ mb: 3 }}>
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  {Schedule.map((item, index) => (
                    <ListItem
                      key={index}
                      button
                      selected={selectedAfternoon === index}
                      onClick={(event) =>
                        handleListItemClickAfternoon(
                          event,
                          index,
                          item.id,
                          item.type
                        )
                      }
                      sx={{ borderRadius: '10px' }}
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
                            {item.emoji}
                          </span>
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  ))}
                </List>
              </ListWrapperStyle>
            </BlockSchedule>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ToggleButton
              disabled={isHalfOrg}
              value="check"
              selected={isHalf}
              onChange={() => {
                setIsHalf(!isHalf);
              }}
              sx={{ padding: '5px 10px', minWidth: '110px' }}
            >
              {isHalf ? <TypeButton type="all" /> : <TypeButton type="half" />}
            </ToggleButton>
            <Button variant="outlined" onClick={handleClick}>
              Set Status
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
