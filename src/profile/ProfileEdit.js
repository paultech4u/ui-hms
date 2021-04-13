import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Dialog,
  makeStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
// import { useIsMobile } from '../hooks';
import { useSelector } from 'react-redux';
import { TextInput } from '../common/TextInput';

function EditProfile(props) {
  const styles = useStyles();

  const profile = useSelector((state) => state.profile.user);

  const formik = useFormik({
    initialValues: {
      edit: false,
      email: profile === null ? '' : profile.email,
      username: profile === null ? '' : profile.username,
      lastname: profile === null ? '' : profile.lastname,
      firstname: profile === null ? '' : profile.firstname,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog open={false}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='column'>
          <Box marginBottom={5}>
            <Typography variant='caption'>Hospital</Typography>
            <TextInput disabled placeholder='Hospital (disabled)' />
          </Box>

          <Box marginBottom={5}>
            <Typography variant='caption'>Firstname</Typography>
            <TextInput
              name='firstname'
              onChange={formik.handleChange}
              value={formik.values.firstname}
              className={clsx(styles.text_field)}
            />
          </Box>
          <Box>
            <Typography variant='caption'>Lastname</Typography>
            <TextInput
              name='lastname'
              value={formik.values.lastname}
              onChange={formik.handleChange}
              className={clsx(styles.text_field)}
            />
          </Box>
          <Box marginBottom={5}>
            <Typography variant='caption'>Username</Typography>
            <TextInput
              name='username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </Box>
          <Box marginBottom={5}>
            <Typography variant='caption'>Email</Typography>
            <TextInput
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='primary'>Cancle</Button>
        <Button color='primary'>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  text_field: {
    width: '25ch',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  text_field_item: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  text_field_item_child: {
    paddingTop: '20px',
    marginBottom: '15px',
  },
}));

export default EditProfile;
