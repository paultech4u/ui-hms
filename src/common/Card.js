import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper } from '@material-ui/core';
import clsx from 'clsx';

export function CustomCard(props) {
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

CustomCard.propTypes = {
  paperClassName: PropTypes.object,
  elevation: PropTypes.number,
  variant: PropTypes.oneOf(['outlined', 'elevation']),
};
