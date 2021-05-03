import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthButton } from './AuthCommon';
// import { authRoute } from '../constants';
import { forgetPasswordAction } from './AuthStoreSlice';

function EmailRequest(props) {
  // const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  //   const error = useSelector((state) => state.auth.error);
  //   const isLoading = useSelector((state) => state.auth.isLoading);

  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required('Field is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      const { email } = values;
      dispatch(forgetPasswordAction(email));
    },
  });

  const cancle = (e) => {
    e.stopPropagation();
    history.push('/login');
  };

  //   const clearError = () => {
  //     dispatch(clearErrorAction());
  //   };

  return (
    <Dialog fullWidth open={location.pathname === '/reset'} onClose={cancle}>
      <DialogTitle>Send Email Request</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter email address to recieve a link for password reset
        </DialogContentText>
        <TextField
          fullWidth
          name='email'
          margin='dense'
          label='Email address'
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder='johnDoe@email.com'
          error={!!formik.errors.email && formik.touched.email}
          helperText={formik.touched.email ? formik.errors.email : null}
        />
      </DialogContent>
      <DialogActions>
        <AuthButton onClick={cancle}>Cancle</AuthButton>
        <AuthButton onClick={formik.handleSubmit}>Request</AuthButton>
      </DialogActions>
    </Dialog>
  );
}

export default EmailRequest;
