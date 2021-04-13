import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Avatar,
  Divider,
  Backdrop,
  Typography,
  makeStyles,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { useIsMobile } from '../hooks';
import EditProfile from './ProfileEdit';
import { HiCamera } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { CustomCard } from '../common/Card';
import { StyledButton } from '../common/Button';
import { MdPersonOutline } from 'react-icons/md';
import ProfilePictureUploadMenu from './ProfileUploadMenu';
// import { Alert } from '@material-ui/lab';
// import { toggleEditMode } from './ProfileSlice';

function Profile(props) {
  const styles = useStyles();
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
    <Box paddingTop={30}>
      <Box
        height={1}
        display='flex'
        flexDirection={isMobile ? 'row' : 'column'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent={isMobile ? 'space-around' : 'normal'}>
        <CustomCard
          elevation={2}
          variant='elevation'
          className={styles.avatar_card}>
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
                {profile === null ? 'admin' : profile.role.toUpperCase()}
              </Typography>
              <Typography variant='caption' style={{ marginBottom: '3px' }}>
                {profile === null ? 'JohnDoe' : profile.username}
              </Typography>
            </Box>
          </Box>
        </CustomCard>
        <CustomCard
          elevation={2}
          variant='elevation'
          className={styles.details_card}>
          <Box display='flex' paddingBottom={4}>
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
              pr={5}
              flex={1}
              marginTop={7}
              display='flex'
              alignItems='center'
              justifyContent='space-between'>
              <Typography variant='caption'>Profile</Typography>
              <StyledButton variant='outlined' color='primary'>
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
                    payload='National Hospital,Abuja'
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
          className={styles.back_drop}>
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
      <Box>
        <Typography>{type}</Typography>
      </Box>
      <Box padding={3} width={isMobile ? 200 : 250} border='solid 2px #8256DE'>
        <Typography>{payload}</Typography>
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
  switch_control: {
    '& .MuiFormControlLabel-label': {
      fontSize: 12,
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
