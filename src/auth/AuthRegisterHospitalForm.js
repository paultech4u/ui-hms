import React, { useState } from 'react';
// import clsx from 'clsx';
import {
  Box,
  Divider,
  Typography,
  // makeStyles,
  // MenuItem,
} from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useIsDesktop } from '../hooks';
import { AuthCard } from './AuthCommon';
// import { hospitalRole } from '../constants';
// import { Progress } from '../common/Progress';
// import { TextInput } from '../common/TextInput';
import { useDispatch } from 'react-redux';
import { registerHosptialAction } from './AuthStoreSlice';
import GetStartedScreen from './AuthRegisterGetStartedScreen';

// const admin = {
//   role: values.role,
//   email: values.email,
//   lastname: values.lastname,
//   username: values.username,
//   password: values.password,
//   firstname: values.firstname,
//   phone_number: values.phone_number,
//   hospital_name: values.hospitalName,
// };

// let vertical = 'bottom';
// let horizontal = 'left';

function RegisterHospitalForm(props) {
  const [toggleForm, setToggleForm] = useState(false);

  const isDesktop = useIsDesktop();

  const dispatch = useDispatch();

  const toggleToFormScreen = () => {
    setToggleForm(!toggleForm);
  };

  const regiterschema = Yup.object().shape({
    hospital_name: Yup.string()
      .trim()
      .min(6, 'Must contain 6 character')
      .max(50, 'Max 50')
      .required('required*'),
    hospital_email: Yup.string().email('Invalid email').required('required*'),
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
  });

  const formik = useFormik({
    initialValues: {
      state: '',
      address: '',
      zip_no: '',
      hospital_name: '',
      hospital_email: '',
    },
    onSubmit: async (values) => {
      const payload = {
        state: values.state,
        address: values.address,
        zip_code: values.zip_code,
        hospital_email: values.hospitalEmail,
        hospital_name: values.hospitalName,
      };

      dispatch(registerHosptialAction(payload));
    },
    validationSchema: regiterschema,
  });

  // const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <AuthCard
      display='flex'
      marginX={isDesktop ? 0 : 8}
      marginBottom={10}
      variant='outlined'>
      <Box paddingY={10} marginLeft={13}>
        <Typography>Logo</Typography>
      </Box>
      <Divider />
      {toggleForm ? (
        <Box>
          <Divider />
        </Box>
      ) : (
        <GetStartedScreen toggleToFormScreen={toggleToFormScreen} />
      )}
    </AuthCard>
  );
}

// const useStyles = makeStyles((theme) => ({}));

export default RegisterHospitalForm;
