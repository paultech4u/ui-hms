import React, { useState, useLayoutEffect } from 'react';
import { lazyload } from '../common/Loading';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, Collapse, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NavBar } from './AuthNavBar';
import { AuthRoute } from '../constants';
import { DrawerBar } from './AuthDrawer';
// import { Footer } from '../common/Footer';
import { useIsDesktop } from '../hooks';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutAlert } from './AuthLoginSlice';

const LoginPage = lazyload(() => import('./AuthLogin'));
const RegisterPage = lazyload(() => import('./AuthRegister'));
const ScreenLock = lazyload(() => import('./AuthScreenLock'));
const ForgetPasswordPage = lazyload(() => import('./AuthForgetPassword'));

function AuthPage(props) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const location = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

  const { openLogoutAlert } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setOpen = (bool) => {
    dispatch(handleLogoutAlert(bool));
  };

  React.useEffect(() => {
    if (openLogoutAlert === true) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }

    return () => clearTimeout(1000);
  });

  return (
    <Box height={1} display='flex' flexDirection='column'>
      <Box>
        <Collapse in={openLogoutAlert} unmountOnExit={true}>
          <Alert onClose={() => setOpen(false)} severity='info'>
            Session expired
          </Alert>
        </Collapse>
      </Box>
      {location.pathname === AuthRoute.FORGET_PASSWORD ? (
        <Box>
          <Typography>Logo</Typography>
        </Box>
      ) : (
        <Box display='flex' paddingY={8}>
          <NavBar toggleDrawer={toggleDrawer} />
          <DrawerBar open={isOpen} close={toggleDrawer} />
        </Box>
      )}
      <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Switch>
          <Route exact path={AuthRoute.LOGIN} component={LoginPage} />
          <Route path={AuthRoute.REGISTER} component={RegisterPage} />
          <Route path={AuthRoute.LOCK} component={ScreenLock} />
          <Route
            path={AuthRoute.FORGET_PASSWORD}
            component={ForgetPasswordPage}
          />
          <Redirect to={AuthRoute.LOGIN} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AuthPage;
