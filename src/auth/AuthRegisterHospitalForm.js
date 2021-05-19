import React, { useState } from 'react';
// import clsx from 'clsx';
import {
  Box,
  Divider,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthCard, AuthButton } from './AuthCommon';
import { useDispatch } from 'react-redux';
import { registerHosptialAction } from './AuthStoreSlice';
import AuthNavBar from './AuthNavBar';
import GetStartedScreen from './AuthRegisterGetStartedScreen';

function RegisterHospitalForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const height = React.useRef(300);
  const [toggleForm, setToggleForm] = useState(false);

  const toggleToFormScreen = () => {
    setToggleForm(!toggleForm);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      state: '',
      zip_no: '',
      address: '',
    },
    onSubmit: async (values) => {
      let data = {};

      const payload = Object.assign(data, values);

      dispatch(registerHosptialAction(payload));
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .trim()
        .min(6, 'Must contain 6 character')
        .max(50, 'Max 50')
        .required('required*'),
      state: Yup.string()
        .trim()
        .min(3, 'Must contain 3 character')
        .max(20, 'Max 20')
        .required('required*'),
      address: Yup.string()
        .trim()
        .min(6, 'Must contain 6 character')
        .max(50, 'Max 50')
        .required('Required*'),
      email: Yup.string().email('Invalid email').required('required*'),
    }),
  });

  // const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <Box height={1}>
      <AuthNavBar />
      <Box
        height={1}
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'>
        <AuthCard variant='outlined' className={classes.formContainer}>
          <Box paddingY={10}>
            <Typography variant='h5' align='center'>
              Register your hospital
            </Typography>
          </Box>
          <Divider />
          {toggleForm ? (
            <React.Fragment>
              <Box padding={10}>
                <TextInput
                  name='name'
                  label='Hospital Name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur('name')}
                  placeholder='Name of hospital'
                  error={!!formik.errors.name && formik.touched.name}
                  helperText={formik.touched.name ? formik.errors.name : null}
                />
                <TextInput
                  name='email'
                  label='Hospital email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur('email')}
                  placeholder='Email address'
                  error={!!formik.errors.email && formik.touched.email}
                  helperText={formik.touched.email ? formik.errors.email : null}
                />
                <TextInput
                  name='address'
                  label='Hospital address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur('address')}
                  placeholder='Hospital address'
                  error={!!formik.errors.address && formik.touched.address}
                  helperText={
                    formik.touched.address ? formik.errors.address : null
                  }
                />
                <TextInput
                  name='state'
                  label='State'
                  placeholder='State of hospital'
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur('state')}
                  error={!!formik.errors.state && formik.touched.state}
                  helperText={formik.touched.state ? formik.errors.state : null}
                />
              </Box>
              <Divider />
              <Box
                display='flex'
                justifyContent='flex-end'
                paddingY={5}
                pr={10}>
                <AuthButton variant='contained' onClick={formik.handleSubmit}>
                  Submit
                </AuthButton>
              </Box>
            </React.Fragment>
          ) : (
            <GetStartedScreen toggleToFormScreen={toggleToFormScreen} />
          )}
        </AuthCard>
      </Box>
    </Box>
  );
}

/**
 * @param {import("@material-ui/core").TextFieldProps} props
 */
function TextInput(props) {
  const classes = useStyles();

  return (
    <Box display='flex' flexDirection='column'>
      <Typography variant='body2' className={classes.formTextField_label}>
        {props.label}
      </Typography>
      <TextField
        {...props}
        variant='outlined'
        className={classes.formTextField}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
  },
  formContainer_content: {
    overflowY: 'scroll',
  },
  formTextField: {
    '& .MuiFormControl-marginDense': {
      marginTop: 0,
    },
  },
  formTextField_label: {
    paddingLeft: 1,
    paddingTop: 6,
    paddingBottom: 6,
  },
}));

export default RegisterHospitalForm;
