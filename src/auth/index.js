import React from 'react';
import AuthNavBar from './AuthNavBar';
import { authRoute } from '../constants';
import { lazyload } from '../common/Loading';
import { Box, Typography } from '@material-ui/core';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
// import { Footer } from '../common/Footer';
// import { useIsDesktop } from '../hooks';
// import { useDispatch, useSelector } from 'react-redux';

const LoginForm = lazyload(() => import('./AuthLoginForm'));
const EmailRequest = lazyload(() => import('./AuthEmailRequest'));
const HospitalForm = lazyload(() => import('./AuthRegisterHospitalForm'));
const ForgotPassForm = lazyload(() => import('./AuthForgotPasswordForm'));

function AuthPage(props) {
  const location = useLocation();

  return (
    <Box height={1} display='flex' flexDirection='column'>
      {location.pathname === authRoute.FORGOTPASSWORD ? (
        <Box>
          <Typography>Logo</Typography>
        </Box>
      ) : (
        <Box display='flex' paddingY={8}>
          <AuthNavBar />
        </Box>
      )}
      <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Switch>
          <Route path={authRoute.LOGIN} component={LoginForm} />
          <Route path={authRoute.REGISTER} component={HospitalForm} />
          <Route path={authRoute.REQUESTEMAIL} component={EmailRequest} />
          <Route path={authRoute.FORGOTPASSWORD} component={ForgotPassForm} />
          <Redirect exact to={authRoute.LOGIN} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AuthPage;
