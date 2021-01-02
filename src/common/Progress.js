import React from 'react';
import { CircularProgress, Fade } from '@material-ui/core';

export function Progress(props) {
  return (
    <Fade unmountOnExit {...props}>
      <CircularProgress color='inherit' size={20} />
    </Fade>
  );
}
