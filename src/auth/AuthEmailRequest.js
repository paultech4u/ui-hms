import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useQuery } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { AuthCard, AuthTextInput, AuthButton } from './AuthCommon';
import { forgetPasswordAction, clearErrorAction } from './AuthStoreSlice';

function EmailRequest(props) {
  const styles = useStyles();
  const dispatch = useDispatch();
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

  //   const clearError = () => {
  //     dispatch(clearErrorAction());
  //   };

  return (
    <AuthCard variant='outlined'>
      <Box display='flex' justifyContent='center' marginY={8}>
        <Typography variant='p'>
          Enter email address to recieve a link for password reset
        </Typography>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <AuthTextInput
          size='small'
          name='email'
          variant='outlined'
          label='Email address'
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder='johnDoe@email.com'
          errortext={
            !!formik.errors.email && formik.touched.email
              ? formik.errors.email
              : null
          }
          error={!!formik.errors.email && formik.touched.email}
        />
      </Box>
      <Box display='flex' justifyContent='center' marginY={10}>
        <AuthButton variant='contained' onClick={formik.handleSubmit}>
          Email request
        </AuthButton>
      </Box>
    </AuthCard>
  );
}

const useStyles = makeStyles((theme) => ({
  back_drop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default EmailRequest;
