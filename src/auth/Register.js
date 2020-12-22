import React, { useState } from 'react';
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
} from '@material-ui/core';
import { AuthCard, TextInput, ActionButton } from './AuthCommon';
import { FaUserShield, FaHospital, FaUserCog } from 'react-icons/fa';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function Register(props) {
  const [toggleForm, setToggleForm] = useState(false);
  const [current, setCurrent] = useState(0);

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
    hospital: Yup.string().trim().strict().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    state: Yup.string().trim().strict().required('Required'),
    address: Yup.string().trim().strict().required('Required'),
    zip_code: Yup.number()
      .positive('Must be a non-negative number')
      .notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      hospital: '',
      email: '',
      state: '',
      address: '',
      zip_code: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: regiterschema,
  });

  return (
    <AuthCard>
      <Box paddingY={10} marginLeft={13}>
        <Typography>Logo</Typography>
      </Box>
      <Divider />
      {toggleForm ? (
        <Fade in={toggleForm} style={{ transitionDelay: '1000ms' }}>
          <form onSubmit={formik.handleSubmit}>
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
            <Box overflow='auto'>
              <HospitalForm
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                hidden={current === 1 || current === 2}
              />
              <AdminForm hidden={current === 2 || current === 0} />
              <Box hidden={current === 1 || current === 0}>Preference</Box>
            </Box>
            <Box display='flex' justifyContent='flex-end' paddingBottom={10}>
              <Box paddingRight={10}>
                <ActionButton disabled={current === 0} onClick={handlePrev}>
                  Prev
                </ActionButton>
              </Box>
              <Box paddingRight={10}>
                {current === 2 ? (
                  <ActionButton type='submit'>Submit</ActionButton>
                ) : (
                  <ActionButton onClick={handleNext}>Next</ActionButton>
                )}
              </Box>
            </Box>
          </form>
        </Fade>
      ) : (
        <GetStartedScreen toggleToFormScreen={toggleToFormScreen} />
      )}
    </AuthCard>
  );
}

function HospitalForm(props) {
  const { values, handleChange, errors, touched } = props;
  const { hospital, email, state, address, zip_code } = errors;

  return (
    <Box hidden={props.hidden}>
      <Box display='flex' justifyContent='space-between' marginX={10}>
        <Box>
          <Typography>Name*:</Typography>
          <TextInput
            name='hospital'
            variant='filled'
            value={values.hospital}
            onInput={handleChange}
            label='Enter hospital name'
            errortext={hospital}
            error={!!hospital}
          />
        </Box>
        <Box paddingLeft={10}>
          <Typography>Email*:</Typography>
          <TextInput
            name='email'
            variant='filled'
            value={values.email}
            onInput={handleChange}
            errortext={email}
            label='Enter hospital email'
            error={!!email}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        marginX={10}
        marginY={8}>
        <Box>
          <Typography>State*:</Typography>
          <TextInput
            name='state'
            variant='filled'
            value={values.state}
            onInput={handleChange}
            errortext={state}
            error={!!state}
          />
        </Box>
        <Box>
          <Typography>Address*:</Typography>
          <TextInput
            name='address'
            variant='filled'
            onInput={handleChange}
            value={values.address}
            errortext={address}
            error={!!address}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        marginX={10}
        marginY={8}>
        <Box>
          <Typography>Zip_Code:</Typography>
          <TextInput
            name='zip_code'
            variant='filled'
            value={values.zip_code}
            onInput={handleChange}
            errortext={zip_code}
            error={!!zip_code}
          />
        </Box>
      </Box>
    </Box>
  );
}

function AdminForm(props) {
  const { hidden } = props;
  return <Box hidden={hidden}>Admin</Box>;
}

const stepsLabel = ['Hospital Details', 'Admin Details', 'Preference'];

function FormStepIcons(props) {
  const styles = useStyles();
  const icons = {
    1: <FaHospital size={20} />,
    2: <FaUserShield size={20} />,
    3: <FaUserCog size={20} />,
  };
  return (
    <Box className={clsx(styles.stepIcon)}>{icons[String(props.icon)]}</Box>
  );
}

function GetStartedScreen(props) {
  const { toggleToFormScreen } = props;
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      padding={50}
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
          <Typography>To register click the get started button!</Typography>
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

const useStyles = makeStyles({
  stepIcon: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#000',
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
});

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
