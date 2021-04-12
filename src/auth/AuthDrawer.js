import React from 'react';
import clsx from 'clsx';
import { useIsDesktop } from '../hooks';
import { Box, makeStyles, Drawer } from '@material-ui/core';
import { NavRouteButton } from './AuthCommon';
import { useHistory, useLocation } from 'react-router-dom';
import { MdFingerprint, MdPersonAdd } from 'react-icons/md';
import { DrawerWidth } from '../constants';

export function DrawerBar(props) {
  const { open, close } = props;
  const styles = useStyles();
  const isDesktop = useIsDesktop();
  const location = useLocation();
  const history = useHistory();

  return (
    <Drawer
      anchor='left'
      open={isDesktop === true ? false : open}
      className={clsx(styles.drawer, { [styles.drawer_open]: open })}
      onClose={close}>
      <Box display='flex' flex={1} flexDirection='column' paddingTop={10}>
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
      </Box>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DrawerWidth,
  },
  drawer_open: {
    width: DrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  icon: {
    marginRight: '5px',
  },
}));
