/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Progress } from '../common/Progress';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction, handleAlertClose } from './AuthLoginStoreSlice';
import { Box, Typography, makeStyles, Fade, Link } from '@material-ui/core';
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

  const dispatch = useDispatch();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Must be an email').trim(),
    password: Yup.string()
      .trim()
      .min(4, 'Min of 4 character')
      .max(50, 'Max of 20'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const data = {
        ...values,
      };
      dispatch(LoginAction(data));
    },
    validationSchema: loginSchema,
  });

  const { isLoading, open, error, success } = useSelector((state) => {
    return {
      error: state.auth.error,
      open: state.auth.openAlert,
      success: state.auth.success,
      isLoading: state.auth.isLoading,
    };
  });

  const toggleAlert = () => {
    dispatch(handleAlertClose(false));
  };

  return (
    <Fade
      style={{
        transitionDelay: '600ms',
        transitionTimingFunction: 'ease-in-out',
      }}
      in={location.pathname === '/login'}>
      <Box>
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
                errortext={
                  !!formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : null
                }
                error={!!formik.errors.email && formik.touched.email}
              />
            </Box>
            <Box marginTop={10}>
              <PasswordInput
                onBlur={formik.handleBlur}
                errortext={
                  !!formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : null
                }
                error={!!formik.errors.password && formik.touched.password}
                value={formik.values.password}
                onInput={formik.handleChange}
              />
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            paddingTop={10}
            marginX={15}
            marginBottom={10}>
            <ActionButton
              onClick={formik.handleSubmit}
              disabled={formik.values.email.length <= 0 ? true : false}>
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
            <Box textAlign='center' marginTop={6}>
              <Link
                style={{
                  cursor: 'pointer',
                }}>
                Forget Password ?
              </Link>
            </Box>
          </Box>
        </AuthCard>
        <AppAlert
          open={open}
          severity={success === 'Ok' ? 'success' : 'error'}
          toggleAlert={toggleAlert}>
          {success === 'Ok'
            ? success
            : error === undefined
            ? 'oops something went wrong'
            : error}
        </AppAlert>
      </Box>
    </Fade>
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
