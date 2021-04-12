import React from 'react';
import { TextField } from '@material-ui/core';

export function PasswordInput(props) {
  return <TextField type='password' id='password' {...props} />;
}

export function TextInput(props) {
  return <TextField type='text' {...props} />;
}
