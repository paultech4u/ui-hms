import React from 'react';
import clsx from 'clsx';
import MOCK_DATA from './MOCK_DATA.json';
import { FixedSizeList } from 'react-window';
import scrollbarWidth from '../common/ScrollbarWidth';
import { Box, TextField, makeStyles, TableCell } from '@material-ui/core';
import { useTable, useGlobalFilter, useBlockLayout } from 'react-table';

function AppointmentTable(props) {
  const classes = useStyles();
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => MOCK_DATA, []);
  const scrollbarSize = React.useMemo(() => scrollbarWidth(), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    totalColumnsWidth,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useBlockLayout
  );

  const { globalFilter } = state;

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Box>
      <Box overflow='auto'>
        <Box {...getTableProps()} className={classes.table}>
          <Box className={classes.tableHead}>
            {headerGroups.map((headerGroup) => (
              <Box {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Box
                    {...column.getHeaderProps({
                      className: classes.tableHead_data,
                    })}>
                    {column.render('Header')}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Box {...getTableBodyProps()}>
            <FixedSizeList
              height={100}
              itemSize={35}
              itemCount={rows.length}
              width={totalColumnsWidth + scrollbarSize}>
              {({ index, style }) => {
                const row = rows[index];
                prepareRow(row);
                return (
                  <Box
                    {...row.getRowProps({
                      ...style,
                    })}>
                    {row.cells.map((cell) => {
                      return (
                        <Box
                          {...cell.getCellProps({
                            className: clsx(classes.tableBody_data, {
                              [classes.tableBody_data_statusPending]:
                                cell.value === 'Pending',
                              [classes.tableBody_data_statusComfirmed]:
                                cell.value === 'Comfirmed',
                            }),
                          })}>
                          {cell.render('Cell')}
                        </Box>
                      );
                    })}
                  </Box>
                );
              }}
            </FixedSizeList>
          </Box>
        </Box>
      </Box>
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
      placeholder='Search...'
      value={filter || ''}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  table: {
    display: 'inline-block',
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
    padding: 5,
    textAlign: 'center',
    color: theme.palette.common.white,
  },
  tableBody_data: {
    padding: 5,
  },
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
    width: 200,
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
