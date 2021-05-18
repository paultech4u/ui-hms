/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import * as Yup from 'yup';
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
import { AuthCard, AuthButton, AuthTextInput } from './AuthCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { forgetPasswordAction } from './AuthStoreSlice';

function AuthLogin(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Please enter an email address'),
    }),
    onSubmit: (values) => {
      const { email } = values;
      dispatch(forgetPasswordAction(email));
    },
  });

  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <Box
      height={1}
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'>
      <Box display='flex' fontSize={19} marginBottom={10}>
        <a href='/login' className={classes.logo_icon}>
          Logo
        </a>
      </Box>
      <AuthCard
        elevation={0}
        variant='outlined'
        className={classes.formContainer}>
        <Box className={classes.formTitle}>
          <Typography variant='h6'>Reset Password</Typography>
          <Typography variant='body2' style={{ marginTop: 8 }}>
            Enter your email address below and we'll send you a link to reset
            your password.
          </Typography>
        </Box>
        <Box
          display='flex'
          marginY={10}
          alignItems='center'
          flexDirection='column'>
          <Box className={classes.formInput}>
            <Typography variant='caption' style={{ paddingBottom: 6 }}>
              Email Address
            </Typography>
            <AuthTextInput
              name='email'
              variant='outlined'
              onBlur={formik.handleBlur('email')}
              onInput={formik.handleChange}
              placeholder='Email Address'
              value={formik.values.email}
              error={!!formik.errors.email && formik.touched.email}
              helperText={formik.touched.email ? formik.errors.email : null}
            />
          </Box>
        </Box>
        <Box
          display='flex'
          paddingTop={10}
          marginBottom={10}
          justifyContent='center'>
          <AuthButton variant='contained' onClick={formik.handleSubmit}>
            Reset Password
          </AuthButton>
        </Box>
        <Divider />
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          paddingY={6}>
          <Link
            style={{
              cursor: 'pointer',
              marginRight: 7,
            }}
            title='click to register hospital'
            onClick={() => history.push('/login')}>
            Log In
          </Link>
          <Typography>or</Typography>
          <Link
            style={{
              cursor: 'pointer',
              marginLeft: 7,
            }}
            title='click to register hospital'
            onClick={() => history.push('/register')}>
            Register
          </Link>
        </Box>
      </AuthCard>
      <Backdrop
        in={isLoading === 'pending' ? true : false}
        className={classes.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
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
  logo_icon: {
    padding: '15px',
    margin: '0 5px',
    display: 'flex',
    cursor: 'pointer',
    lineHeight: '20px',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default AuthLogin;
