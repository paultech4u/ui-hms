/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Link,
  Backdrop,
  Typography,
  makeStyles,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import {
  AuthCard,
  AuthButton,
  AuthTextInput,
  AuthPasswordInput,
} from './AuthCommon';
import { MdArrowForward } from 'react-icons/md';
import { NotifitionAlert } from '../common/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loginAction, clearErrorAction } from './AuthStoreSlice';

const FormKeys = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

function AuthLogin(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      [FormKeys.EMAIL]: '',
      [FormKeys.PASSWORD]: '',
    },
    onSubmit: (values) => {
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

  const handleEmailRequest = () => {
    history.push({ pathname: '/reset', state: { background: location } });
  };

  return (
    <>
      <AuthCard
        elevation={0}
        variant='outlined'
        className={classes.formContainer}>
        <Box className={classes.formTitle}>
          <Typography variant='h6'>LOGIN</Typography>
        </Box>
        <Divider />
        <Box
          padding={10}
          display='flex'
          marginTop={10}
          alignItems='center'
          flexDirection='column'>
          <Box className={classes.formInput}>
            <Typography variant='caption'>Email</Typography>
            <AuthTextInput
              name='email'
              variant='outlined'
              onBlur={formik.handleBlur}
              onInput={formik.handleChange}
              placeholder='JohnDoe@gmail.com'
              value={formik.values[FormKeys.EMAIL]}
            />
          </Box>
          <Box marginTop={10} className={classes.formInput}>
            <Typography variant='caption'>Password</Typography>
            <AuthPasswordInput
              variant='outlined'
              onBlur={formik.handleBlur}
              onInput={formik.handleChange}
              value={formik.values[FormKeys.PASSWORD]}
            />
          </Box>
        </Box>
        <Box
          display='flex'
          paddingTop={10}
          marginBottom={10}
          alignItems='center'
          justifyContent='center'>
          <AuthButton
            variant='contained'
            endIcon={<MdArrowForward />}
            onClick={formik.handleSubmit}
            disabled={!formik.values[FormKeys.EMAIL] >= 1}>
            Login
          </AuthButton>
        </Box>
        <Box flex={1} textAlign='center' paddingY={6}>
          <Link
            style={{
              cursor: 'pointer',
            }}
            title='click to reset password'
            onClick={handleEmailRequest}>
            forgot password?
          </Link>
        </Box>
      </AuthCard>
      <Backdrop
        in={isLoading === 'pending' ? true : false}
        className={classes.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <NotifitionAlert
        severity='error'
        onClose={closeError}
        open={error === null ? false : true}>
        {error === undefined ? 'Network Error' : error}
      </NotifitionAlert>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  formTitle: {
    padding: 15,
    marginBottom: 3,
    textAlign: 'center',
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightLight.valueOf(500),
  },
  backdrop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
  formInput: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default AuthLogin;
