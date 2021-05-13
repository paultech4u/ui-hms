import React from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useTable } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';

function DoctorsTable(props) {
  const classes = useStyles();
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => MOCK_DATA, []);

  const {
    prepareRow,
    headerGroups,
    getTableBodyProps,
    getTableProps,
    rows,
    state,
  } = useTable({ data, columns });

  return (
    <Table {...getTableProps({ className: classes.table })}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <TableCell {...cell.getCellProps}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default DoctorsTable;

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: 'collapse',
    border: `1px solid ${theme.palette.divider}`,
    '& .th td': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  th: {},
  td: {},
}));

const COLUMNS = [
  { Header: 'First Name', accessor: 'first_name' },
  { Header: 'Last Name', accessor: 'last_name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Phone Number', accessor: 'phone_number' },
  { Header: 'Status', accessor: 'status' },
];
