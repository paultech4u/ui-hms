import React, { useLayoutEffect, useState } from 'react';
import AppNavbar from './AppNavbar';
import AppDrawer from './AppDrawer';
import {
  successfulAction,
  getProfileDetailAction,
} from './profile/ProfileStoreSlice';
import { useIsMobile } from './hooks';
import { pageRoute } from './constants';
import { lazyload } from './common/Loading';
import { Box, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

const Dashboard = lazyload(() => import('./dashboard'));
const Profile = lazyload(() => import('./profile'));

function AppProtected(props) {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawerOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const toggleDrawerClose = () => {
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    if (isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isMobile]);

  const profile = useSelector((state) => state.profile.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  // get user profile
  React.useEffect(() => {
    if (location.pathname === pageRoute.PROFILE) {
      if (profile === null) {
        dispatch(getProfileDetailAction(accessToken));
        var timer = setTimeout(() => {
          dispatch(successfulAction());
        }, 2000);
        return;
      }
    }
    return () => clearTimeout(timer);
  }, [profile, location.pathname, accessToken, dispatch]);

  return (
    <Box display='flex' height={1}>
      <AppDrawer drawer={isOpen} handleDrawerClose={toggleDrawerClose} />
      <Box flex={1} display='flex' flexDirection='column'>
        <AppNavbar drawer={isOpen} handleDrawerOpen={toggleDrawerOpen} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Switch>
            <Route exact path={pageRoute.PROFILE} component={Profile} />
            <Route exact path={pageRoute.DASHBOARD} component={Dashboard} />
            <Redirect to={pageRoute.DASHBOARD} />
          </Switch>
        </main>
      </Box>
    </Box>
  );
}

export default AppProtected;
