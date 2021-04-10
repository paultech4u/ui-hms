import React from 'react';
import { useIsDesktop } from '../hooks';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';

function GetStartedScreen(props) {
  const { toggleToFormScreen } = props;
  const isDesktop = useIsDesktop();

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      padding={isDesktop ? 20 : 0}
      marginTop={18}>
      <Box paddingY={10}>
        <Typography>Logo</Typography>
      </Box>
      <Box marginY={10}>
        <Box textAlign='center'>
          <Typography variant='h5'>Welcome to HMS!</Typography>
          <Typography>
            Your health is our piority, We care for your health!
          </Typography>
          <Typography>
            To register click the button below to get started!
          </Typography>
        </Box>
        <Box
          marginBottom={20}
          marginTop={10}
          display='flex'
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

// const useStyles = makeStyles((theme) => ({}));

export default GetStartedScreen;
