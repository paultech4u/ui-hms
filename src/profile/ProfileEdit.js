import React from 'react';
// import clsx from 'clsx';
import {
  Box,
  Button,
  Dialog,
  Typography,
  // makeStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { useFormik } from 'formik';
// import { useIsMobile } from '../hooks';
import { useSelector } from 'react-redux';
import { TextInput } from '../common/TextInput';
import { useHistory, useLocation } from 'react-router';

function EditProfile(props) {
  // const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const profile = useSelector((state) => state.profile.user);

  const formik = useFormik({
    initialValues: {
      email: profile === null ? '' : profile.email,
      username: profile === null ? '' : profile.username,
      lastname: profile === null ? '' : profile.lastname,
      firstname: profile === null ? '' : profile.firstname,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const cancle = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <Dialog
      fullWidth
      onClose={cancle}
      open={location.pathname === '/profile/edit'}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent dividers>
        <Box display='flex' flexDirection='column'>
          <Box marginBottom={5} display='flex' flexDirection='column'>
            <Typography variant='caption'>Hospital</Typography>
            <TextInput disabled value='National Hospital, Abuja' />
          </Box>

          <Box marginBottom={5} display='flex' flexDirection='column'>
            <Typography variant='caption'>Firstname</Typography>
            <TextInput
              name='firstname'
              onChange={formik.handleChange}
              value={formik.values.firstname}
            />
          </Box>
          <Box marginBottom={5} display='flex' flexDirection='column'>
            <Typography variant='caption'>Lastname</Typography>
            <TextInput
              name='lastname'
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
          </Box>
          <Box marginBottom={5} display='flex' flexDirection='column'>
            <Typography variant='caption'>Username</Typography>
            <TextInput
              name='username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </Box>
          <Box display='flex' flexDirection='column'>
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
        <Button color='primary' onClick={cancle}>
          Cancle
        </Button>
        <Button color='primary' onClick={formik.handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// const useStyles = makeStyles((theme) => ({
//   text_field: {
//     width: '25ch',
//     [theme.breakpoints.up('md')]: {
//       width: '30ch',
//     },
//   },
//   text_field_item: {
//     display: 'flex',
//     justifyContent: 'center',
//     paddingLeft: '10px',
//     paddingRight: '10px',
//   },
//   text_field_item_child: {
//     paddingTop: '20px',
//     marginBottom: '15px',
//   },
// }));

export default EditProfile;
