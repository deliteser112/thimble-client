/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
// import { Icon } from '@iconify/react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  List,
  Avatar,
  Drawer,
  Hidden,
  Typography,
  ListSubheader
} from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
//
import MenuLinks from './SidebarConfig';
import SidebarItem from './SidebarItem';
// hooks
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(1, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level }) {
  const key = item.href + level;

  if (item.items) {
    const match = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    array = [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderSidebarItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </SidebarItem>
    ];
  } else {
    array = [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        href={item.href}
        icon={item.icon}
        info={item.info}
        title={item.title}
      />
    ];
  }
  return array;
}

function renderSidebarItems({ items, pathname, level = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level }),
        []
      )}
    </List>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    if (isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const NewMenuLinks = [];
  if (user.roles === 'SUPER ADMIN') {
    MenuLinks.map((links) => {
      if (links.subheader === 'super admin') {
        NewMenuLinks.push(links);
      }
    });
  } else if (user.roles === 'ADMIN') {
    MenuLinks.map((links) => {
      if (links.subheader !== 'super admin') {
        NewMenuLinks.push(links);
      }
    });
  } else {
    MenuLinks.map((links) => {
      if (
        links.subheader !== 'admin settings' &&
        links.subheader !== 'super admin'
      ) {
        NewMenuLinks.push(links);
      }
    });
  }

  const renderContent = (
    <Scrollbar>
      <Box sx={{ px: 2.5, py: 3 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Box>

      <Link underline="none" component={RouterLink} to="#">
        <AccountStyle>
          <Avatar alt={user.firstname} src={user.photoURL} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {user.firstname} {user.lastname}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {user.roles}
            </Typography>
          </Box>
        </AccountStyle>
      </Link>

      {NewMenuLinks.map((list) => (
        <List
          disablePadding
          key={list.subheader}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              sx={{
                mt: 3,
                mb: 2,
                pl: 5,
                color: 'text.secondary',
                typography: 'overline'
              }}
            >
              {list.subheader}
            </ListSubheader>
          }
        >
          {renderSidebarItems({
            items: list.items,
            pathname
          })}
        </List>
      ))}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
}
