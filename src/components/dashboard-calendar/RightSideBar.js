/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Drawer, Typography } from '@material-ui/core';
// components
import Scrollbar from '../Scrollbar';
//
import SelfSettingButton from '../dashboard-component/SelftSettingButton';
import UserScheduleStatus from '../dashboard-component/UserScheduleStatus';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 480;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up(1400)]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

// ----------------------------------------------------------------------

RightSideBar.propTypes = {
  todayTitle: PropTypes.string,
  daystatus: PropTypes.array,
  schedule: PropTypes.array,
  iconProps: PropTypes.func,
  cToday: PropTypes.object,
  notStatusUsers: PropTypes.array,
  scheduleUsers: PropTypes.array,
  isOpenSidebar: PropTypes.bool,
  isDetail: PropTypes.bool,
  currentUser: PropTypes.object,
  onCloseSidebar: PropTypes.func
};

export default function RightSideBar({
  todayTitle,
  daystatus,
  schedule,
  iconProps,
  cToday,
  notStatusUsers,
  scheduleUsers,
  isOpenSidebar,
  isDetail,
  currentUser,
  onCloseSidebar
}) {
  const { pathname } = useLocation();
  const theme = useTheme();

  const [icon, setIcon] = useState('');
  const [isHalf, setIsHalf] = useState(false);
  const [isWork, setIsWork] = useState(false);
  const [detail, setDetail] = useState({});
  const [weekTitle, setWeekTitle] = useState('');
  const [notStatusYet, setNotStatusYet] = useState(false);
  const [sTitle, setTitle] = useState('');

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
  }, [isOpenSidebar, onCloseSidebar, pathname]);

  useEffect(() => {
    if (daystatus.length > 0 && schedule.length > 0) {
      daystatus.map((months, mIndex) => {
        months.map((day) => {
          if (mIndex === cToday.month && day.id === cToday.day) {
            setIcon(day.icon);
            setIsHalf(day.halfday);
            setIsWork(day.work);
            setWeekTitle(day.weekTitle);
            setIsActive(day.isActive);
            const detailInfo = {
              morning: {
                id: day.detail.morning.id,
                type: day.detail.morning.type
              },
              afternoon: {
                id: day.detail.afternoon.id,
                type: day.detail.afternoon.type
              }
            };
            setDetail(detailInfo);
            let notStatus = true;
            schedule.map((sche) => {
              if (
                sche.id === day.detail.morning.id &&
                sche.type === day.detail.morning.type
              ) {
                notStatus = false;
                setTitle(sche.title);
              }
            });
            setNotStatusYet(notStatus);
          }
        });
      });
    }
  }, [daystatus, schedule, cToday]);

  const changeIcon = (icon1, icon2, detail1, detail2, status) => {
    iconProps(icon1, icon2, detail1, detail2, status, cToday.month, cToday.day);
  };

  const renderContent = (
    <Scrollbar>
      <Box sx={{ px: 2.5, py: 3, mt: 10 }}>
        <Typography
          variant="h4"
          sx={{ color: 'text.primary', textAlign: 'center' }}
        >
          {todayTitle}
        </Typography>
        <SelfSettingButton
          disabled={isDetail}
          currentUser={currentUser}
          schedule={schedule}
          icon={icon}
          halfday={isHalf}
          work={isWork}
          detailInfo={detail}
          weekTitle={weekTitle}
          iconProps={changeIcon}
          statusTitle={sTitle}
          notStatus={notStatusYet}
          isActive={isActive}
        />
        <Box m={5} />
        <UserScheduleStatus
          notStatusUsers={notStatusUsers}
          scheduleUsers={scheduleUsers}
        />
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <Box sx={{ [theme.breakpoints.down(1400)]: { display: 'none' } }}>
        <Drawer
          open
          anchor="right"
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Box>
    </RootStyle>
  );
}
