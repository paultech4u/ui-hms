import React from 'react';
import { TextField } from '@material-ui/core';

export function PasswordInputField(props) {
  return <TextField type='password' id='password' {...props} />;
}

export function TextInputField(props) {
  return <TextField type='text' InputLabelProps={{shrink: true}} {...props} />;
}
