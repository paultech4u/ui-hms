import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

/**
 *
 * custom password textfield
 * @param {import("@material-ui/core").TextFieldProps} props
 *
 */
export function PasswordInput(props) {
  return <TextField type='password' id='password' {...props} />;
}

/**
 * custom text value textfield
 * @param {import("@material-ui/core").TextFieldProps} props
 * @returns
 */
export function TextInput(props) {
  return <TextField {...props} type='text' />;
}

const useStyles = makeStyles({
  textInput: {
    '& .MuiOutlinedInput-input': {
      backgroundColor: '#e1bee7',
    },
  },
});
