import React from 'react';
import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
// import { Loading } from '../common/Loading';

/**
 *
 * @param {import("@material-ui/core").CardProps} props
 * @returns
 */
export function DashboardItem(props) {
  return (
    <Card {...props}>
      <CardHeader
        title={props.title}
        subheader={props.subheader}
        action={
          <IconButton size='small' onClick={props.onClick}>
            {props.icon}
          </IconButton>
        }
      />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
