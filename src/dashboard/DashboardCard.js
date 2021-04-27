import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';

/**
 *
 * @param {import("@material-ui/core").CardProps} props
 * @returns
 */
export function CardItem(props) {
  return (
    <Card {...props}>
      <CardHeader
        title={props.title}
        subheader={props.subheader}
        action={
          <IconButton size='small'>
            <MdMoreHoriz />
          </IconButton>
        }
      />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
