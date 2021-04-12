import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

export function CustomCard(props) {
  const { children, elevation, variant, cardContentClass, ...others } = props;
  return (
    <Paper elevation={elevation} variant={variant} {...others}>
      {children}
    </Paper>
  );
}

CustomCard.propTypes = {
  elevation: PropTypes.number,
  variant: PropTypes.oneOf(['outlined', 'elevation']),
};
