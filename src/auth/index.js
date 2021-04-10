import React, { useState, useLayoutEffect } from 'react';
import { lazyload } from '../common/Loading';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, Collapse, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NavBar } from './AuthNavBar';
import { authRoute } from '../constants';
import { DrawerBar } from './AuthDrawer';
// import { Footer } from '../common/Footer';
import { useIsDesktop } from '../hooks';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = lazyload(() => import('./AuthLoginForm'));
const HospitalRegisterForm = lazyload(() =>
  import('./AuthRegisterHospitalForm')
);
const ForgetPasswordForm = lazyload(() => import('./AuthForgetPasswordForm'));

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

  return (
    <Box display='flex' flexDirection='column'>
      {location.pathname === authRoute.FORGET_PASSWORD ? (
        <Box>
          <Typography>Logo</Typography>
        </Box>
      ) : (
        <Box display='flex' paddingY={8}>
          <NavBar toggleDrawer={toggleDrawer} />
          <DrawerBar open={isOpen} close={toggleDrawer} />
        </Box>
      )}
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Switch>
          <Route path={authRoute.LOGIN} component={LoginForm} />
          <Route
            path={authRoute.FORGOTPASSWORD}
            component={ForgetPasswordForm}
          />
          <Route path={authRoute.REGISTER} component={HospitalRegisterForm} />
          <Redirect exact to={authRoute.LOGIN} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AuthPage;
