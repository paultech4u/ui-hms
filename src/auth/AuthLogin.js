/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, makeStyles, Slide, Link } from '@material-ui/core';
import { AuthCard, ActionButton, PasswordInput, TextInput } from './AuthCommon';
import { Progress } from '../common/Progress';

function AuthLogin(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('idle');
  //   const [error, setError] = useState(true);

  const styles = useStyles();

  const location = useLocation();

  const timerRef = React.useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleClickQuery = () => {
    clearTimeout(timerRef.current);

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }

    setQuery('progress');
    timerRef.current = setTimeout(() => {
      setQuery('idle');
    }, 2000);
  };

  const clearfix = () => {
    setUsername('');
  };

  return (
    <Slide direction='down' in={location.pathname === '/login'}>
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
            flexDirection='column'
            paddingTop={10}
            marginX={15}
            marginBottom={10}>
            <ActionButton onClick={handleClickQuery}>
              <Typography style={{ marginRight: '10px' }}>Login</Typography>
              {query === 'progress' ? (
                <Progress in={query === 'progress'} unmountOnExit />
              ) : null}
            </ActionButton>
            <Box textAlign='center' marginTop={6}>
              <Link style={{ cursor: 'pointer' }}>Forget Password?</Link>
            </Box>
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
