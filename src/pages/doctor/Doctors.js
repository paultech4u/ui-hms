/* eslint-disable eqeqeq */
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
  TableContainer,
  Typography,
  MenuItem,
  Popover,
  InputAdornment,
  Menu
} from '@material-ui/core';
import {
  useGlobalFilter,
  useRowSelect,
  useTable,
  usePagination,
  useAsyncDebounce,
  useFilters,
} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {
  MdAdd,
  MdBlock,
  MdDone,
  MdFilterList,
  MdMoreVert,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdCached,
} from 'react-icons/md';
import undraw_empty from '../../assets/svg/undraw_empty.svg';
import { useHistory } from 'react-router-dom';

function DoctorsTable(props) {
  const classes = useStyles();
  const history = useHistory()
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => MOCK_DATA, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openRowMenu, setRowMenu] = React.useState(null)
  const openRow = Boolean(openRowMenu)

  const handleTableActions = (index, event) => {
    switch (index) {
      case 0:
        history.push('/doctor/add')
        break;
      case 1:
        setAnchorEl(event.currentTarget);
        break;
      default:
        break;
    }
  };

  // TODO bug fix table row actions
  const handleTableRowActions = (index, event) => {
    if (index == 0) setRowMenu(event.currentTarget);
    // switch (index) {
    //   case 0:
    //     setRowMenu(event.currentTarget);
    //     break;
    //   default:
    //     break;
    // }
  }

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const {
    prepareRow,
    headerGroups,
    getTableBodyProps,
    getTableProps,
    page,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    columns: column,
  } = useTable(
    { data, columns, initialState: { pageSize: 4 } },
    useGlobalFilter,
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) =>
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
        {
          id: 'actions',
          Header: 'Actions',
          Cell: ({ row }) => {
            const id = row.id
            return (
              <React.Fragment>
                <IconButton aria-controls="row-actions" size='small' onClick={(e) => handleTableRowActions(id, e)}>
                  <MdMoreVert />
                </IconButton>
                <Menu id="row-actions" open={openRow} anchorEl={openRowMenu}>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </React.Fragment>
            )
          },
        },
      ])
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <Box p={24}>
      <Card variant='outlined'>
        <CardContent>
          <Box className={classes.actions_container}>
            <Box className={classes.actions}>
              {actions.map(({ label, icon }, index) => (
                <Button
                  key={index}
                  size='small'
                  variant='text'
                  color='primary'
                  startIcon={icon}
                  className={classes.button}
                  onClick={(e) => handleTableActions(index, e)}
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

            <TableColumnFilter
              columns={column}
              anchorEl={anchorEl}
              handleFilterClose={handleFilterClose}
            />
          </Box>
          <Box>
            <TableContainer>
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
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <TableCell
                            {...cell.getCellProps({ className: classes.td })}>
                            {cell.render('Cell')}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {page.length <= 0 && (
            <Box width={1} p={10}>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection='column'>
                <Box>
                  <img
                    src={undraw_empty}
                    alt='no-data'
                    width={50}
                    height={50}
                  />
                </Box>
                <Typography>No results found.</Typography>
              </Box>
            </Box>
          )}
          <Box className={classes.pagination_container}>
            <Box mr={7}>
              <TextField
                select
                size='small'
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}>
                <MenuItem value='4'>4</MenuItem>
                {[10, 20, 50, 80, 100].map((size, index) => (
                  <MenuItem key={index} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <Typography>
                1 - {pageIndex + 1} of {pageOptions.length}
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}>
                <MdKeyboardArrowLeft />
              </IconButton>
              <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
                <MdKeyboardArrowRight />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DoctorsTable;

function TableFilterInput(props) {
  const { filter, setFilter } = props;

  const [value, setValue] = React.useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <TextField
      size='small'
      margin='dense'
      variant='outlined'
      placeholder='Search...'
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

const CheckBox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  return <Checkbox ref={ref} indeterminate={indeterminate} {...rest} />;
});

function TableColumnFilter(props) {
  const classes = useStyles();
  const { columns, anchorEl, handleFilterClose } = props;
  const [selectedColumn, setSelectedColumn] = React.useState('first_name');
  const [column, setColumn] = React.useState({
    filterValue: '',
    setFilter: null,
  });

  const [value, setValue] = React.useState(column.filterValue);

  const [loading, setLoading] = React.useState(false);

  const onChange = useAsyncDebounce((value) => {
    setLoading(false);
    column.setFilter(value || undefined);
  }, 1000);

  React.useEffect(() => {
    if (selectedColumn) {
      switch (selectedColumn) {
        case 'first_name':
          setColumn({
            filterValue: columns[0].filterValue,
            setFilter: columns[0].setFilter,
          });
          break;
        case 'last_name':
          setColumn({
            filterValue: columns[1].filterValue,
            setFilter: columns[1].setFilter,
          });
          break;
        case 'email':
          setColumn({
            filterValue: columns[2].filterValue,
            setFilter: columns[2].setFilter,
          });
          break;
        case 'phone_number':
          setColumn({
            filterValue: columns[3].filterValue,
            setFilter: columns[3].setFilter,
          });
          break;
        case 'status':
          setColumn({
            filterValue: columns[4].filterValue,
            setFilter: columns[4].setFilter,
          });
          break;
        default:
          break;
      }
    }
  }, [selectedColumn, columns]);

  return (
    <Popover
      disablePortal
      placement='bottom'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleFilterClose}>
      <div className={classes.columnFilter_container}>
        <TextField
          select
          label='Columns'
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}>
          {columns.map(({ id }) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label='Value'
          placeholder='Filter value'
          value={value}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {loading && <MdCached />}
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setValue(e.target.value);
            setLoading(true);
            onChange(e.target.value);
          }}
        />
      </div>
    </Popover>
  );
}

const actions = [
  {
    label: 'Add New',
    icon: <MdAdd />,
  },
  {
    label: 'Filters',
    icon: <MdFilterList />,
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
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {},
  search_container: {},
  actions_container: {
    display: 'flex',
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  pagination_container: {
    paddingTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& .MuiInputBase-input': {
      paddingBottom: 0,
    },
  },
  columnFilter_container: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    '& .MuiInputBase-input:first-child': {
      paddingBottom: 0,
    },
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
    Cell: ({ value }) => (
      <>
        {value === true ? (
          <MdDone color='#8256DE' />
        ) : (
          <MdBlock color='#8256DE' />
        )}
      </>
    ),
  },
];
