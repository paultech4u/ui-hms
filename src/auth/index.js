import React from 'react';
import { route } from '../constants';
import { lazyload } from '../common/Loading';
import { Box } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';

const LoginForm = lazyload(() => import('./AuthLoginForm'));
const EmailRequestForm = lazyload(() => import('./AuthEmailRequestForm'));
const HospitalForm = lazyload(() => import('./AuthRegisterHospitalForm'));
const ForgotPasswordForm = lazyload(() => import('./AuthForgotPasswordForm'));

function AuthPage(props) {
  // const location = useLocation();

  // const showBackground = location.state && location.state.background;

  return (
    <Box height={1} overflow='auto' bgcolor='primary.main'>
      <Switch>
        <Route path={route.LOGIN} component={LoginForm} />
        <Route path={route.REGISTER} component={HospitalForm} />
        <Route path={route.EMAILREQUEST} component={EmailRequestForm} />
        <Route path={route.FORGOTPASSWORD} component={ForgotPasswordForm} />
        <Redirect exact to={route.LOGIN} />
      </Switch>
    </Box>
  );
}

export default AuthPage;
