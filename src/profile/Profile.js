import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Avatar,
  Button,
  Divider,
  Backdrop,
  Typography,
  makeStyles,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { useIsMobile } from '../hooks';
import EditProfile from './ProfileEdit';
import { HiCamera } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { CustomCard } from '../common/Card';
import { StyledButton } from '../common/Button';
import { MdPersonOutline } from 'react-icons/md';
import ProfilePictureUploadMenu from './ProfileUploadMenu';
import { useHistory, useLocation } from 'react-router';
// import { Alert } from '@material-ui/lab';
// import { toggleEditMode } from './ProfileSlice';

function Profile(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const isMobile = useIsMobile();
  const uploadMenuRef = React.useRef(null);
  const [openUploadMenu, setOpenUploadMenu] = React.useState(false);

  const profile = useSelector((state) => state.profile.user);
  const isLoading = useSelector((state) => state.profile.isLoading);

  const onOpenUploadMenu = () => {
    setOpenUploadMenu(true);
    return;
  };

  const onCloseUploadMenu = () => {
    setOpenUploadMenu(false);
    return;
  };

  return (
    <Box paddingY={30}>
      <Box
        height={1}
        display='flex'
        flexDirection={isMobile ? 'row' : 'column'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent={isMobile ? 'space-around' : 'normal'}>
        <CustomCard
          elevation={2}
          variant='elevation'
          className={classes.avatar_card}>
          <Box display='flex' flexDirection='column'>
            <Box
              marginX={10}
              display='flex'
              marginTop='-50px'
              justifyContent='center'>
              <Avatar className={clsx(classes.avatar, classes.avatar_large)} />
            </Box>
            <Box
              padding={8}
              marginTop={2}
              display='flex'
              alignItems='center'
              flexDirection='column'>
              <Typography variant='caption' style={{ margin: '9px 0' }}>
                {profile === null ? 'admin' : profile.role.toUpperCase()}
              </Typography>
              <Typography variant='caption' style={{ marginBottom: '3px' }}>
                {profile === null ? 'JohnDoe' : profile.username}
              </Typography>
            </Box>
            <Box display='flex' justifyContent='center' paddingBottom={10}>
              <Button
                size='small'
                color='primary'
                variant='outlined'
                ref={uploadMenuRef}
                aria-haspopup='true'
                endIcon={<HiCamera />}
                onClick={onOpenUploadMenu}
                style={{ textTransform: 'revert' }}
                aria-controls={openUploadMenu ? 'upload-menu' : undefined}>
                Change picture
              </Button>
              <ProfilePictureUploadMenu
                open={openUploadMenu}
                anchorRef={uploadMenuRef}
                handleMenuClose={onCloseUploadMenu}
              />
            </Box>
          </Box>
        </CustomCard>
        <CustomCard
          elevation={2}
          variant='elevation'
          className={classes.details_card}>
          <Box display='flex' paddingBottom={4}>
            <Box
              padding={8}
              marginX={10}
              display='flex'
              borderRadius={3}
              marginTop='-20px'
              bgcolor='primary.main'
              className={clsx(classes.profile_header_icon)}>
              <MdPersonOutline size={30} />
            </Box>
            <Box
              pr={5}
              flex={1}
              marginTop={7}
              display='flex'
              alignItems='center'
              justifyContent='space-between'>
              <Typography variant='caption'>Profile</Typography>
              <StyledButton
                color='primary'
                variant='outlined'
                onClick={() =>
                  history.push({
                    pathname: '/profile/edit',
                    state: { background: location },
                  })
                }>
                Edit profile
              </StyledButton>
            </Box>
          </Box>
          <Divider />
          <Box display='flex' flexDirection='column' marginTop={4}>
            {[profile].map((profile, index) => (
              <React.Fragment key={index}>
                <Box
                  display='flex'
                  flexWrap='wrap'
                  justifyContent='space-between'
                  flexDirection={isMobile ? 'row' : 'column'}>
                  <ProfileListDetails
                    type='Firstname'
                    payload={profile === null ? 'John' : profile.firstname}
                  />
                  <ProfileListDetails
                    type='Lastname'
                    payload={profile === null ? 'Doe' : profile.lastname}
                  />
                </Box>
                <Box display='flex' flexDirection={isMobile ? 'row' : 'column'}>
                  <ProfileListDetails
                    type='Hospital'
                    payload='National Hospital, Abuja'
                  />
                  <ProfileListDetails
                    type='Username'
                    payload={profile === null ? 'JohnDoe' : profile.username}
                  />
                </Box>
                <Box display='flex' flexDirection={isMobile ? 'row' : 'column'}>
                  <ProfileListDetails
                    type='Role'
                    payload={profile === null ? 'Admin' : profile.role}
                  />
                  <ProfileListDetails
                    type='Email'
                    payload={
                      profile === null ? 'JohnDoe@email.com' : profile.email
                    }
                  />
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </CustomCard>
        <EditProfile />
        <Backdrop
          in={isLoading === 'pending' ? true : false}
          className={classes.back_drop}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </Box>
    </Box>
  );
}

function ProfileListDetails(props) {
  const isMobile = useIsMobile();
  const { type, payload, ...others } = props;

  return (
    <Box
      {...others}
      display='flex'
      flexDirection='column'
      margin={isMobile ? 10 : 5}>
      <TextField label={type} value={payload} disabled />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  profile_header_icon: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.20)',
  },
  avatar: {
    color: 'white',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.20)',
  },
  avatar_card: {
    width: 200,
    marginBottom: 50,
    [theme.breakpoints.down('sm')]: {
      width: 300,
      marginBottom: 50,
    },
    [theme.breakpoints.up('md')]: {
      width: 350,
      marginBottom: 0,
    },
  },
  details_card: {
    width: 200,
    '& .MuiInputBase-input': {
      color: '#000',
    },
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
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
    width: 100,
    height: 100,
    [theme.breakpoints.up('md')]: {
      width: 200,
      height: 200,
    },
  },
  divider: {
    padding: '0px 15px 15px 15px',
  },
  back_drop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default Profile;
