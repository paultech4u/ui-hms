import React from 'react';
import { lazyload } from '../common/Loading';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { PageRoute } from '../constants';

const AddUser = lazyload(() => import('./AdminRegisterUser'));

function AdminPage(params) {
  return (
    <Box padding={20}>
      <Box display='flex' justifyContent='center'>
        <Switch>
          <Route exact path={PageRoute.REGISTER} component={AddUser} />
          <Redirect to={PageRoute.REGISTER} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AdminPage;
