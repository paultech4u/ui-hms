import React from 'react';
import {
  Avatar,
  Box,
  makeStyles,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
} from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { CustomCard } from '../common/Card';
import { MdPersonOutline } from 'react-icons/md';
import { HiCamera } from 'react-icons/hi';
import { toggleEditMode } from './ProfileSlice';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

function Profile(props) {
  const styles = useStyles();

  const { edit } = useSelector((state) => state.profile);

  const formik = useFormik({
    initialValues: {
      edit: edit,
      email: '',
      username: '',
      firstname: '',
      lastname: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box display='flex' padding={10}>
      <CustomCard
        flex={2}
        paddingX={15}
        marginTop={30}
        elevation={2}
        variant='elevation'>
        <Box display='flex'>
          <Box
            display='flex'
            padding={8}
            marginX={10}
            marginTop='-20px'
            borderRadius={3}
            bgcolor='primary.main'
            className={clsx(styles.profile_header_icon)}>
            <MdPersonOutline size={30} />
          </Box>
          <Box
            display='flex'
            marginTop={7}
            flex={1}
            justifyContent='space-between'
            alignItems='center'>
            <Typography>Profile</Typography>
            <FormControlLabel
              control={
                <Switch
                  name='edit'
                  onChange={formik.handleChange}
                  checked={formik.values.edit}
                  value={formik.values.edit}
                />
              }
              label='Edit mode'
            />
          </Box>
        </Box>
        <Box display='flex'>
          <TextInput disabled placeholder='Hospital (disabled)' />
          <TextInput
            name='email'
            placeholder='Email address'
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled={!formik.values.edit}
          />
          <TextInput
            name='username'
            placeholder='Username'
            onChange={formik.handleChange}
            value={formik.values.username}
            disabled={!formik.values.edit}
          />
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <TextInput
            name='firstname'
            placeholder='Firstname'
            disabled={!formik.values.edit}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            className={clsx(styles.text_field)}
          />
          <TextInput
            name='lastname'
            placeholder='Lastname'
            value={formik.values.lastname}
            onChange={formik.handleChange}
            disabled={!formik.values.edit}
            className={clsx(styles.text_field)}
          />
        </Box>
        <Box
          display='flex'
          justifyContent='flex-end'
          paddingBottom={8}
          marginRight={8}>
          <Button
            disabled={!formik.values.edit}
            onClick={formik.handleSubmit}
            variant='contained'
            color='primary'>
            Update profile
          </Button>
        </Box>
      </CustomCard>
      <CustomCard
        flex={1}
        marginTop={30}
        paddingX={15}
        elevation={2}
        variant='elevation'>
        <Box display='flex' flexDirection='column'>
          <Box
            display='flex'
            justifyContent='center'
            marginX={10}
            marginTop='-50px'>
            <Avatar className={clsx(styles.avatar, styles.avatar_large)} />
            {!!formik.values.edit && (
              <Box
                position='absolute'
                display='flex'
                borderRadius='50%'
                bgcolor='text.disabled'
                className={clsx(styles.avatar, styles.avatar_large)}>
                <Box
                  display='flex'
                  flex={1}
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  borderRadius='50%'>
                  <IconButton>
                    <HiCamera />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            marginTop={2}
            padding={8}
            display='flex'
            flexDirection='column'
            alignItems='center'>
            <Typography variant='caption' style={{ margin: '9px 0' }}>
              Role
            </Typography>
            <Typography variant='caption' style={{ marginBottom: '3px' }}>
              Admin Name
            </Typography>
          </Box>
        </Box>
      </CustomCard>
    </Box>
  );
}

function TextInput(props) {
  return (
    <Box paddingX={10}>
      <Box paddingTop={20} marginBottom={15}>
        <TextField {...props} />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  profile_header_icon: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.20)',
  },
  text_field: {
    width: '25ch',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  avatar: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.20)',
  },
  avatar_large: {
    width: 150,
    height: 150,
  },
}));

export default Profile;
