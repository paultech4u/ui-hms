import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

export function PasswordInput(props) {
  return <TextField type='password' id='password' {...props} />;
}

export function TextInput(props) {
  const styles = useStyles();

  return <TextField {...props} type='text' className={styles.textInput} />;
}

const useStyles = makeStyles({
  textInput: {
    '& .MuiOutlinedInput-input': {
      backgroundColor: '#e1bee7',
    },
  },
});
