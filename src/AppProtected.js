import React, { useLayoutEffect, useState, useEffect } from 'react';
import AppNavbar from './AppNavbar';
import AppDrawer from './AppDrawer';
import {
  getProfileDetailAction,
  successAction as profileSuccessAction,
} from './profile/ProfileStoreSlice';
import { successAction as authSuccessAction } from './auth/AuthStoreSlice';
import { useIsMobile } from './hooks';
import { pageRoute } from './constants';
import { Box } from '@material-ui/core';
import { lazyload } from './common/Loading';
import { NotifitionAlert } from './common/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

const Profile = lazyload(() => import('./profile/Profile'));
const Dashboard = lazyload(() => import('./dashboard/Dashboard'));
const EditProfile = lazyload(() => import('./profile/ProfileEdit'));

function AppProtected(props) {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (isLoading === 'success') {
      setOpenAlert(true);
      dispatch(authSuccessAction());
      return;
    }
  }, [isLoading, dispatch]);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

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
          dispatch(profileSuccessAction());
        }, 2000);
        return;
      }
    }
    return () => clearTimeout(timer);
  }, [profile, location.pathname, accessToken, dispatch]);

  const showBackground = location.state && location.state.background;

  return (
    <Box display='flex' height={1}>
      <AppDrawer drawer={isOpen} handleDrawerClose={toggleDrawerClose} />
      <Box flex={1} display='flex' flexDirection='column'>
        <AppNavbar drawer={isOpen} handleDrawerOpen={toggleDrawerOpen} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Switch location={showBackground || location}>
            <Route exact path={pageRoute.PROFILE} component={Profile} />
            <Route exact path={pageRoute.DASHBOARD} component={Dashboard} />
            <Redirect to={pageRoute.DASHBOARD} />
          </Switch>
          {showBackground && (
            <Route path={pageRoute.EDITPROFILE} component={EditProfile} />
          )}
        </main>
      </Box>
      <NotifitionAlert
        open={openAlert}
        severity='success'
        onClose={handleAlertClose}>
        Login Successful
      </NotifitionAlert>
    </Box>
  );
}

export default AppProtected;
