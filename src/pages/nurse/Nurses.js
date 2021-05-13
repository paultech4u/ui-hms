import React from 'react';
import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import { useGlobalFilter, useRowSelect, useTable } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { MdAdd, MdBlock, MdDone, MdMoreVert } from 'react-icons/md';

function NursesTable(props) {
  const classes = useStyles();
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => MOCK_DATA, []);

  const handleStatus = () => {
    console.log('click');
  };

  const {
    prepareRow,
    headerGroups,
    getTableBodyProps,
    getTableProps,
    rows,
    state,
    setGlobalFilter,
  } = useTable({ data, columns }, useRowSelect, useGlobalFilter, (hooks) =>
    hooks.allColumns.push((columns) => [
      // for doctors selection
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Box>
            <CheckBox {...getToggleAllRowsSelectedProps()} />
          </Box>
        ),
        Cell: ({ row }) => (
          <Box>
            <CheckBox {...row.getToggleRowSelectedProps()} />
          </Box>
        ),
      },
      ...columns,
    ])
  );

  const { globalFilter } = state;

  return (
    <Box p={24}>
      <Card variant='outlined'>
        <CardContent>
          <Box className={classes.actions}>
            <Box className={classes.button_container}>
              {actions.map(({ label, endIcon }, index) => (
                <Button
                  key={index}
                  size='small'
                  color='primary'
                  endIcon={endIcon}
                  variant='contained'
                  className={classes.button}
                  style={{ marginRight: index < 2 ? 7 : 0 }}>
                  {label}
                </Button>
              ))}
            </Box>
            <Box>
              <TableFilterInput
                filter={globalFilter}
                setFilter={setGlobalFilter}
              />
            </Box>
          </Box>
          <Box>
            <Table
              size='small'
              stickyHeader
              {...getTableProps({ className: classes.table })}>
              <TableHead className={classes.th}>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <TableCell
                        {...column.getHeaderProps({ className: classes.td })}>
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
                        <TableCell
                          {...cell.getCellProps({ className: classes.td })}>
                          {cell.render('Cell', { handleStatus })}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NursesTable;

function TableFilterInput(props) {
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

const CheckBox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  return <Checkbox ref={ref} indeterminate={indeterminate} {...rest} />;
});

const actions = [
  {
    label: 'Add New',
    endIcon: <MdAdd />,
    handleClick: () => {},
  },
  {
    label: 'Active',
    endIcon: <MdDone />,
    handleClick: () => {},
  },
  {
    label: 'InActive',
    endIcon: <MdBlock />,
    handleClick: () => {},
  },
];

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: 'collapse',
    border: `1px solid ${theme.palette.divider}`,
    '& $th, $td': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  th: {},
  td: {},
  button: {
    textTransform: 'revert',
  },
  button_container: {
    display: 'flex',
    alignItems: 'center',
  },
  search_container: {},
  actions: {
    display: 'flex',
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
}));

const COLUMNS = [
  { Header: 'First Name', accessor: 'first_name' },
  { Header: 'Last Name', accessor: 'last_name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Phone Number', accessor: 'phone_number' },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value, handleStatus }) => (
      <IconButton size='small' onClick={handleStatus}>
        {value === true ? <MdDone /> : <MdBlock />}
      </IconButton>
    ),
  },
  {
    Header: 'Actions',
    Cell: () => (
      <IconButton size='small'>
        <MdMoreVert />
      </IconButton>
    ),
  },
];
