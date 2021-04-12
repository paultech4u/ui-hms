import React, { useLayoutEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import AppNavbar from './AppNavbar';
import AppDrawer from './AppDrawer';
import { lazyload } from './common/Loading';
import { PageRoute } from './constants';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useIsDesktop, useIsMobile } from './hooks';

const Dashboard = lazyload(() => import('./dashboard'));
const Profile = lazyload(() => import('./profile'));

function AppProtected(props) {
  const styles = useStyles();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawerOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const toggleDrawerClose = () => {
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    if (isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <Box display='flex' height={1}>
      <AppDrawer drawer={isOpen} handleDrawerClose={toggleDrawerClose} />
      <Box
        flex={1}
        maxHeight={1}
        display='flex'
        flexDirection='column'
        className={styles.main_content}>
        <AppNavbar drawer={isOpen} handleDrawerOpen={toggleDrawerOpen} />
        <Box>
          <Switch>
            <Route exact path={PageRoute.PROFILE} component={Profile} />
            <Route exact path={PageRoute.DASHBOARD} component={Dashboard} />
            <Redirect to={PageRoute.DASHBOARD} />
          </Switch>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  main_content: {
    overflowX: 'scroll',
  },
});

export default AppProtected;
