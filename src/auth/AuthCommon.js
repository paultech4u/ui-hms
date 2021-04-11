/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  makeStyles,
  Button,
  Typography,
} from '@material-ui/core';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export function AuthTextInput(props) {
  const { value, error, errortext, ...others } = props;
  const styles = useStyles();

  return (
    <TextField
      size='small'
      error={error}
      value={value}
      helperText={errortext}
      className={styles.text_field}
      {...others}
    />
  );
}

AuthTextInput.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  errortext: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
};

export function AuthPasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const { value, errortext, error, ...others } = props;

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
      placeholder='*****'
      helperText={errortext}
      className={styles.text_field}
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
  errortext: PropTypes.string,
  toggleVisibility: PropTypes.func,
};

export function AuthCard(props) {
  const { children, elevation, variant, cardContentClass, ...others } = props;
  return (
    <Box {...others}>
      <Paper
        variant={variant}
        elevation={elevation}
        className={clsx(props.paperClassName)}>
        {children}
      </Paper>
    </Box>
  );
}

AuthCard.propTypes = {
  paperClassName: PropTypes.object,
  elevation: PropTypes.number,
  variant: PropTypes.oneOf(['outlined', 'elevation']),
};

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
  text_field: {
    width: '30ch',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));
