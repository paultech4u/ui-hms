import React, { useState } from 'react';
import { Box, Typography, Paper } from '@material-ui/core';
import { AuthCard, ActionButton, PasswordInput, TextInput } from './AuthCommon';

function AuthLogin(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //   const [error, setError] = useState(true);

  const clearfix = () => {
    setUsername('');
  };

  return (
    <AuthCard>
      <Box marginTop='-100px' marginX={10}>
        <Paper>
          <Typography>Log in</Typography>
        </Paper>
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
      <Box display='flex' justifyContent='center'>
        <ActionButton>Login</ActionButton>
      </Box>
    </AuthCard>
  );
}

export default AuthLogin;
