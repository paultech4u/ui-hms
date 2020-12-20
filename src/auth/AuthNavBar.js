/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import clsx from 'clsx';
import { useIsDesktop } from '../hooks';
import { Box, makeStyles, IconButton } from '@material-ui/core';
import { NavRouteButton } from './AuthCommon';
import { useLocation, useHistory } from 'react-router-dom';
import { MdFingerprint, MdPersonAdd, MdLockOpen, MdMenu } from 'react-icons/md';

export function NavBar(props) {
  const { toggleDrawer } = props;
  const styles = useStyles();
  const isDesktop = useIsDesktop();
  const location = useLocation();
  const history = useHistory();

  return (
    <Box
      display='flex'
      flex={1}
      justifyContent='space-between'
      marginX={isDesktop ? 150 : 10}>
      <Box flex={1}>
        <Box display='flex' fontSize={19}>
          <a href='/login' className={styles.navRoute_link}>
            Login Page
          </a>
        </Box>
      </Box>
      {isDesktop ? (
        <Box display='flex' flex={1} justifyContent='center'>
          <NavRouteButton
            active={location.pathname === '/register'}
            onClick={() => history.push('/register')}
            icon={<MdPersonAdd size={20} className={styles.icon} />}
            title='Register'
          />
          <NavRouteButton
            active={location.pathname === '/login'}
            onClick={() => history.push('/login')}
            icon={<MdFingerprint size={20} className={styles.icon} />}
            title='Login'
          />
          <NavRouteButton
            active={location.pathname === '/lock'}
            onClick={() => history.push('/lock')}
            icon={<MdLockOpen size={20} className={styles.icon} />}
            title='Lock'
          />
        </Box>
      ) : (
        <Box>
          <IconButton onClick={toggleDrawer}>
            <MdMenu />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  navRoute_link: {
    padding: '15px',
    margin: '0 5px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    textDecoration: 'none',
  },
  icon: {
    marginRight: '5px',
  },
}));
