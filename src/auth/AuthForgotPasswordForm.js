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
  const styles = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required('Field is required'),
    password: Yup.string()
      .min(8, 'Must contain at least 8 characters')
      .required('Field is required'),
    comfirm_password: Yup.string()
      .min(8, 'Must contain at least 8 characters')
      .required('Field is required'),
  });

  React.useEffect(() => {
    if (open === true) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }

    return () => clearTimeout(1000);
  });

  const formik = useFormik({
    initialValues: {
      email: query.get('email'),
      password: '',
      comfirm_password: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      const { comfirm_password, password, email } = values;
      if (comfirm_password !== password) {
        return setOpen((p) => !p);
      }
      const payload = {
        email,
        password1: password,
        password2: comfirm_password,
      };

      dispatch(forgetPasswordAction(payload));
    },
  });

  const clearError = () => {
    dispatch(clearErrorAction());
  };

  return (
    <AuthCard variant='outlined'>
      <Collapse in={open} unmountOnExit>
        <Alert
          action={
            <IconButton
              onClick={() => setOpen(false)}
              aria-label='close'
              color='inherit'
              size='small'>
              <MdCancel />
            </IconButton>
          }
          severity='error'>
          Password did not match
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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errortext={
              !!formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
            error={!!formik.errors.email && formik.touched.email}
          />
        </Box>
        <Box display='flex' flexDirection='column' paddingBottom={5}>
          <Typography variant='caption'>New Password</Typography>
          <TextField
            size='small'
            name='password'
            variant='outlined'
            placeholder='*****'
            onBlur={formik.handleBlur}
            className={styles.text_field}
            value={formik.values.password}
            onChange={formik.handleChange}
            helperText={
              !!formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null
            }
            error={!!formik.errors.password && formik.touched.password}
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Comfirm Password</Typography>
          <TextField
            size='small'
            variant='outlined'
            placeholder='*****'
            name='comfirm_password'
            onBlur={formik.handleBlur}
            className={styles.text_field}
            onChange={formik.handleChange}
            helperText={
              !!formik.errors.comfirm_password &&
              formik.touched.comfirm_password
                ? formik.errors.comfirm_password
                : null
            }
            error={
              !!formik.errors.comfirm_password &&
              formik.touched.comfirm_password
            }
            value={formik.values.comfirm_password}
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
        className={styles.back_drop}>
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
  text_field: {
    width: '30ch',
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
  back_drop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default ForgetPassword;
