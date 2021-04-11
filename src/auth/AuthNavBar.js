/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { AuthNavBarLink } from './AuthCommon';
import { Box, makeStyles } from '@material-ui/core';
import { useIsDesktop, useIsMobile } from '../hooks';
import { useLocation, useHistory } from 'react-router-dom';
import { MdFingerprint, MdPersonAdd } from 'react-icons/md';

function AuthNavBar(props) {
  const styles = useStyles();
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const location = useLocation();
  const history = useHistory();

  return (
    <Box
      flex={1}
      display='flex'
      justifyContent='space-between'
      marginX={isDesktop ? 150 : 10}>
      <Box flex={1}>
        <Box display='flex' fontSize={19}>
          <a href='/login' className={styles.logo_icon}>
            Logo
          </a>
        </Box>
      </Box>
      <Box display='flex' flex={1} justifyContent='space-around'>
        <AuthNavBarLink
          label='Register'
          onClick={() => history.push('/register')}
          isActive={location.pathname === '/register'}
        />
        <AuthNavBarLink
          label='Login'
          onClick={() => history.push('/login')}
          isActive={location.pathname === '/login'}
        />
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
