import React from 'react';
import AuthNavBar from './AuthNavBar';
import { authRoute } from '../constants';
import { lazyload } from '../common/Loading';
import { Box, Typography } from '@material-ui/core';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

const LoginForm = lazyload(() => import('./AuthLoginForm'));
const EmailRequest = lazyload(() => import('./AuthEmailRequest'));
const HospitalForm = lazyload(() => import('./AuthRegisterHospitalForm'));
const ForgotPassForm = lazyload(() => import('./AuthForgotPasswordForm'));

function AuthPage(props) {
  const location = useLocation();

  const showBackground = location.state && location.state.background;

  return (
    <Box height={1} display='flex' flexDirection='column' overflow='auto'>
      {location.pathname === authRoute.FORGOTPASSWORD ? (
        <Box>
          <Typography>Logo</Typography>
        </Box>
      ) : (
        <Box display='flex' paddingY={8}>
          <AuthNavBar />
        </Box>
      )}
      <Box flex={1} display='flex' alignItems='center' justifyContent='center'>
        <Switch location={showBackground || location}>
          <Route path={authRoute.LOGIN} component={LoginForm} />
          <Route path={authRoute.REGISTER} component={HospitalForm} />
          <Route path={authRoute.FORGOTPASSWORD} component={ForgotPassForm} />
          <Redirect exact to={authRoute.LOGIN} />
        </Switch>
        {showBackground && (
          <Route path={authRoute.REQUESTEMAIL} component={EmailRequest} />
        )}
      </Box>
    </Box>
  );
}

export default AuthPage;
