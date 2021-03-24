/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';
import { Progress } from '../common/Progress';
import { useLocation, useHistory, generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, handleAlertClose } from './AuthLoginSlice';
import {
  Box,
  Typography,
  makeStyles,
  Fade,
  Link,
} from '@material-ui/core';
import {
  AuthCard,
  ActionButton,
  PasswordInput,
  TextInput,
  AppAlert,
} from './AuthCommon';

function AuthLogin(props) {
  const styles = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const data = {
        ...values,
      };

      dispatch(loginAction(data));
    },
  });

  const { isLoading, open, error } = useSelector((state) => {
    return {
      error: state.auth.error,
      open: state.auth.openAlert,
      isLoading: state.auth.isLoading,
    };
  });

  const toggleAlert = () => {
    dispatch(handleAlertClose(false));
  };

  const handleForgetPassword = () => {
    if (formik.values.email !== '') {
      const path = generatePath(
        '/account/:mode(reset|edit)/:type(password|profile)',
        {
          type: 'password',
          mode: 'reset',
        }
      );
      history.push({ pathname: path, search: `?email=${formik.values.email}` });
    }
  };

  return (
    <Fade
      style={{
        transitionDelay: '600ms',
        transitionTimingFunction: 'ease-in-out',
      }}
      in={location.pathname === '/login'}>
      <div>
        <AuthCard marginTop={30} display='flex' elevation={6}>
          <Box
            marginTop='-20px'
            marginX={10}
            padding={15}
            bgcolor='primary.main'
            borderRadius={6}
            className={styles.AuthCard_header}>
            <Typography variant='h6' className={styles.AuthCard_header_title}>
              Log in
            </Typography>
          </Box>
          <Box padding={10} display='flex' flexDirection='column'>
            <Box>
              <TextInput
                placeholder='Enter email'
                id='email'
                value={formik.values.email}
                onInput={formik.handleChange}
                onBlur={formik.handleBlur}
                showClearIcon={false}
              />
            </Box>
            <Box marginTop={10}>
              <PasswordInput
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onInput={formik.handleChange}
              />
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            paddingTop={10}
            marginBottom={10}>
            <ActionButton
              onClick={formik.handleSubmit}
              disabled={
                formik.values.email.length <= 0 || isLoading === 'pending'
                  ? true
                  : false
              }>
              {isLoading === 'pending' ? (
                <Progress in={isLoading === 'pending'} unmountOnExit />
              ) : null}
              <Typography
                style={{
                  paddingLeft: isLoading === 'pending' ? '10px' : 0,
                }}>
                Login
              </Typography>
            </ActionButton>
          </Box>
          <Box marginY={6}>
            <Box flex={1} textAlign='center'>
              <Link
                title={tooltip}
                onClick={handleForgetPassword}
                style={{
                  cursor: 'pointer',
                }}>
                Forget Password ?
              </Link>
            </Box>
          </Box>
        </AuthCard>
        <AppAlert open={open} severity='error' toggleAlert={toggleAlert}>
          {error === undefined ? 'Network Error' : error}
        </AppAlert>
      </div>
    </Fade>
  );
}

const tooltip = `Use the email
address you used when 
you registered to this app, email field should
be not empty if you want to reset password.`;

const useStyles = makeStyles((theme) => ({
  AuthCard_header: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.14)',
  },
  AuthCard_header_title: {
    marginBottom: '3px',
    fontWeight: theme.typography.fontWeightLight.valueOf(500),
    color: theme.palette.common.white,
    textAlign: 'center',
  },
}));

export default AuthLogin;
