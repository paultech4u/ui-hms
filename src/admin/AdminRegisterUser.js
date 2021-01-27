import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { CustomCard } from '../common/Card';
import clsx from 'clsx';

function AddUser(props) {
  const styles = useStyles();
  return (
    <CustomCard elevation={4}>
      <Box className={clsx(styles.addUser_header_title)}>
        <Typography>Build Your Profile</Typography>
        <Typography>This information will let them know about you</Typography>
      </Box>
      <Box className={clsx(styles.addUser_header_tab)}>
        {['About', 'Account', 'Address'].map((value, index) => (
          <Box key={index}>
            <Typography variant='caption'>{value}</Typography>
          </Box>
        ))}
      </Box>
    </CustomCard>
  );
}

const useStyles = makeStyles((theme) => ({
  addUser_header_title: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0',
  },
  addUser_header_tab: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 9px',
    background: theme.palette.grey[200],
  },
}));

export default AddUser;
