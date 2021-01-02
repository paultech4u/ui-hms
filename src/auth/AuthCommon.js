/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { MdVisibility, MdVisibilityOff, MdCancel } from 'react-icons/md';

export function TextInput(props) {
  const {
    value,
    cleartext,
    error,
    errortext,
    showClearIcon,
    ...others
  } = props;

  const styles = useStyles();
  return (
    <TextField
      error={error}
      value={value}
      className={styles.textfield}
      helperText={errortext}
      {...others}
      InputProps={{
        endAdornment: showClearIcon ? (
          <InputAdornment>
            <IconButton aria-label='clear-text' onClick={cleartext}>
              {!!value && showClearIcon ? <MdCancel /> : null}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  cleartext: PropTypes.func,
  showClearIcon: PropTypes.bool,
  error: PropTypes.bool,
  errortext: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
};

export function PasswordInput(props) {
  const [isVisible, setIsVisible] = useState(false);

  const { value, errortext, error, ...others } = props;

  const styles = useStyles();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TextField
      error={error}
      id='password'
      placeholder='Enter password'
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
      {...others}
    />
  );
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  isVisible: PropTypes.bool,
  error: PropTypes.bool,
  errortext: PropTypes.string,
  toggleVisibility: PropTypes.func,
};

export function AuthCard(props) {
  const { children, cardContentClass, ...others } = props;
  return (
    <Box {...others}>
      <Paper elevation={3} className={clsx(props.paperClassName)}>
        {children}
      </Paper>
    </Box>
  );
}

AuthCard.propTypes = {
  paperClassName: PropTypes.object,
};

export function ActionButton(props) {
  return (
    <Button variant='contained' color='primary' {...props}>
      {props.children}
    </Button>
  );
}

export function NavRouteButton(props) {
  const { active, icon, title, ...others } = props;
  const styles = useStyles(props);
  return (
    <Box
      display='flex'
      alignItems='center'
      fontSize={16}
      marginX={8}
      bgcolor={active ? 'primary.main' : null}
      borderRadius='borderRadius'
      {...others}>
      <a className={styles.navRoute_link}>
        {icon}
        <Box>{title}</Box>
      </a>
    </Box>
  );
}

NavRouteButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  navRoute_link: {
    padding: '15px',
    margin: '0 5px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    color: (props) =>
      props.active ? theme.palette.common.white : theme.palette.common.black,
    textDecoration: 'none',
  },
  textfield: {
    width: '35ch',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));
