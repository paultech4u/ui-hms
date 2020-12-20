/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useIsDesktop } from '../hooks';

export function Footer(params) {
  const isDesktop = useIsDesktop();
  return (
    <Box
      display='flex'
      flex={1}
      justifyContent='space-between'
      marginX={isDesktop ? 150 : 10}
      flexDirection={isDesktop ? 'row' : 'column'}>
      <Box display='flex' justifyContent={isDesktop ? 'flex-end' : 'center'}>
        <NavRouteButton title='Home' />
        <NavRouteButton title='Blog' />
      </Box>
      <Box textAlign='center' marginTop={5}>
        <Typography>@2020 HMS, Hospital Management System.</Typography>
      </Box>
    </Box>
  );
}

export function NavRouteButton(props) {
  const { title, ...others } = props;
  const styles = useStyles(props);
  return (
    <Box
      display='flex'
      alignItems='center'
      fontSize={16}
      marginX={8}
      borderRadius='borderRadius'
      {...others}>
      <a href='' className={styles.navRoute_link}>
        <Box>{title}</Box>
      </a>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  navRoute_link: {
    margin: '0 5px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    textDecoration: 'none',
  },
  textfield: {
    width: '35ch',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));
