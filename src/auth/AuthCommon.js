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
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export function AuthTextInput(props) {
  const { value, error, errortext, ...others } = props;
  const styles = useStyles();

  return (
    <TextField
      error={error}
      value={value}
      className={styles.text_field}
      helperText={errortext}
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
      error={error}
      id='password'
      placeholder='*******'
      type={showPassword ? 'text' : 'password'}
      value={value}
      helperText={errortext}
      className={styles.text_field}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton aria-label='toggle-password' onClick={toggleVisibility}>
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
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
        elevation={elevation}
        variant={variant}
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
  text_field: {
    width: '35ch',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));
