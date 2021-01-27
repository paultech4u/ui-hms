import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Typography,
  Button,
  Fade,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  withStyles,
  makeStyles,
  TextField,
  MenuItem,
  Snackbar,
} from '@material-ui/core';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useIsDesktop } from '../hooks';
import { Alert } from '@material-ui/lab';
import { HospitalRoles } from '../constants';
import AuthPreference from './AuthPreference';
import { Progress } from '../common/Progress';
import { useDispatch, useSelector } from 'react-redux';
import { handleAlertClose, registerAction } from './AuthRegSlice';
import { FaUserShield, FaHospital, FaUserCog } from 'react-icons/fa';
import { AuthCard, TextInput, PasswordInput, ActionButton } from './AuthCommon';

let vertical = 'bottom';
let horizontal = 'left';

function Register(props) {
  const [toggleForm, setToggleForm] = useState(false);
  const [current, setCurrent] = useState(0);

  const isDesktop = useIsDesktop();

  const dispatch = useDispatch();

  const toggleToFormScreen = () => {
    setToggleForm(!toggleForm);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
  };

  const regiterschema = Yup.object().shape({
    hospitalName: Yup.string()
      .trim()
      .min(6, 'Must contain 6 character')
      .max(50, 'Max 50')
      .required('Required*'),
    hospitalEmail: Yup.string().email('Invalid email').required('Required*'),
    state: Yup.string()
      .trim()
      .min(3, 'Must contain 3 character')
      .max(20, 'Max 20')
      .required('Required*'),
    address: Yup.string()
      .trim()
      .min(6, 'Must contain 6 character')
      .max(50, 'Max 50')
      .required('Required*'),
    zip_code: Yup.number()
      .positive('Must be a non-negative number')
      .notRequired(),
    firstname: Yup.string()
      .trim()
      .min(6, 'Minimum of 6 character')
      .max(20, 'Max 20')
      .required('Required*'),
    lastname: Yup.string()
      .trim()
      .min(6, 'Minimum of 6 character')
      .max(20, 'Max 20')
      .required('Required*'),
    username: Yup.string()
      .trim()
      .min(6, 'Minimum of 6 character')
      .max(20, 'Max 20')
      .required('Required*'),
    email: Yup.string().email('Invalid email').required('Required*'),
    phone_number: Yup.number().required('Required*'),
    password: Yup.string()
      .min(6, 'Minimum of 6 character')
      .max(20, 'Maximum of 20 character')
      .required('Required*'),
  });

  const formik = useFormik({
    initialValues: {
      hospitalName: '',
      hospitalEmail: '',
      state: '',
      address: '',
      zip_code: '',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phone_number: '',
      password: '',
      role: 'ADMIN',
    },
    onSubmit: async (values) => {
      const admin = {
        role: values.role,
        email: values.email,
        lastname: values.lastname,
        username: values.username,
        password: values.password,
        firstname: values.firstname,
        phone_number: values.phone_number,
        hospital_name: values.hospitalName,
      };
      const hospital = {
        state: values.state,
        address: values.address,
        zip_code: values.zip_code,
        hospital_email: values.hospitalEmail,
        hospital_name: values.hospitalName,
      };

      const data = { admin, hospital };

      dispatch(registerAction(data));
    },
    validationSchema: regiterschema,
  });

  const { isLoading, open, error, success } = useSelector((state) => {
    return {
      open: state.reg.open,
      isLoading: state.reg.isLoading,
      error: state.reg.error === null ? '' : state.reg.error,
      success: state.reg.success === null ? '' : state.reg.success,
    };
  });

  const toggleAlert = () => {
    dispatch(handleAlertClose(false));
  };

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
        <Fade in={toggleForm} style={{ transitionDelay: '1000ms' }}>
          <Box>
            <Box>
              {/* Stepper */}
              <Stepper
                alternativeLabel
                activeStep={current}
                connector={<FormStepConnectorStyle />}>
                {stepsLabel.map((label, index) => (
                  <Step key={index}>
                    <StepLabel StepIconComponent={FormStepIcons}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box>
              <HospitalForm
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                cleartext={formik.resetForm}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                hidden={current === 1 || current === 2}
              />
              <AdminForm
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                cleartext={formik.resetForm}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                hidden={current === 2 || current === 0}
              />
              <AuthPreference hidden={current === 1 || current === 0} />
            </Box>
            <Divider />
            <Box display='flex' justifyContent='flex-end' paddingY={10}>
              <Box paddingRight={10}>
                <ActionButton disabled={current === 0} onClick={handlePrev}>
                  Previous
                </ActionButton>
              </Box>
              <Box paddingRight={10}>
                {current === 2 ? (
                  <ActionButton onClick={formik.handleSubmit}>
                    {isLoading === 'pending' ? (
                      <Progress in={isLoading === 'pending'} unmountOnExit />
                    ) : null}
                    <Typography
                      style={{
                        paddingLeft: isLoading === 'pending' ? '10px' : 0,
                      }}>
                      Submit
                    </Typography>
                  </ActionButton>
                ) : (
                  <ActionButton onClick={handleNext}>Next</ActionButton>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      ) : (
        <GetStartedScreen toggleToFormScreen={toggleToFormScreen} />
      )}
      <Snackbar
        open={open}
        onClose={toggleAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        key={vertical + horizontal}
        autoHideDuration={6000}>
        <Alert
          onClose={toggleAlert}
          elevation={6}
          severity={success === 'Created' ? 'success' : 'error'}
          variant='filled'>
          {success === 'Created' ? success : error}
        </Alert>
      </Snackbar>
    </AuthCard>
  );
}

function HospitalForm(props) {
  const { values, handleChange, errors, handleBlur, touched } = props;
  const { hospitalName, hospitalEmail, state, address, zip_code } = errors;

  const isDesktop = useIsDesktop();

  return (
    <Box hidden={props.hidden}>
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}>
        <Box
          display='flex'
          flexDirection='column'
          paddingBottom={isDesktop ? 0 : 8}>
          <Typography variant='caption'>Name</Typography>
          <TextInput
            name='hospitalName'
            variant='filled'
            value={values.hospitalName}
            onInput={handleChange}
            onBlur={handleBlur}
            showClearIcon={false}
            placeholder='Enter hospital name'
            errortext={
              !!hospitalName && touched.hospitalName ? hospitalName : null
            }
            error={!!hospitalName && touched.hospitalName}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          paddingLeft={isDesktop ? 10 : 0}>
          <Typography variant='caption'>Email</Typography>
          <TextInput
            name='hospitalEmail'
            variant='filled'
            value={values.hospitalEmail}
            onInput={handleChange}
            onBlur={handleBlur}
            errortext={
              !!hospitalEmail && touched.hospitalEmail ? hospitalEmail : null
            }
            showClearIcon={false}
            placeholder='Enter hospital email'
            error={!!hospitalEmail && touched.hospitalEmail}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}
        marginY={8}>
        <Box
          display='flex'
          flexDirection='column'
          paddingBottom={isDesktop ? 0 : 8}>
          <Typography variant='caption'>State</Typography>
          <TextInput
            name='state'
            variant='filled'
            value={values.state}
            onInput={handleChange}
            onBlur={handleBlur}
            showClearIcon={false}
            placeholder='Enter state'
            errortext={!!state && touched.state ? state : null}
            error={!!state && touched.state}
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Address</Typography>
          <TextInput
            name='address'
            variant='filled'
            onInput={handleChange}
            onBlur={handleBlur}
            value={values.address}
            showClearIcon={false}
            placeholder='Enter hospital address'
            errortext={!!address && touched.address ? address : null}
            error={!!address && touched.address}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}
        marginY={8}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Zip Code:</Typography>
          <TextInput
            name='zip_code'
            variant='filled'
            value={values.zip_code}
            onInput={handleChange}
            onBlur={handleBlur}
            showClearIcon={false}
            placeholder='Enter hospital zip_code'
            errortext={!!zip_code && touched.zip_code ? zip_code : null}
            error={!!zip_code && touched.zip_code}
          />
        </Box>
      </Box>
    </Box>
  );
}

function AdminForm(props) {
  const { values, handleChange, errors, handleBlur, touched, hidden } = props;
  const {
    firstname,
    lastname,
    username,
    email,
    phone_number,
    password,
  } = errors;

  const isDesktop = useIsDesktop();

  return (
    <Box hidden={hidden}>
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}>
        {/* First row */}
        <Box
          display='flex'
          flexDirection='column'
          paddingBottom={isDesktop ? 0 : 8}
          paddingRight={isDesktop ? 10 : 0}>
          <Typography variant='caption'>Firstname</Typography>
          <TextInput
            name='firstname'
            variant='filled'
            value={values.firstname}
            onInput={handleChange}
            onBlur={handleBlur}
            showClearIcon={false}
            placeholder='Enter firstname'
            errortext={!!firstname && touched.firstname ? firstname : null}
            error={!!firstname && touched.firstname}
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Lastname</Typography>
          <TextInput
            name='lastname'
            variant='filled'
            value={values.lastname}
            onInput={handleChange}
            onBlur={handleBlur}
            showClearIcon={false}
            placeholder='Enter lastname'
            errortext={!!lastname && touched.lastname ? lastname : null}
            error={!!lastname && touched.lastname}
          />
        </Box>
      </Box>
      {/* Second row */}
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}
        marginY={8}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Email Address</Typography>
          <TextInput
            name='email'
            variant='filled'
            value={values.email}
            onInput={handleChange}
            onBlur={handleBlur}
            errortext={!!email && touched.email ? email : null}
            showClearIcon={false}
            placeholder='Enter email'
            error={!!email && touched.email}
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Password</Typography>
          <PasswordInput
            name='password'
            variant='filled'
            onInput={handleChange}
            onBlur={handleBlur}
            value={values.password}
            errortext={!!password && touched.password ? password : null}
            error={!!password && touched.password}
          />
        </Box>
      </Box>
      {/* Third row */}
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}
        marginY={8}>
        <Box
          display='flex'
          flexDirection='column'
          paddingBottom={isDesktop ? 0 : 8}>
          <Typography variant='caption'>Username</Typography>
          <TextInput
            name='username'
            variant='filled'
            value={values.username}
            onInput={handleChange}
            onBlur={handleBlur}
            showClearIcon={false}
            placeholder='Enter username'
            errortext={!!username && touched.username ? username : null}
            error={!!username && touched.username}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          paddingBottom={isDesktop ? 0 : 8}>
          <Typography variant='caption'>Phone Number</Typography>
          <TextInput
            name='phone_number'
            variant='filled'
            value={values.phone_number}
            onInput={handleChange}
            onBlur={handleBlur}
            placeholder='Enter phone number'
            showClearIcon={false}
            errortext={
              !!phone_number && touched.phone_number ? phone_number : null
            }
            error={!!phone_number && touched.phone_number}
          />
        </Box>
      </Box>
      <Box marginX={10}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='caption'>Role</Typography>
          <TextField
            name='role'
            variant='filled'
            select
            disabled
            value={values.role}
            onChange={handleChange}
            helperText='Choose hopital role'>
            {HospitalRoles.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
}

const stepsLabel = ['Hospital Details', 'Admin Details', 'Preference'];

function FormStepIcons({ active, completed, icon }) {
  const styles = useStyles();
  const icons = {
    1: <FaHospital size={20} />,
    2: <FaUserShield size={20} />,
    3: <FaUserCog size={20} />,
  };
  return (
    <Box
      className={clsx(styles.stepIcon, {
        [styles.stepIcon_active]: active,
        [styles.stepIcon_completed]: completed,
      })}>
      {icons[String(icon)]}
    </Box>
  );
}

FormStepIcons.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number,
};

function GetStartedScreen(props) {
  const { toggleToFormScreen } = props;
  const isDesktop = useIsDesktop();

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      padding={isDesktop ? 20 : 0}
      marginTop={18}>
      <Box paddingY={10}>
        <Typography>Logo</Typography>
      </Box>
      <Box marginY={10}>
        <Box textAlign='center'>
          <Typography variant='h5'>Welcome to HMS!</Typography>
          <Typography>
            Your health is our piority, We care for your health!
          </Typography>
          <Typography>
            To register click the button below to get started!
          </Typography>
        </Box>
        <Box
          marginBottom={20}
          marginTop={10}
          display='flex'
          justifyContent='center'>
          <Button
            color='primary'
            variant='contained'
            onClick={toggleToFormScreen}>
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  stepIcon: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIcon_active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  stepIcon_completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
}));

const FormStepConnectorStyle = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

export default Register;
