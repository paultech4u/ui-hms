import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Fab,
  Box,
  Toolbar,
  TextField,
  Badge,
  IconButton,
  makeStyles,
  MenuList,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
} from '@material-ui/core';
import {
  MdSort,
  MdSearch,
  MdNotifications,
  MdPerson,
  MdMoreVert,
} from 'react-icons/md';
import { useIsDesktop } from './hooks';
import { useDispatch } from 'react-redux';
import { logout } from './auth/AuthLoginStoreSlice';

function AppNavbar(props) {
  const { drawer, handleDrawerOpen } = props;

  const ProfileMenuRef = useRef(null);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setOpenProfileMenu((prevmenu) => !prevmenu);
  };

  const toggleProfileMenuClose = () => {
    setOpenProfileMenu(false);
    return;
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(false));
    setOpenProfileMenu(false);
    return;
  };

  const isDesktop = useIsDesktop();
  const styles = useStyles();

  return (
    <AppBar
      color='transparent'
      position='static'
      elevation={0}
      className={clsx(styles.appBarNav, { [styles.appBarNav_shift]: drawer })}>
      <Toolbar className={styles.appBarNav_toolbar}>
        {isDesktop ? (
          <>
            <Box display='flex' alignItems='center' marginLeft={7}>
              <Fab size='small' onClick={handleDrawerOpen}>
                {drawer ? <MdSort size={20} /> : <MdMoreVert size={20} />}
              </Fab>
              <Box marginLeft={8}>
                <Button variant='text'>Dashboard</Button>
              </Box>
            </Box>
            <Box display='flex' alignItems='center'>
              <Box display='flex' alignItems='center'>
                <TextField variant='standard' placeholder='Search' />
                <Box display='flex' alignItems='center'>
                  <Fab size='small'>
                    <MdSearch size={20} />
                  </Fab>
                </Box>
              </Box>
              <Box paddingLeft={8}>
                <IconButton>
                  <Badge color='primary' badgeContent={10}>
                    <MdNotifications />
                  </Badge>
                </IconButton>
              </Box>
              <Box marginX={7}>
                <IconButton
                  ref={ProfileMenuRef}
                  aria-controls={
                    openProfileMenu ? 'profile-menu-list' : undefined
                  }
                  aria-haspopup='true'
                  onClick={toggleProfileMenu}>
                  <MdPerson />
                </IconButton>
              </Box>
              <ProfileMenu
                open={openProfileMenu}
                anchorRef={ProfileMenuRef}
                handleLogout={handleLogout}
                handleMenuClose={toggleProfileMenuClose}
              />
            </Box>
          </>
        ) : (
          <>
            <Box marginLeft={8} display='flex'>
              <Box paddingRight={7}>
                <IconButton color='inherit' size='medium'>
                  <MdSearch size={20} />
                </IconButton>
              </Box>
              <Button variant='text'>Dashboard</Button>
            </Box>
            <Box marginRight={8}>
              <IconButton aria-haspopup onClick={handleDrawerOpen}>
                <MdSort size={20} />
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = {
  drawer: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};

function ProfileMenu(props) {
  const { open, anchorRef, handleMenuClose, handleLogout } = props;
  return (
    <Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement='bottom-end'
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-end' ? 'left center' : 'right top',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList autoFocusItem={open} id='profile-menu-list'>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  appBarNav: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarNav_shift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarNav_toolbar: {
    justifyContent: 'space-between',
  },
}));

export default AppNavbar;
