import React from 'react';
import { lazyload } from '../common/Loading';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { NavBar } from './AuthNavBar';
import { AuthRoute } from '../constants';

const LoginPage = lazyload(() => import('./AuthLogin'));

function AuthPage(props) {
  return (
    <Box height={1} display='flex' flexDirection='column'>
      <Box display='flex' paddingY={8}>
        <NavBar />
      </Box>
      <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Switch>
          <Route exact path={AuthRoute.LOGIN} component={LoginPage} />
          <Redirect to={AuthRoute.LOGIN} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AuthPage;
