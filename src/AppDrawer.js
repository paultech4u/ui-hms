import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Drawer, makeStyles } from '@material-ui/core';
import { DrawerWidth } from './constants';
import { useIsDesktop } from './hooks';

function AppDrawer(props) {
  const { drawer, handleDrawerClose } = props;
  const styles = useStyles();
  const isDesktop = useIsDesktop();
  return (
    <Drawer
      open={drawer}
      onClose={handleDrawerClose}
      className={clsx(styles.drawer, {
        [styles.drawer_open]: drawer,
        [styles.drawer_close]: !drawer,
      })}
      classes={{
        paper: clsx({
          [styles.drawer_open]: drawer,
          [styles.drawer_close]: !drawer,
        }),
      }}
      anchor={isDesktop ? 'left' : 'right'}
      variant={isDesktop ? 'permanent' : 'temporary'}
      hideBackdrop={isDesktop ? true : false}>
      <Box>Drawer Item</Box>
    </Drawer>
  );
}

export default AppDrawer;

AppDrawer.propTypes = {
  drawer: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
};

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
  drawer_close: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 90,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));
