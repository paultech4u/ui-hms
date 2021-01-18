import React from 'react';
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
import { AuthCard, TextInput, ActionButton, AppAlert } from './AuthCommon';
import { Alert } from '@material-ui/lab';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { MdCancel } from 'react-icons/md';
import { forgetPasswordAction, handleAlert } from './AuthPasswordMgmtSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function ForgetPassword(props) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const { isLoading, error } = useSelector((state) => state.password);

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
      email: '',
      password: '',
      comfirm_password: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      const { comfirm_password, password, email } = values;
      if (comfirm_password !== password) {
        return setOpen((p) => !p);
      }
      const data = {
        email,
        password,
      };

      dispatch(forgetPasswordAction(data));
    },
  });

  const handleAlertClose = () => {
    dispatch(handleAlert(null));
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
          <TextInput
            variant='outlined'
            name='email'
            errortext={
              !!formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
            error={!!formik.errors.email && formik.touched.email}
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box display='flex' flexDirection='column' paddingBottom={5}>
          <Typography variant='caption'>New Password</Typography>
          <TextField
            name='password'
            variant='outlined'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={
              !!formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null
            }
            error={!!formik.errors.password && formik.touched.password}
            value={formik.values.password}
            className={styles.text_field}
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Comfirm Password</Typography>
          <TextField
            variant='outlined'
            name='comfirm_password'
            onBlur={formik.handleBlur}
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
            className={styles.text_field}
          />
        </Box>
        <Box display='flex' justifyContent='center' marginY={10}>
          <ActionButton onClick={formik.handleSubmit}>
            Save Password
          </ActionButton>
        </Box>
      </Box>
      <Backdrop
        in={isLoading === 'pending' ? true : false}
        className={styles.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <AppAlert
        severity='error'
        open={error !== null ? true : false}
        toggleAlert={handleAlertClose}>
        {error === undefined ? 'Network Error' : error}
      </AppAlert>
    </AuthCard>
  );
}

const useStyles = makeStyles((theme) => ({
  text_field: {
    width: '35ch',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default ForgetPassword;
