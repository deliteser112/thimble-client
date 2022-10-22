/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { Box, Typography, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// components
import Scrollbar from '../Scrollbar';
//
import SelfSettingButton from '../dashboard-component/SelftSettingButton';
import UserScheduleStatus from '../dashboard-component/UserScheduleStatus';

// ----------------------------------------------------------------------

MobileViewDetail.propTypes = {
  todayTitle: PropTypes.string,
  daystatus: PropTypes.array,
  schedule: PropTypes.array,
  iconProps: PropTypes.func,
  showDetail: PropTypes.func,
  dayIndex: PropTypes.number,
  notStatusUsers: PropTypes.array,
  scheduleUsers: PropTypes.array,
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function MobileViewDetail({
  todayTitle,
  daystatus,
  schedule,
  iconProps,
  showDetail,
  dayIndex,
  notStatusUsers,
  scheduleUsers,
  isOpenSidebar,
  onCloseSidebar
}) {
  const { pathname } = useLocation();

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
      daystatus.map((day, dIndex) => {
        if (dayIndex === dIndex) {
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
    }
  }, [daystatus, schedule, dayIndex]);

  const changeIcon = (icon1, icon2, detail1, detail2, status) => {
    iconProps(icon1, icon2, detail1, detail2, status, dayIndex);
  };

  const handleBack = () => {
    showDetail(false);
  };

  const renderMoblieContent = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        right: 0,
        top: 0
      }}
    >
      <Scrollbar>
        <Box sx={{ px: 2.5, py: 3, mt: 17 }}>
          <Typography
            variant="h4"
            sx={{ color: 'text.primary', textAlign: 'center' }}
          >
            {todayTitle}
          </Typography>
          <IconButton aria-label="delete" onClick={handleBack}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <SelfSettingButton
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
    </Box>
  );

  return <>{renderMoblieContent}</>;
}
