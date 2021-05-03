import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  makeStyles,
} from '@material-ui/core';
import MOCK_DATA from './MOCK_DATA.json';
import { useTable, useGlobalFilter } from 'react-table';
import clsx from 'clsx';

function AppointmentTable(props) {
  const classes = useStyles();
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Box>
      <Table {...getTableProps()} className={classes.table}>
        <TableHead className={classes.tableHead}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps({
                    className: classes.tableHead_data,
                  })}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps({
                  onClick: () => alert(`i was click ${index}`),
                })}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      {...cell.getCellProps({
                        className: clsx(classes.tableBody_data, {
                          [classes.tableBody_data_statusPending]:
                            cell.value === 'Pending',
                          [classes.tableBody_data_statusComfirmed]:
                            cell.value === 'Comfirmed',
                        }),
                      })}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default AppointmentTable;

function GlobalFilter(props) {
  const { filter, setFilter } = props;
  return (
    <TextField
      size='small'
      margin='dense'
      variant='outlined'
      placeholder="Search..."
      value={filter || ''}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  table: {
    borderRadius: '20px',
    borderCollapse: 'collapse',
    border: `1px solid ${theme.palette.divider}`,
    '& $tableHead_data, $tableBody_data ': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
  tableHead_data: {
    textAlign: 'center',
    color: theme.palette.common.white,
  },
  tableBody_data: {},
  tableBody_data_statusPending: {
    color: theme.palette.warning.main,
  },
  tableBody_data_statusComfirmed: {
    color: theme.palette.success.main,
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
    Header: 'Patient ID',
    accessor: 'patient_id',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];
