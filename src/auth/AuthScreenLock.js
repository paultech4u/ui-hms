import React from 'react';
import clsx from 'clsx';
import { AuthCard, PasswordInput, ActionButton } from './AuthCommon';
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';

function LockScreen(props) {
  const styles = useStyles();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <AuthCard>
      <Box display='flex' justifyContent='center' paddingTop={8}>
        <Avatar alt='avatar' className={clsx(styles.avatar_small)}>
          A
        </Avatar>
      </Box>
      <Box padding={10} marginTop={8}>
        <Box textAlign='center'>
          <Typography>Admin</Typography>
        </Box>
        <PasswordInput
          value={formik.values.password}
          onInput={formik.handleChange}
        />
      </Box>
      <Box display='flex' justifyContent='center' marginTop={7} padding={5}>
        <ActionButton onClick={formik.handleSubmit}>Unlock</ActionButton>
      </Box>
    </AuthCard>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar_small: {
    width: '100px',
    height: '100px',
  },
}));

export default LockScreen;
