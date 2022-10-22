// material
import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import bellFill from '@iconify/icons-eva/bell-fill';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import LockIcon from '@material-ui/icons/Lock';
// material
import { Container, Tab, Box, Tabs } from '@material-ui/core';

import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// components
import SlackIntegration from './SlackIntegration';
import GeneralProfile from './GeneralProfile';
import AboutProfile from './AboutProfile';
import ContactProfile from './ContactProfile';
import ChangePassword from './ChangePassword';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('informations');

  const { userList } = useSelector((state) => state.user);

  const { pathname } = useLocation();
  const { userId } = useParams();
  const isEdit = pathname.includes('edit');
  const currentUser = userList.find((user) => user.id === Number(userId));

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: 'informations',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <GeneralProfile isEdit={isEdit} currentUser={currentUser} />
    },
    {
      value: 'about',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AboutProfile />
    },
    {
      value: 'contact',
      icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <ContactProfile />
    },
    {
      value: 'Change Password',
      icon: <LockIcon />,
      component: <ChangePassword />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const SpaceStyle = styled('div')(({ theme }) => ({
    height: theme.spacing(4)
  }));

  return (
    <Container>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <SlackIntegration />
      </Box>
      <SpaceStyle />
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      <Box sx={{ mb: 5 }} />

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}
