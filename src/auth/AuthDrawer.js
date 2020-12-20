import React from 'react';
import clsx from 'clsx';
import { useIsDesktop } from '../hooks';
import { Box, makeStyles, Drawer } from '@material-ui/core';
import { NavRouteButton } from './AuthCommon';
import { useHistory, useLocation } from 'react-router-dom';
import { MdFingerprint, MdPersonAdd, MdLockOpen } from 'react-icons/md';

export function DrawerBar(props) {
  const { open, close } = props;
  const styles = useStyles();
  const isDesktop = useIsDesktop();
  const location = useLocation();
  const history = useHistory();

  return (
    <Drawer
      anchor='right'
      open={isDesktop === true ? false : open}
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
        <NavRouteButton
          active={location.pathname === '/lock'}
          onClick={() => history.push('/lock')}
          icon={<MdLockOpen size={20} className={styles.icon} />}
          title='Lock'
        />
      </Box>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: '5px',
  },
}));
