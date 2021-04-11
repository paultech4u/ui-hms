/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, clearErrorAction } from './AuthStoreSlice';
import {
  Box,
  Typography,
  makeStyles,
  Link,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import {
  AuthCard,
  AuthButton,
  AuthPasswordInput,
  AuthTextInput,
} from './AuthCommon';
import { MdArrowForward } from 'react-icons/md';
import { NotifitionAlert } from '../common/Alert';

const FormKeys = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

function AuthLogin(props) {
  const styles = useStyles();
  const history = useHistory();
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

  const handleForgetPassword = () => {
    history.push('/reset');
  };

  return (
    <div>
      <AuthCard marginTop={30} display='flex' elevation={6}>
        <Box
          marginX={10}
          padding={15}
          borderRadius={6}
          marginTop='-20px'
          bgcolor='primary.main'
          className={styles.authCard_header}>
          <Typography variant='h6' className={styles.authCard_header_title}>
            LOGIN
          </Typography>
        </Box>
        <Box padding={10} display='flex' flexDirection='column'>
          <Box>
            <AuthTextInput
              name='email'
              variant='outlined'
              onBlur={formik.handleBlur}
              onInput={formik.handleChange}
              value={formik.values[FormKeys.EMAIL]}
              placeholder='JohnDoe@gmail.com'
            />
          </Box>
          <Box marginTop={10}>
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
        <Box marginY={6}>
          <Box flex={1} textAlign='center'>
            <Link
              style={{
                cursor: 'pointer',
              }}
              title='click to change password'
              onClick={handleForgetPassword}>
              Reset your password?
            </Link>
          </Box>
        </Box>
      </AuthCard>
      <Backdrop in={isLoading === 'pending'} className={styles.back_drop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <NotifitionAlert
        severity='error'
        onClose={closeError}
        open={error === null ? false : true}>
        {error === undefined ? 'Network Error' : error}
      </NotifitionAlert>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  authCard_header: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.14)',
  },
  authCard_header_title: {
    marginBottom: '3px',
    textAlign: 'center',
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightLight.valueOf(500),
  },
  back_drop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default AuthLogin;
