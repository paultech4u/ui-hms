/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  makeStyles,
  Button,
  Typography,
} from '@material-ui/core';

export function AuthTextInput(props) {
  const styles = useStyles();
  const { value, error, ...others } = props;

  return (
    <TextField
      size='small'
      error={error}
      value={value}
      className={styles.textField}
      {...others}
    />
  );
}

AuthTextInput.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
};

export function AuthPasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const { value, error, ...others } = props;

  const styles = useStyles();

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      size='small'
      error={error}
      value={value}
      name='password'
      className={styles.textField}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton aria-label='toggle-password' onClick={toggleVisibility}>
              <Typography variant='caption' color='primary'>
                {showPassword ? 'SHOW' : 'HIDE'}
              </Typography>
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...others}
    />
  );
}

AuthPasswordInput.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  toggleVisibility: PropTypes.func,
};

export function AuthCard(props) {
  return <Paper {...props}>{props.children}</Paper>;
}

export function AuthButton(props) {
  const { children, ...rest } = props;
  return (
    <Button color='primary' {...rest}>
      {children}
    </Button>
  );
}

export function AuthNavBarLink(props) {
  const { isActive, icon, label, ...others } = props;

  return (
    <Button
      {...others}
      size='small'
      color={isActive ? 'primary' : 'default'}
      variant={isActive ? 'contained' : 'text'}>
      {label}
    </Button>
  );
}

AuthNavBarLink.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '30ch',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));
