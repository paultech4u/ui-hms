import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import MOCk_DATA from './MOCK_DATA.json';
import { useTable } from 'react-table';

function AppointmentTable(props) {
  const classes = useStyles();
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => MOCk_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Table {...getTableProps()}>
      <TableHead className={classes.tableHead}>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderGroupProps}>
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
                <TableCell {...cell.getCellProps()}>
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

export default AppointmentTable;

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    '& :first-child': {
      color: theme.palette.common.white,
    },
  },
}));

const COLUMNS = [
  {
    Header: 'Doctor Name',
    accessor: 'doctor_name',
  },
  {
    Header: 'Specialization',
    accessor: 'specialization',
  },
  {
    Header: 'Date & Time',
    accessor: 'date_and_time',
  },
  {
    Header: 'Petient ID',
    accessor: 'petient_id',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];
