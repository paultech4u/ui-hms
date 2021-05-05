/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useIsDesktop } from './hooks';

import { Box, Paper, makeStyles, Typography } from '@material-ui/core';

export function Footer(params) {
  const classes = useStyles();
  const isDesktop = useIsDesktop();
  return (
    <Paper className={classes.footer_container}>
      <Box display='flex' justifyContent={isDesktop ? 'flex-end' : 'center'}>
        <a title='Privacy Policy'>Privacy Policy</a>
        <a title='Term of Use'>Term of Use</a>
      </Box>
      <Box textAlign='center' marginTop={5}>
        <Typography variant='caption'>
          Copyright@2021 HMS, Hospital Management System.
        </Typography>
      </Box>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  footer_container: {
    flex: 1,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& a': {
      marginRight: 10,
      cursor: 'pointer',
      textDecoration: 'none',
      color: theme.palette.common.black,
    },
    '& a:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}));
