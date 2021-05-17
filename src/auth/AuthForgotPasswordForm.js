import React from 'react';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  makeStyles,
  Typography,
  Collapse,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useQuery } from '../hooks';
import { Alert } from '@material-ui/lab';
import { MdCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NotifitionAlert } from '../common/Alert';
import { forgetPasswordAction, clearErrorAction } from './AuthStoreSlice';
import { AuthCard, AuthTextInput, AuthButton } from './AuthCommon';

function ForgetPassword(props) {
  const query = useQuery();
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);

  React.useEffect(() => {
    if (errorAlert === true) {
      setTimeout(() => {
        setErrorAlert(false);
      }, 2000);
    }

    return () => clearTimeout(1000);
  });

  const formik = useFormik({
    initialValues: {
      email: query.get('email'),
      password1: '',
      password2: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Field is required'),
      password: Yup.string()
        .min(8, 'Must contain at least 8 characters')
        .required('Field is required'),
      comfirm_password: Yup.string()
        .min(8, 'Must contain at least 8 characters')
        .required('Field is required'),
    }),
    onSubmit: (values) => {
      const { password1, password2, email } = values;
      if (password2 !== password1) {
        return setErrorAlert((p) => !p);
      }
      const payload = {
        email,
        password: password1,
        confirmPassword: password2,
      };

      dispatch(forgetPasswordAction(payload));
    },
  });

  const clearError = () => {
    dispatch(clearErrorAction());
  };

  return (
    <AuthCard variant='outlined'>
      <Collapse in={errorAlert} unmountOnExit>
        <Alert
          severity='error'
          action={
            <IconButton
              color='inherit'
              size='small'
              onClick={() => setErrorAlert(false)}>
              <MdCancel />
            </IconButton>
          }>
          Both Password did not match
        </Alert>
      </Collapse>
      <Box display='flex' justifyContent='center' marginY={8}>
        <Typography variant='overline'>Create a new Password</Typography>
      </Box>
      <Box padding={10}>
        <Box display='flex' flexDirection='column' paddingBottom={5}>
          <Typography variant='caption'>Email Address</Typography>
          <AuthTextInput
            size='small'
            name='email'
            variant='outlined'
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={!!formik.errors.email && formik.touched.email}
            helperText={formik.touched.email ? formik.errors.email : null}
          />
        </Box>
        <Box display='flex' flexDirection='column' paddingBottom={5}>
          <Typography variant='caption'>New Password</Typography>
          <TextField
            size='small'
            name='password1'
            variant='outlined'
            onBlur={formik.handleBlur}
            value={formik.values.password1}
            onChange={formik.handleChange}
            className={classes.formTextFied}
            error={!!formik.errors.password1 && formik.touched.password1}
            helperText={
              formik.touched.password1 ? formik.errors.password1 : null
            }
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Comfirm Password</Typography>
          <TextField
            size='small'
            name='password2'
            variant='outlined'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password2}
            className={classes.formTextFied}
            helperText={
              formik.touched.password2 ? formik.errors.password2 : null
            }
            error={!!formik.errors.password2 && formik.touched.password2}
          />
        </Box>
        <Box display='flex' justifyContent='center' marginY={10}>
          <AuthButton variant='contained' onClick={formik.handleSubmit}>
            Reset
          </AuthButton>
        </Box>
      </Box>
      <Backdrop
        in={isLoading === 'pending' ? true : false}
        className={classes.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <NotifitionAlert
        severity='error'
        open={error === null ? false : true}
        onClose={clearError}>
        {error === undefined ? 'Network Error' : error}
      </NotifitionAlert>
    </AuthCard>
  );
}

const useStyles = makeStyles((theme) => ({
  formTextField: {
    width: '30ch',
    [theme.breakpoints.down('sm')]: {
      width: '35ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
  backdrop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default ForgetPassword;
