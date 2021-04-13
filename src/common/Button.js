import React from 'react';
import { Button, styled } from '@material-ui/core';

export function StyledButton(props) {
  return <CustomButton {...props}>{props.children}</CustomButton>;
}

const CustomButton = styled(Button)({
  height: 30,
  borderRadius: 20,
  textTransform: 'revert',
});
