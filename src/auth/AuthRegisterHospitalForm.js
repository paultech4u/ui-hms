import React, { useState } from 'react';
import clsx from 'clsx';
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
import GetStartedScreen from './AuthRegisterGetStartedScreen';

function RegisterHospitalForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const height = React.useRef(300);
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
      zip_no: Yup.number()
        .positive('Must be a non-negative number')
        .notRequired(),
      email: Yup.string().email('Invalid email').required('required*'),
    }),
  });

  React.useEffect(() => {
    if (toggleForm === true) {
      const getHeight = document.getElementById('paper_content').clientHeight;
      height.current = getHeight;
    }
  }, [toggleForm]);

  // const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <AuthCard variant='outlined' className={classes.formContainer}>
      <Box paddingY={10}>
        <Typography variant='h5' align='center'>
          REGISTER HOSPITAL
        </Typography>
      </Box>
      <Divider />
      {toggleForm ? (
        <React.Fragment>
          <Box
            padding={10}
            maxHeight={300}
            id='paper_content'
            className={clsx({
              [classes.formContainer_content]: height.current === 300,
            })}>
            <TextInput
              name='name'
              title='Hospital Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur('name')}
              placeholder='wellcare hospital'
              error={!!formik.errors.name && formik.touched.name}
              helperText={formik.touched.name ? formik.errors.name : null}
            />
            <TextInput
              name='email'
              title='Hospital email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur('email')}
              placeholder='wellcare@email.com'
              error={!!formik.errors.email && formik.touched.email}
              helperText={formik.touched.email ? formik.errors.email : null}
            />
            <TextInput
              name='address'
              title='Address'
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur('address')}
              placeholder='lamido crescent'
              error={!!formik.errors.address && formik.touched.address}
              helperText={formik.touched.address ? formik.errors.address : null}
            />
            <TextInput
              name='state'
              title='State'
              placeholder='Lagos'
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur('state')}
              error={!!formik.errors.state && formik.touched.state}
              helperText={formik.touched.state ? formik.errors.state : null}
            />
            <TextInput
              name='zip_no'
              title='Zip_no'
              placeholder='0000000'
              value={formik.values.zip_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur('zip_no')}
              error={!!formik.errors.zip_no && formik.touched.zip_no}
              helperText={formik.touched.zip_no ? formik.errors.zip_no : null}
            />
          </Box>
          <Divider />
          <Box display='flex' justifyContent='flex-end' paddingY={5} pr={10}>
            <AuthButton variant='contained' onClick={formik.handleSubmit}>
              Submit
            </AuthButton>
          </Box>
        </React.Fragment>
      ) : (
        <GetStartedScreen toggleToFormScreen={toggleToFormScreen} />
      )}
    </AuthCard>
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
        {props.title}
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
  },
}));

export default RegisterHospitalForm;
