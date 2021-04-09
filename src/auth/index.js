import React, { useState, useLayoutEffect } from 'react';
import { lazyload } from '../common/Loading';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, Collapse, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NavBar } from './AuthNavBar';
import { authRoute } from '../constants';
import { DrawerBar } from './AuthDrawer';
// import { Footer } from '../common/Footer';
import { useIsDesktop } from '../hooks';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = lazyload(() => import('./AuthLoginForm'));
const RegisterForm = lazyload(() => import('./AuthRegisterForm'));
const ForgetPasswordForm = lazyload(() => import('./AuthForgetPasswordForm'));

function AuthPage(props) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const location = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

  // const { openLogoutAlert } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();

  // const setOpen = (bool) => {
  //   dispatch(handleLogoutAlert(bool));
  // };

  // React.useEffect(() => {
  //   if (openLogoutAlert === true) {
  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 2000);
  //   }

  //   return () => clearTimeout(1000);
  // });

  return (
    <Box height={1} display='flex' flexDirection='column'>
      {/* <Box>
        <Collapse in={openLogoutAlert} unmountOnExit={true}>
          <Alert onClose={() => setOpen(false)} severity='info'>
            Session expired
          </Alert>
        </Collapse>
      </Box> */}
      {location.pathname === authRoute.FORGET_PASSWORD ? (
        <Box>
          <Typography>Logo</Typography>
        </Box>
      ) : (
        <Box display='flex' paddingY={8}>
          <NavBar toggleDrawer={toggleDrawer} />
          <DrawerBar open={isOpen} close={toggleDrawer} />
        </Box>
      )}
      <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Switch>
          <Route path={authRoute.LOGIN} component={LoginForm} />
          <Route path={authRoute.REGISTER} component={RegisterForm} />
          <Route
            path={authRoute.FORGET_PASSWORD}
            component={ForgetPasswordForm}
          />
          <Redirect exact to={authRoute.LOGIN} />
        </Switch>
      </Box>
    </Box>
  );
}

export default AuthPage;
