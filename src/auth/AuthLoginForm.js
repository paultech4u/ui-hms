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
import {
  AuthCard,
  AuthButton,
  AuthTextInput,
  AuthPasswordInput,
} from './AuthCommon';
import { MdArrowForward } from 'react-icons/md';
import { NotifitionAlert } from '../common/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction, clearErrorAction } from './AuthStoreSlice';
// import undraw_doctor from '../assets/svg/undraw_doctors.svg';

const FormKeys = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

function AuthLogin(props) {
  const classes = useStyles();
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
    validationSchema: Yup.object().shape({
      [FormKeys.EMAIL]: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
      [FormKeys.PASSWORD]: Yup.string().required('Please enter your password'),
    }),
  });

  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const closeError = () => {
    dispatch(clearErrorAction());
  };

  const handleEmailRequest = () => {
    history.push('/account/password/reset');
  };

  return (
    <Box
      height={1}
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'>
      {/* <Box position='absolute' right={20} bottom={-50}>
        <img src={undraw_doctor} alt='doctor' width={400} height={400} />
      </Box>
      <Box display='flex' fontSize={19} marginBottom={10}>
        <a href='/login' className={classes.logo_icon}>
          Logo
        </a>
      </Box> */}
      <AuthCard
        elevation={0}
        variant='outlined'
        className={classes.formContainer}>
        <Box className={classes.formTitle}>
          <Typography variant='h6'>Login to your account</Typography>
        </Box>
        <Divider />
        <Box
          padding={10}
          display='flex'
          marginTop={10}
          alignItems='center'
          flexDirection='column'>
          <Box className={classes.formInput}>
            <Typography variant='caption' style={{ paddingBottom: 6 }}>
              Email Address
            </Typography>
            <AuthTextInput
              name='email'
              variant='outlined'
              onBlur={formik.handleBlur(FormKeys.EMAIL)}
              onInput={formik.handleChange}
              placeholder='Email Address'
              value={formik.values[FormKeys.EMAIL]}
              error={
                !!formik.errors[FormKeys.EMAIL] &&
                formik.touched[FormKeys.EMAIL]
              }
              helperText={
                formik.touched[FormKeys.EMAIL]
                  ? formik.errors[FormKeys.EMAIL]
                  : null
              }
            />
          </Box>
          <Box marginTop={10} className={classes.formInput}>
            <Typography variant='caption' style={{ paddingBottom: 6 }}>
              Password
            </Typography>
            <AuthPasswordInput
              variant='outlined'
              placeholder='Password'
              onInput={formik.handleChange}
              value={formik.values[FormKeys.PASSWORD]}
              onBlur={formik.handleBlur(FormKeys.PASSWORD)}
              error={
                !!formik.errors[FormKeys.PASSWORD] &&
                formik.touched[FormKeys.PASSWORD]
              }
              helperText={
                formik.touched[FormKeys.PASSWORD]
                  ? formik.errors[FormKeys.PASSWORD]
                  : null
              }
            />
          </Box>
        </Box>
        <Box
          display='flex'
          paddingTop={10}
          marginBottom={10}
          justifyContent='center'>
          <AuthButton
            variant='contained'
            endIcon={<MdArrowForward />}
            onClick={formik.handleSubmit}
            disabled={!formik.values[FormKeys.EMAIL] >= 1}>
            Login
          </AuthButton>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='center' paddingY={6}>
          <Typography variant='body2'>New to HMS?</Typography>
          <Link
            style={{
              cursor: 'pointer',
              marginLeft: 7,
            }}
            title='click to register hospital'
            onClick={() => history.push('/register')}>
            Register Hospital
          </Link>
        </Box>
      </AuthCard>
      <Box textAlign='center' paddingY={6}>
        <Link
          style={{
            cursor: 'pointer',
            color: 'white',
          }}
          title='click to reset password'
          onClick={handleEmailRequest}>
          Forgot your password?
        </Link>
      </Box>
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
