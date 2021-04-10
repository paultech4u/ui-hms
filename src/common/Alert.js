import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

let vertical = 'bottom';
let horizontal = 'left';

export function NotifitionAlert(props) {
  const { open, onClose, severity } = props;
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      key={vertical + horizontal}
      autoHideDuration={2000}>
      <Alert
        onClose={onClose}
        elevation={6}
        severity={severity}
        variant='filled'>
        {props.children}
      </Alert>
    </Snackbar>
  );
}

NotifitionAlert.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  severity: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};
