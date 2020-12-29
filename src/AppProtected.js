import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import AppNavbar from './AppNavbar';
import AppDrawer from './AppDrawer';
import { lazyload } from './common/Loading';
import { PageRoute } from './constants';
import { Switch, Route, Redirect } from 'react-router-dom';

const Dashboard = lazyload(() => import('./dashboard'));

function AppProtected(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawerOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };
  const toggleDrawerClose = () => {
    setIsOpen(false);
  };
  return (
    <Box display='flex' height={1}>
      <AppDrawer drawer={isOpen} handleDrawerClose={toggleDrawerClose} />
      <Box flex={1} display='flex' flexDirection='column'>
        <AppNavbar drawer={isOpen} handleDrawerOpen={toggleDrawerOpen} />
        <Switch>
          <Route exact path={PageRoute.DASHBOARD} component={Dashboard} />
          <Redirect to={PageRoute.DASHBOARD} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AppProtected;
