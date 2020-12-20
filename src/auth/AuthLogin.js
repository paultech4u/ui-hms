import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, makeStyles, Slide } from '@material-ui/core';
import { AuthCard, ActionButton, PasswordInput, TextInput } from './AuthCommon';

function AuthLogin(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //   const [error, setError] = useState(true);

  const styles = useStyles();

  const location = useLocation();

  const clearfix = () => {
    setUsername('');
  };

  return (
    <Slide
      direction='down'
      timeout={{ enter: "1000ms" }}
      in={location.pathname === '/login'}>
      <Box>
        <AuthCard marginTop={30} display='flex'>
          <Box
            marginTop='-20px'
            marginX={10}
            padding={15}
            bgcolor='primary.main'
            borderRadius={6}
            className={styles.AuthCard_header}>
            <Typography variant='h6' className={styles.AuthCard_header_title}>
              Log in
            </Typography>
          </Box>
          <Box padding={10} display='flex' flexDirection='column'>
            <Box>
              <TextInput
                label='Enter Username'
                id='username'
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                cleartext={clearfix}
              />
            </Box>
            <Box marginTop={10}>
              <PasswordInput
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='center'
            paddingTop={10}
            marginX={15}
            marginBottom={10}>
            <ActionButton>Login</ActionButton>
          </Box>
        </AuthCard>
      </Box>
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  AuthCard_header: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.14)',
  },
  AuthCard_header_title: {
    marginBottom: '3px',
    fontWeight: theme.typography.fontWeightLight.valueOf(500),
    color: theme.palette.common.white,
    textAlign: 'center',
  },
}));

export default AuthLogin;
