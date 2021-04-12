import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Dialog,
  TextField,
  makeStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthButton } from './AuthCommon';
import { authRoute } from '../constants';
import { forgetPasswordAction, clearErrorAction } from './AuthStoreSlice';

function EmailRequest(props) {
  // const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  //   const error = useSelector((state) => state.auth.error);
  //   const isLoading = useSelector((state) => state.auth.isLoading);

  const [open, setOpen] = React.useState(false);

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

  React.useEffect(() => {
    if (location.pathname === authRoute.REQUESTEMAIL) {
      setOpen((previous) => !previous);
    }
  }, [location.pathname]);

  const handleCancle = () => {
    setOpen((previous) => !previous);
    history.push('/login');
  };

  //   const clearError = () => {
  //     dispatch(clearErrorAction());
  //   };

  return (
    <Dialog open={open} onBackdropClick={handleCancle} onClose={handleCancle}>
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
          helperText={
            !!formik.errors.email && formik.touched.email
              ? formik.errors.email
              : null
          }
          error={!!formik.errors.email && formik.touched.email}
        />
      </DialogContent>
      <DialogActions>
        <AuthButton onClick={handleCancle}>Cancle</AuthButton>
        <AuthButton onClick={formik.handleSubmit}>Request</AuthButton>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  back_drop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default EmailRequest;
