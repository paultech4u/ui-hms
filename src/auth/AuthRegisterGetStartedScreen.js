import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';

function GetStartedScreen(props) {
  const { toggleToFormScreen } = props;

  return (
    <Box
      display='flex'
      marginTop={18}
      alignItems='center'
      flexDirection='column'
      justifyContent='center'>
      <Box paddingY={10}>
        <Typography>Logo</Typography>
      </Box>
      <Box marginY={10}>
        <Box textAlign='center'>
          <Typography variant='h5'>Welcome to HMS!</Typography>
        </Box>
        <Box
          display='flex'
          marginTop={10}
          marginBottom={20}
          justifyContent='center'>
          <Button
            color='primary'
            variant='contained'
            onClick={toggleToFormScreen}>
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GetStartedScreen;
