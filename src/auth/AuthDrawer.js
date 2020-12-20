import React from 'react';
import clsx from 'clsx';
import { useIsDesktop } from '../hooks';
import { Box, makeStyles, Drawer } from '@material-ui/core';
import { NavRouteButton } from './AuthCommon';
import { MdFingerprint, MdPersonAdd, MdLockOpen } from 'react-icons/md';

export function DrawerBar(props) {
  const { open, close } = props;
  const styles = useStyles();
  const isDesktop = useIsDesktop();
  return (
    <Drawer
      anchor='right'
      open={isDesktop === true ? false : open}
      onClose={close}>
      <Box display='flex' flex={1} flexDirection='column' paddingTop={10}>
        <NavRouteButton
          active={false}
          icon={<MdPersonAdd size={20} className={styles.icon} />}
          title='Register'
        />
        <NavRouteButton
          active={true}
          icon={<MdFingerprint size={20} className={styles.icon} />}
          title='Login'
        />
        <NavRouteButton
          active={false}
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
