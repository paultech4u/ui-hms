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
  TextField,
  MenuItem,
} from '@material-ui/core';
import { AuthCard, TextInput, PasswordInput, ActionButton } from './AuthCommon';
import { FaUserShield, FaHospital, FaUserCog } from 'react-icons/fa';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useIsDesktop } from '../hooks';
import { HospitalRoles } from '../constants';
import AuthPreference from './AuthPreference';

function Register(props) {
  const [toggleForm, setToggleForm] = useState(false);
  const [current, setCurrent] = useState(0);

  const isDesktop = useIsDesktop();

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
    hospital: Yup.string()
      .trim()
      .min(6, 'Must contain 6 character')
      .max(20, 'Max 20')
      .required('Required*'),
    hospitalEmail: Yup.string().email('Invalid email').required('Required*'),
    state: Yup.string()
      .trim()
      .min(6, 'Must contain 6 character')
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
  });

  const formik = useFormik({
    initialValues: {
      hospital: '',
      hospitalEmail: '',
      state: '',
      address: '',
      zip_code: '',
      admin: '',
      adminEmail: '',
      phone: '',
      password: '',
      role: 'ADMIN',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: regiterschema,
  });

  return (
    <AuthCard display='flex' marginX={isDesktop ? 0 : 8}>
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
            <Box overflow='auto'>
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
            <Box display='flex' justifyContent='flex-end' paddingBottom={10}>
              <Box paddingRight={10}>
                <ActionButton disabled={current === 0} onClick={handlePrev}>
                  Previous
                </ActionButton>
              </Box>
              <Box paddingRight={10}>
                {current === 2 ? (
                  <ActionButton onClick={formik.handleSubmit}>
                    Submit
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
    </AuthCard>
  );
}

function HospitalForm(props) {
  const {
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    cleartext,
  } = props;
  const { hospital, hospitalEmail, state, address, zip_code } = errors;

  const isDesktop = useIsDesktop();

  return (
    <Box hidden={props.hidden}>
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}>
        <Box paddingBottom={isDesktop ? 0 : 8}>
          <Typography>Name*:</Typography>
          <TextInput
            name='hospital'
            variant='filled'
            value={values.hospital}
            onInput={handleChange}
            onBlur={handleBlur}
            cleartext={() => cleartext({ values: { hospital: '' } })}
            label='Enter hospital name'
            errortext={!!hospital && touched.hospital ? hospital : null}
            error={!!hospital && touched.hospital}
          />
        </Box>
        <Box paddingLeft={isDesktop ? 10 : 0}>
          <Typography>Email*:</Typography>
          <TextInput
            name='hospitalEmail'
            variant='filled'
            value={values.hospitalEmail}
            onInput={handleChange}
            onBlur={handleBlur}
            errortext={
              !!hospitalEmail && touched.hospitalEmail ? hospitalEmail : null
            }
            cleartext={() => cleartext({ values: { hospitalEmail: '' } })}
            label='Enter hospital email'
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
        <Box paddingBottom={isDesktop ? 0 : 8}>
          <Typography>State*:</Typography>
          <TextInput
            name='state'
            variant='filled'
            value={values.state}
            onInput={handleChange}
            onBlur={handleBlur}
            cleartext={() => cleartext({ values: { state: '' } })}
            errortext={!!state && touched.state ? state : null}
            error={!!state && touched.state}
          />
        </Box>
        <Box>
          <Typography>Address*:</Typography>
          <TextInput
            name='address'
            variant='filled'
            onInput={handleChange}
            onBlur={handleBlur}
            value={values.address}
            cleartext={() => cleartext({ values: { address: '' } })}
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
        <Box>
          <Typography>Zip_Code:</Typography>
          <TextInput
            name='zip_code'
            variant='filled'
            value={values.zip_code}
            onInput={handleChange}
            onBlur={handleBlur}
            cleartext={() => cleartext({ values: { zip_code: '' } })}
            errortext={!!zip_code && touched.zip_code ? zip_code : null}
            error={!!zip_code && touched.zip_code}
          />
        </Box>
      </Box>
    </Box>
  );
}

function AdminForm(props) {
  const {
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    hidden,
    cleartext,
  } = props;
  const { admin, adminEmail, phone, password } = errors;

  const isDesktop = useIsDesktop();

  return (
    <Box hidden={hidden}>
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}>
        <Box paddingBottom={isDesktop ? 0 : 8}>
          <Typography>Name*:</Typography>
          <TextInput
            name='admin'
            variant='filled'
            value={values.admin}
            onInput={handleChange}
            onBlur={handleBlur}
            cleartext={() => cleartext({ values: { admin: '' } })}
            label='Enter name'
            errortext={!!admin && touched.admin ? admin : null}
            error={!!admin && touched.admin}
          />
        </Box>
        <Box paddingLeft={isDesktop ? 10 : 0}>
          <Typography>Email*:</Typography>
          <TextInput
            name='adminEmail'
            variant='filled'
            value={values.adminEmail}
            onInput={handleChange}
            onBlur={handleBlur}
            errortext={!!adminEmail && touched.adminEmail ? adminEmail : null}
            cleartext={() => cleartext({ values: { adminEmail: '' } })}
            label='Enter email'
            error={!!adminEmail && touched.adminEmail}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}
        marginY={8}>
        <Box paddingBottom={isDesktop ? 0 : 8}>
          <Typography>Phone no*:</Typography>
          <TextInput
            name='phone'
            variant='filled'
            value={values.phone}
            onInput={handleChange}
            onBlur={handleBlur}
            label='Enter phone'
            cleartext={() => cleartext({ values: { phone: '' } })}
            errortext={!!phone && touched.phone ? phone : null}
            error={!!phone && touched.phone}
          />
        </Box>
        <Box>
          <Typography>password*:</Typography>
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
      <Box
        display='flex'
        justifyContent='space-between'
        flexDirection={isDesktop ? 'row' : 'column'}
        marginX={10}
        marginY={8}>
        <Box>
          <Typography>Role*:</Typography>
          <TextField
            name='role'
            variant='filled'
            select
            disabled
            value={values.role}
            onChange={handleChange}
            helperText='Choose Hopital Role'>
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

function FormStepIcons(props) {
  const styles = useStyles();
  const { active, completed, icon } = props;
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

function GetStartedScreen(props) {
  const { toggleToFormScreen } = props;
  const isDesktop = useIsDesktop();

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      padding={isDesktop ? 50 : 0}
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
