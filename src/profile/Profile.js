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
} from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { CustomCard } from '../common/Card';
import { MdPersonOutline } from 'react-icons/md';

function Profile(props) {
  const styles = useStyles();
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
            <FormControlLabel control={<Switch />} label='Edit mode' />
          </Box>
        </Box>
        <Box display='flex'>
          <TextInput disabled placeholder='Hospital (disabled)' />
          <TextInput placeholder='Email address' />
          <TextInput placeholder='Username' />
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <TextInput
            className={clsx(styles.text_field)}
            placeholder='Firstname'
          />
          <TextInput
            className={clsx(styles.text_field)}
            placeholder='Lastname'
          />
        </Box>
        <Box
          display='flex'
          justifyContent='flex-end'
          paddingBottom={8}
          marginRight={8}>
          <Button disabled variant='contained' color='primary'>
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
          </Box>
          <Box marginTop={10} padding={8}>
            <Typography align='center' style={{ margin: '10px 0' }}>
              Admin
            </Typography>
            <Typography align='center' style={{ marginBottom: '3px' }}>
              Admin Name
            </Typography>
            <Typography variant='caption'>
              Don't be scared of the truth because we need to restart the human
              foundation in truth And I love you like Kanye loves Kanye I love
              Rick Owens’ bed design but the back is...
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
