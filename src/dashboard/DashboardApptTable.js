import React from 'react';
import clsx from 'clsx';
import MOCK_DATA from './MOCK_DATA.json';
import { FixedSizeList } from 'react-window';
import scrollbarWidth from '../common/ScrollbarWidth';
import { Box, TextField, makeStyles } from '@material-ui/core';
import { useTable, useGlobalFilter, useBlockLayout } from 'react-table';
import { useIsDesktop } from '../hooks';

function AppointmentTable(props) {
  const classes = useStyles();
  const isDesktop = useIsDesktop();
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
      <Box
        display={isDesktop ? 'flex' : 'block'}
        justifyContent={isDesktop ? 'center' : 'flex-start'}
        overflow='auto'>
        <Box {...getTableProps()} className={classes.table}>
          <Box className={classes.th}>
            {headerGroups.map((headerGroup) => (
              <Box {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Box
                    {...column.getHeaderProps({
                      className: classes.td,
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
                    {row.cells.map((cell) => (
                      <Box
                        {...cell.getCellProps({
                          className: clsx(classes.tr_cell, {
                            [classes.tr_cell_pending]: cell.value === 'Pending',
                            [classes.tr_cell_comfirm]:
                              cell.value === 'Comfirmed',
                          }),
                        })}>
                        {cell.render('Cell')}
                      </Box>
                    ))}
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
    '& $th, $td ': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  th: {
    backgroundColor: theme.palette.primary.main,
  },
  td: {
    padding: 5,
    textAlign: 'center',
    color: theme.palette.common.white,
  },
  tr_cell: {
    padding: 5,
  },
  tr_cell_pending: {
    color: theme.palette.warning.main,
  },
  tr_cell_comfirm: {
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
