import React from 'react';
import { lazyload } from '../common/Loading';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { PageRoute } from '../constants';

const AddUser = lazyload(() => import('./AdminRegisterUser'));

function ProfilePage(params) {
  return (
    <Box>
      <Switch>
        <Route exact path={PageRoute.REGISTER} component={AddUser} />
        <Redirect to={PageRoute.REGISTER} />
      </Switch>
    </Box>
  );
}

export default ProfilePage;
