import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Fab,
  Box,
  Badge,
  AppBar,
  Avatar,
  Button,
  Toolbar,
  TextField,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { useIsMobile } from './hooks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutAction } from './auth/AuthStoreSlice';
import { MdSort, MdSearch, MdMoreVert, MdNotifications } from 'react-icons/md';

function AppNavbar(props) {
  const styles = useStyles();
  const history = useHistory();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const { drawer, handleDrawerOpen } = props;

  const handleLogout = () => {
    dispatch(logoutAction());
    history.push('/login');
    return;
  };

  return (
    <AppBar
      elevation={0}
      position='static'
      color='transparent'
      className={clsx(styles.appBar_nav, {
        [styles.appBar_nav_shift]: drawer,
      })}>
      <Toolbar className={styles.appBar_nav_toolbar}>
        {isMobile ? (
          <React.Fragment>
            <Box display='flex' alignItems='center' marginLeft={7}>
              <Fab size='small' onClick={handleDrawerOpen}>
                {drawer ? <MdSort size={20} /> : <MdMoreVert size={20} />}
              </Fab>
            </Box>
            <Box display='flex' alignItems='center'>
              <Box display='flex' alignItems='center'>
                <TextField variant='standard' placeholder='Search...' />
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
                <Button
                  size='small'
                  color='primary'
                  variant='contained'
                  onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box>
              <IconButton aria-haspopup onClick={handleDrawerOpen}>
                <MdSort size={20} />
              </IconButton>
            </Box>
            <Box marginLeft={8} display='flex'>
              <TextField
                size='small'
                variant='outlined'
                placeholder='Search...'
              />
            </Box>
            <Box marginX={5}>
              <Avatar style={{ width: 30, height: 30 }}>A</Avatar>
            </Box>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = {
  drawer: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  appBar_nav: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& .MuiBox-root-690': {
      marginLeft: 0,
    },
  },
  appBar_nav_shift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar_nav_toolbar: {
    justifyContent: 'space-between',
  },
}));

export default AppNavbar;
