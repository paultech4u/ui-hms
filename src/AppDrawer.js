import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Collapse,
} from '@material-ui/core';
import { DrawerWidth } from './constants';
import { useIsDesktop } from './hooks';
import { deepPurple } from '@material-ui/core/colors';
import {
  MdExpandLess,
  MdExpandMore,
  MdPerson,
  MdSettings,
} from 'react-icons/md';

import Logo from './logo.svg';

function AppDrawer(props) {
  const { drawer, handleDrawerClose } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawerCollapesItem = (index) => {
    switch (index) {
      case 1:
        setIsOpen((prev) => !prev);
        break;
      default:
        break;
    }
  };

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
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        paddingY={10}>
        <img src={Logo} alt='Logo' width={35} height={35} />
        {drawer && <Typography variant='h5'>Creative</Typography>}
      </Box>
      <Divider />
      <Box>
        <List>
          <ListItem button onClick={() => toggleDrawerCollapesItem(1)}>
            <ListItemIcon>
              <Avatar className={clsx(styles.avatar, styles.avatar_small)}>
                A
              </Avatar>
            </ListItemIcon>
            <ListItemText primary='Admin' />
            {true ? <MdExpandMore /> : <MdExpandLess />}
          </ListItem>
          <DrawerRouteItemCollapes open={isOpen}>
            <DrawerRouteItem icon={<MdPerson size={20} />} label='Profile' />
            <DrawerRouteItem icon={<MdSettings size={20} />} label='Setting' />
          </DrawerRouteItemCollapes>
        </List>
      </Box>
      <Divider />
      <Box>
        <List></List>
      </Box>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  drawer: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
};

export default AppDrawer;

function DrawerRouteItem(props) {
  const { icon, label, ...others } = props;
  return (
    <ListItem component='li' button {...others}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}

DrawerRouteItem.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
};

function DrawerRouteItemCollapes(props) {
  const { children, open } = props;
  return (
    <Collapse in={open} timeout='auto' unmountOnExit>
      {children}
    </Collapse>
  );
}

DrawerRouteItemCollapes.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
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
    width: 70,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  avatar_small: {
    width: 25,
    height: 25,
  },
}));
