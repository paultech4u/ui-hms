/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';
import { Progress } from '../common/Progress';
import { useLocation, useHistory, generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, clearErrorAction } from './AuthStoreSlice';
import { Box, Typography, makeStyles, Fade, Link } from '@material-ui/core';
import {
  AuthCard,
  AuthButton,
  AuthPasswordInput,
  AuthTextInput,
} from './AuthCommon';
import { NotifitionAlert } from '../common/Alert';

const FormKeys = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

function AuthLogin(props) {
  const styles = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      [FormKeys.EMAIL]: '',
      [FormKeys.PASSWORD]: '',
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
      };

      dispatch(loginAction(payload));
    },
  });

  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const closeError = () => {
    dispatch(clearErrorAction());
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
    <form>
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
                <AuthTextInput
                  variant='outlined'
                  placeholder='Enter email address'
                  id='email'
                  value={formik.values[FormKeys.EMAIL]}
                  onInput={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Box marginTop={10}>
                <AuthPasswordInput
                  variant='outlined'
                  onBlur={formik.handleBlur}
                  value={formik.values[FormKeys.PASSWORD]}
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
              <AuthButton
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
              </AuthButton>
            </Box>
            <Box marginY={6}>
              <Box flex={1} textAlign='center'>
                <Link
                  title='click to change password'
                  onClick={handleForgetPassword}
                  style={{
                    cursor: 'pointer',
                  }}>
                  Forget password?
                </Link>
              </Box>
            </Box>
          </AuthCard>
          <NotifitionAlert
            open={error === null ? false : true}
            severity='error'
            onClose={closeError}>
            {error === undefined ? 'Network Error' : error}
          </NotifitionAlert>
        </div>
      </Fade>
    </form>
  );
}

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
