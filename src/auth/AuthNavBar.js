/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function AuthNavBar(props) {
  const styles = useStyles();
  const history = useHistory();

  return (
    <Box flex={1} display='flex' my={10}>
      <Box display='flex' flex={1} justifyContent='center' fontSize={19}>
        <a href='/login' className={styles.logo_icon}>
          Logo
        </a>
      </Box>
      <Box
        flex={1}
        display='flex'
        alignItems='center'
        justifyContent='center'
        color='white'>
        <Typography variant='body1'>Hospital has registered?</Typography>
        <Button
          label='Login'
          variant='outlined'
          style={{ color: 'white', marginLeft: 7 }}
          onClick={() => history.push('/login')}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  logo_icon: {
    padding: '15px',
    margin: '0 5px',
    display: 'flex',
    cursor: 'pointer',
    lineHeight: '20px',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
  icon: {
    marginRight: '5px',
  },
}));

export default AuthNavBar;
