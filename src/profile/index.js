import React from 'react';
import clsx from 'clsx';
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
  Divider,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useIsDesktop, useIsMobile } from '../hooks';
import { HiCamera } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { CustomCard } from '../common/Card';
import { MdPersonOutline } from 'react-icons/md';
import ProfilePictureUploadMenu from './ProfileUploadMenu';
// import { Alert } from '@material-ui/lab';
// import { toggleEditMode } from './ProfileSlice';

function Profile(props) {
  const styles = useStyles();
  const isMobile = useIsMobile();

  const { edit } = useSelector((state) => state.profile);

  const uploadMenuRef = React.useRef(null);
  const [openUploadMenu, setOpenUploadMenu] = React.useState(false);

  const onOpenUploadMenu = () => {
    setOpenUploadMenu(true);
    return;
  };

  const onCloseUploadMenu = () => {
    setOpenUploadMenu(false);
    return;
  };

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
    <Box
      display='flex'
      alignItems='center'
      marginTop={20}
      padding={isMobile ? 0 : 10}
      justifyContent='space-around'
      flexDirection={isMobile ? 'row' : 'column'}>
      <CustomCard
        className={styles.avatar_card}
        elevation={2}
        variant='elevation'>
        <Box display='flex' flexDirection='column'>
          <Box
            marginX={10}
            display='flex'
            marginTop='-50px'
            justifyContent='center'>
            <Avatar className={clsx(styles.avatar, styles.avatar_large)} />
            <Box
              className={clsx(
                styles.avatar,
                styles.avatar_large,
                styles.avatar_content
              )}>
              <Box
                flex={1}
                display='flex'
                borderRadius='50%'
                alignItems='center'
                flexDirection='column'
                justifyContent='center'>
                <IconButton
                  ref={uploadMenuRef}
                  aria-haspopup='true'
                  onClick={onOpenUploadMenu}
                  aria-controls={openUploadMenu ? 'upload-menu' : undefined}>
                  <HiCamera color='#fff' />
                </IconButton>
                <Box fontSize={2}>
                  <Typography align='center' variant='caption'>
                    CHANGE <br /> PROFILE <br /> PICTURE
                  </Typography>
                </Box>
              </Box>
            </Box>
            <ProfilePictureUploadMenu
              open={openUploadMenu}
              anchorRef={uploadMenuRef}
              handleMenuClose={onCloseUploadMenu}
            />
          </Box>
          <Box
            padding={8}
            marginTop={2}
            display='flex'
            alignItems='center'
            flexDirection='column'>
            <Typography variant='caption' style={{ margin: '9px 0' }}>
              Role
            </Typography>
            <Typography variant='caption' style={{ marginBottom: '3px' }}>
              Admin Name
            </Typography>
          </Box>
        </Box>
      </CustomCard>
      <CustomCard elevation={2} variant='elevation'>
        <Box display='flex'>
          <Box
            padding={8}
            marginX={10}
            display='flex'
            borderRadius={3}
            marginTop='-20px'
            bgcolor='primary.main'
            className={clsx(styles.profile_header_icon)}>
            <MdPersonOutline size={30} />
          </Box>
          <Box
            flex={1}
            marginTop={7}
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Typography>Profile</Typography>
            <FormControlLabel
              label='Edit mode'
              control={
                <Switch
                  name='edit'
                  value={formik.values.edit}
                  checked={formik.values.edit}
                  onChange={formik.handleChange}
                />
              }
              labelPlacement={isMobile ? 'bottom' : 'end'}
            />
          </Box>
        </Box>
        <Box display='flex' flexDirection={isMobile ? 'row' : 'column'}>
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
        <Box
          display='flex'
          justifyContent='space-between'
          flexDirection={isMobile ? 'row' : 'column'}>
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
        <Box className={styles.divider}>
          <Divider />
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
    </Box>
  );
}

function TextInput(props) {
  const style = useStyles();
  return (
    <Box className={style.text_field_item}>
      <Box className={style.text_field_item_child}>
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
  avatar: {
    color: 'white',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.20)',
  },
  avatar_card: {
    marginBottom: 50,
  },
  avatar_content: {
    position: 'absolute',
    display: 'flex',
    borderRadius: '50%',
    opacity: 0,
    backgroundColor: theme.palette.text.disabled,
    '&:hover': {
      opacity: 1,
    },
  },
  avatar_large: {
    width: 200,
    height: 200,
  },
  divider: {
    padding: '0px 15px 15px 15px',
  },
}));

export default Profile;
