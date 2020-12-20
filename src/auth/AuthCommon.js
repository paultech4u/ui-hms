import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  makeStyles,
} from '@material-ui/core';

import { MdVisibility, MdVisibilityOff, MdCancel } from 'react-icons/md';

export function TextInput(props) {
  const { value, cleartext, error, errortext } = props;
  const styles = useStyles();
  return (
    <TextField
      error={error}
      value={value}
      className={styles.textfield}
      helperText={errortext}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton aria-label='clear-text' onClick={cleartext}>
              {value.length ? <MdCancel /> : null}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export function PasswordInput(props) {
  const [isVisible, setIsVisible] = useState(false);

  const { value, errortext, error } = props;

  const styles = useStyles();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TextField
      error={error}
      id='password'
      label='Enter Password'
      type={isVisible ? 'text' : 'password'}
      value={value}
      helperText={errortext}
      className={styles.textfield}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton aria-label='toggle-password' onClick={toggleVisibility}>
              {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export function AuthCard(props) {
  const { children, ...others } = props;
  const styles = useStyles();
  return (
    <Box>
      <Box>
        <Paper className={styles.card} {...others}>
          {children}
        </Paper>
      </Box>
    </Box>
  );
}

export function ActionButton(props) {
  return (
    <Button variant='contained' color='primary' {...props}>
      {props.children}
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '10px',
  },
  textfield: {
    width: '40ch',
  },
}));
