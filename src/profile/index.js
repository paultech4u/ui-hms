import React from 'react';
import { lazyload } from '../common/Loading';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { PageRoute } from '../constants';

const Profile = lazyload(() => import('./Profile'));

function ProfilePage(params) {
  return (
    <Box>
      <Switch>
        <Route exact path={PageRoute.PROFILE} component={Profile} />
        <Redirect to={PageRoute.PROFILE} />
      </Switch>
    </Box>
  );
}

export default ProfilePage;
