import React, { useState, useLayoutEffect } from 'react';
import { lazyload } from '../common/Loading';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { NavBar } from './AuthNavBar';
import { AuthRoute } from '../constants';
import { DrawerBar } from './AuthDrawer';
import { Footer } from '../common/Footer';
import { useIsDesktop } from '../hooks';

const LoginPage = lazyload(() => import('./AuthLogin'));
const RegisterPage = lazyload(() => import('./AuthRegister'));
const ScreenLock = lazyload(() => import('./AuthScreenLock'));

function AuthPage(props) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

  return (
    <Box height={1} display='flex' flexDirection='column' overflow='hidden'>
      <Box display='flex' paddingY={8}>
        <NavBar toggleDrawer={toggleDrawer} />
        <DrawerBar open={isOpen} close={toggleDrawer} />
      </Box>
      <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Switch>
          <Route exact path={AuthRoute.LOGIN} component={LoginPage} />
          <Route path={AuthRoute.REGISTER} component={RegisterPage} />
          <Route path={AuthRoute.LOCK} component={ScreenLock} />
          <Redirect to={AuthRoute.LOGIN} />
        </Switch>
      </Box>
      <Box paddingY={8}>
        <Footer />
      </Box>
    </Box>
  );
}

export default AuthPage;
