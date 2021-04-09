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
  MdDashboard,
  MdPeople,
  // MdPersonAdd,
} from 'react-icons/md';
import { ImLab } from 'react-icons/im';
import { useHistory } from 'react-router-dom';
import { BiHotel, BiRadioCircle } from 'react-icons/bi';
import { FaUserMd, FaWheelchair, FaFirstAid } from 'react-icons/fa';

import Logo from './logo.svg';

function AppDrawer(props) {
  const { drawer, handleDrawerClose } = props;
  const history = useHistory();

  const [isOpen, setIsOpen] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const toggleDrawerCollapesItem = (index) => {
    switch (index) {
      case 1:
        setIsOpen({ 1: !isOpen[1] });
        break;
      case 2:
        setIsOpen({ 2: !isOpen[2] });
        break;
      case 3:
        setIsOpen({ 3: !isOpen[3] });
        break;
      case 4:
        setIsOpen({ 4: !isOpen[4] });
        break;
      case 5:
        setIsOpen({ 5: !isOpen[5] });
        break;
      default:
        break;
    }
  };

  React.useLayoutEffect(() => {
    if (drawer === false) {
      setIsOpen((p) => ({
        ...p,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      }));
    }
  }, [drawer]);

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
        {/* collapes item 1 */}
        <List>
          <ListItem
            button
            component='li'
            onClick={() => toggleDrawerCollapesItem(1)}>
            <ListItemIcon>
              <Avatar className={clsx(styles.avatar, styles.avatar_small)}>
                A
              </Avatar>
            </ListItemIcon>
            <ListItemText primary='John Doe' />
            {isOpen[1] ? <MdExpandMore /> : <MdExpandLess />}
          </ListItem>
          <DrawerRouteItemCollapes open={isOpen[1]}>
            <DrawerRouteItem
              icon={<MdPerson size={20} />}
              onClick={() => history.push('/account/profile')}
              label='Profile'
            />
            <DrawerRouteItem icon={<MdSettings size={20} />} label='Setting' />
          </DrawerRouteItemCollapes>
        </List>
      </Box>
      <Divider />
      <Box>
        <List>
          <DrawerRouteItem icon={<MdDashboard size={20} />} label='Dashboard' />
          <DrawerRouteItem icon={<FaUserMd size={20} />} label='Doctors' />
          <DrawerRouteItem icon={<FaWheelchair size={20} />} label='Patients' />
          {/* collapes item list 2 */}
          <ListItem
            button
            component='li'
            onClick={() => toggleDrawerCollapesItem(2)}>
            <ListItemIcon>
              <MdPeople size={20} />
            </ListItemIcon>
            <ListItemText primary='Users' />
            {isOpen[2] ? <MdExpandMore /> : <MdExpandLess />}
          </ListItem>
          <DrawerRouteItemCollapes open={isOpen[2]}>
            <DrawerRouteItem icon={<MdPerson size={20} />} label='Nurses' />
            <DrawerRouteItem icon={<MdPerson size={20} />} label='Pharmacist' />
            <DrawerRouteItem icon={<MdPerson size={20} />} label='Laboraties' />
          </DrawerRouteItemCollapes>
          {/* collapes item 3 */}
          <ListItem
            button
            component='li'
            onClick={() => toggleDrawerCollapesItem(3)}>
            <ListItemIcon>
              <FaFirstAid size={20} />
            </ListItemIcon>
            <ListItemText primary='Medicine' />
            {isOpen[3] ? <MdExpandMore /> : <MdExpandLess />}
          </ListItem>
          <DrawerRouteItemCollapes open={isOpen[3]}>
            <DrawerRouteItem
              icon={<BiRadioCircle size={20} />}
              label='Medicines'
            />
            <DrawerRouteItem
              icon={<BiRadioCircle size={20} />}
              label='Categories'
            />
          </DrawerRouteItemCollapes>
          {/*  collapes item 4 */}
          <ListItem
            button
            component='li'
            onClick={() => toggleDrawerCollapesItem(4)}>
            <ListItemIcon>
              <ImLab size={20} />
            </ListItemIcon>
            <ListItemText primary='Labs' />
            {isOpen[4] ? <MdExpandMore /> : <MdExpandLess />}
          </ListItem>
          <DrawerRouteItemCollapes open={isOpen[4]}>
            <DrawerRouteItem
              icon={<BiRadioCircle size={20} />}
              label='Patients test'
            />
          </DrawerRouteItemCollapes>
          {/* collapes item 5 */}
          <ListItem
            button
            component='li'
            onClick={() => toggleDrawerCollapesItem(5)}>
            <ListItemIcon>
              <BiHotel size={20} />
            </ListItemIcon>
            <ListItemText primary='Beds' />
            {isOpen[5] ? <MdExpandMore /> : <MdExpandLess />}
          </ListItem>
          <DrawerRouteItemCollapes open={isOpen[5]}>
            <DrawerRouteItem
              icon={<BiRadioCircle size={20} />}
              label='Beds Allocation'
            />
            <DrawerRouteItem
              icon={<BiRadioCircle size={20} />}
              label='Beds Categories'
            />
          </DrawerRouteItemCollapes>
        </List>
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
      <ListItemText primary={label} disableTypography />
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
