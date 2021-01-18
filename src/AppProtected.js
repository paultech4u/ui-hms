import React, { useLayoutEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import AppNavbar from './AppNavbar';
import AppDrawer from './AppDrawer';
import { lazyload } from './common/Loading';
import { PageRoute } from './constants';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useIsDesktop } from './hooks';

const Dashboard = lazyload(() => import('./dashboard'));
const Profile = lazyload(() => import('./profile'));

function AppProtected(props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawerOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };
  const toggleDrawerClose = () => {
    setIsOpen(false);
  };

  const isDesktop = useIsDesktop();

  useLayoutEffect(() => {
    if (isDesktop === true) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isDesktop]);

  return (
    <Box display='flex' height={1}>
      <AppDrawer drawer={isOpen} handleDrawerClose={toggleDrawerClose} />
      <Box flex={1} display='flex' flexDirection='column'>
        <AppNavbar drawer={isOpen} handleDrawerOpen={toggleDrawerOpen} />
        <Switch>
          <Route exact path={PageRoute.DASHBOARD} component={Dashboard} />
          <Route exact path={PageRoute.PROFILE} component={Profile} />
          <Redirect to={PageRoute.DASHBOARD} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AppProtected;
