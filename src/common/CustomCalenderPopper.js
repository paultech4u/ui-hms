import React from 'react';
import { Paper, Popper } from '@material-ui/core';

/**
 *
 * @param {import('@material-ui/core').PopperProps} props
 * @returns
 */
export function CalenderPopper(props) {
  return (
    <Popper {...props}>
      <Paper elevation={5}>{props.children}</Paper>
    </Popper>
  );
}
