import React, { useLayoutEffect, useState, useEffect } from 'react';
import AppNavbar from './AppNavbar';
import AppDrawer from './AppDrawer';
import {
  getProfileDetailAction,
  successAction as profileSuccessAction,
} from './profile/ProfileStoreSlice';
import { useIsMobile } from './hooks';
import { Box, makeStyles } from '@material-ui/core';
import { Footer } from './AppFooter';
import { lazyload } from './common/Loading';
import { NotifitionAlert } from './common/Alert';
import { route, profileRoute } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer, closeDrawer } from './AppStoreSlice';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { successAction as authSuccessAction } from './auth/AuthStoreSlice';

const Profile = lazyload(() => import('./profile/Profile'));
const Doctors = lazyload(() => import('./pages/doctor/Doctors'));
const AddDoctors = lazyload(() => import('./pages/doctor/AddDoctor'))
const Nurses = lazyload(() => import('./pages/nurse/Nurses'));
const Dashboard = lazyload(() => import('./dashboard/Dashboard'));
const EditProfile = lazyload(() => import('./profile/ProfileEdit'));

function AppProtected(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  // const [isOpen, setIsOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const drawer = useSelector((state) => state.app.drawer);
  const profile = useSelector((state) => state.profile.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const accessToken = useSelector((state) => state.auth.accessToken);

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

  const toggleDrawer = () => {
    if (drawer === true) {
      dispatch(closeDrawer(false));
    } else {
      dispatch(openDrawer(true));
    }
  };

  useLayoutEffect(() => {
    if (isMobile) {
      dispatch(openDrawer(true));
    } else {
      dispatch(closeDrawer(false));
    }
  }, [isMobile, dispatch]);

  // get user profile
  React.useEffect(() => {
    if (location.pathname === route.PROFILE) {
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
      <AppDrawer drawer={drawer} onDrawerClose={toggleDrawer} />
      <Box flex={1} display='flex' flexDirection='column'>
        <AppNavbar drawer={drawer} handleDrawerOpen={toggleDrawer} />
        <main className={classes.main}>
          <Switch location={showBackground || location}>
            <Route exact path={route.PROFILE} component={Profile} />
            <Route exact path={route.DOCTOR} component={Doctors} />
            <Route exact path={route.NURSE} component={Nurses} />
            <Route exact path={route.DASHBOARD} component={Dashboard} />
            <Route exact path={route.ADDNEWDOCTOR} component={AddDoctors}/>
            <Redirect to={route.DASHBOARD} />
          </Switch>
          {showBackground && (
            <Route path={profileRoute.EDIT} component={EditProfile} />
          )}
          <footer>
            <Footer />
          </footer>
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

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export default AppProtected;
