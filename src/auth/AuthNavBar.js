/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { MdFingerprint, MdPersonAdd, MdLockOpen } from 'react-icons/md';

export function NavBar(props) {
  const styles = useStyles();
  return (
    <Box display='flex' flex={1} justifyContent='space-between' marginX={220}>
      <Box flex={1}>
        <Box display='flex' fontSize={19}>
          <a href='' className={styles.link}>
            Login Page
          </a>
        </Box>
      </Box>
      <Box display='flex' flex={1} justifyContent='center'>
        <NavRouteButton
          icon={<MdPersonAdd size={20} className={styles.icon} />}
          title='Register'
        />
        <NavRouteButton
          icon={<MdFingerprint size={20} className={styles.icon} />}
          title='Login'
        />
        <NavRouteButton
          icon={<MdLockOpen size={20} className={styles.icon} />}
          title='Lock'
        />
      </Box>
    </Box>
  );
}

function NavRouteButton(props) {
  const styles = useStyles();
  return (
    <Box
      display='flex'
      alignItems='center'
      fontSize={16}
      borderRadius='borderRadius'
      {...props}>
      <a className={styles.link}>
        {props.icon}
        <Box>{props.title}</Box>
      </a>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
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
