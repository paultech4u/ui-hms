import React from 'react';
import clsx from 'clsx';
import {
  Box,
  makeStyles,
  IconButton,
  Typography,
  InputAdornment,
  Popover,
} from '@material-ui/core';
import {
  doctorSelector,
  hospitalsSelector,
  specialistSelector,
} from './DashboardStoreSlice';
import {
  PatientCountLineChart,
  PatientCountBarChartBySpec,
} from './DashboardCharts';
import { useSelector } from 'react-redux';
import { MdMoreHoriz } from 'react-icons/md';
import { DashboardItem } from './DashboardCard';
import { TextInput } from '../common/TextInput';
import AppointmentTable from './DashboardApptTable';
import { BsFunnel, BsCalendar } from 'react-icons/bs';
import { DatePickerPopper } from './DashboardDatePicker';
import { AutocompleteInput } from '../common/AutocompleteInput';

function Dashboard(props) {
  const classes = useStyles();
  const doctors = useSelector(doctorSelector.selectAll);
  const hospitals = useSelector(hospitalsSelector.selectAll);
  const specialist = useSelector(specialistSelector.selectAll);

  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleDatePickerOpen = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleDatePickerClose = () => {
   setAnchorEl(null)
  };

  return (
    <Box className={clsx(classes.dashboard_container)}>
      <Box className={clsx(classes.dashboardFilter_container)}>
        <DashboardItem
          title='Hospitals'
          icon={<BsFunnel />}
          className={clsx(
            classes.dashboardItem,
            classes.dashboardItem_adjust,
            classes.dashboardFilter_item
          )}>
          <AutocompleteInput options={hospitals} />
        </DashboardItem>
        <DashboardItem
          title='Doctors'
          icon={<BsFunnel />}
          className={clsx(
            classes.dashboardItem,
            classes.dashboardItem_adjust,
            classes.dashboardFilter_item
          )}>
          <AutocompleteInput options={doctors} />
        </DashboardItem>
        <DashboardItem
          title='Specialist'
          icon={<BsFunnel />}
          className={clsx(
            classes.dashboardItem,
            classes.dashboardItem_adjust,
            classes.dashboardFilter_item
          )}>
          <AutocompleteInput options={specialist} />
        </DashboardItem>
        <DashboardItem
          title='Date'
          icon={<BsFunnel />}
          className={clsx(
            classes.dashboardItem,
            classes.dashboardItem_adjust,
            classes.dashboardFilter_item
          )}>
          <TextInput
            size='small'
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    size='small'
                    ref={anchorEl}
                    onClick={handleDatePickerOpen}>
                    <BsCalendar />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DashboardItem>
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
          onClose={handleDatePickerClose}>
          <DatePickerPopper onDateMenuClose={handleDatePickerClose} />
        </Popover>
      </Box>
      <Box className={clsx(classes.dashboardDetails_container)}>
        {details.map(({ title, data, date }, index) => (
          <DashboardItem
            key={index}
            title={title}
            subheader={date}
            icon={<MdMoreHoriz />}
            className={clsx(
              classes.dashboardItem,
              classes.dashboardItem_adjust,
              classes.dashboardDetails_item
            )}>
            <Typography variant='h4'>{data}</Typography>
          </DashboardItem>
        ))}
      </Box>

      <Box className={classes.dashboardChart_container}>
        <DashboardItem
          title='Patients Count by Week'
          className={clsx(
            classes.dashboardItem,
            classes.dashboardItem_adjust,
            classes.dashboardLineChart
          )}>
          <PatientCountLineChart />
        </DashboardItem>
        <DashboardItem
          title='Patients Count by Week'
          className={clsx(
            classes.dashboardItem,
            classes.dashboardItem_adjust,
            classes.dashboardBarChart
          )}>
          <PatientCountBarChartBySpec />
        </DashboardItem>
      </Box>
      <Box className={classes.dashboardApptTable_container}>
        <DashboardItem
          title='Upcoming Appointments'
          className={clsx(
            classes.dashboardItem,
            classes.dashboardItem_adjust,
            classes.dashboardApptTable
          )}>
          <AppointmentTable />
        </DashboardItem>
      </Box>
    </Box>
  );
}

export default Dashboard;

const useStyles = makeStyles((theme) => ({
  dashboard_container: {
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      padding: 24,
    },
  },
  dashboardItem: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTypography-h5': {
      width: '150px',
      fontSize: '1rem',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    [theme.breakpoints.up('md')]: {
      '& .MuiCardHeader-root': {
        padding: 10,
      },
      '& .MuiTypography-body1': {
        fontSize: '0.5rem',
      },
      '& .MuiTypography-h5': {
        width: '90px',
        fontSize: '0.9rem',
      },
    },
  },
  dashboardFilter_container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
  },
  dashboardFilter_item: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 235,
    },
  },
  dashboardDetails_container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
  },
  dashboardDetails_item: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 235,
      '& .MuiCardContent-root:last-child': {
        paddingBottom: 10,
      },
    },
  },
  dashboardChart_container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
  },
  dashboardLineChart: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 485,
    },
  },
  dashboardBarChart: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 485,
    },
  },
  dashboardItem_adjust: {
    marginRight: 0,
    marginBottom: 15,
    [theme.breakpoints.up('md')]: {
      marginBottom: 15,
      marginRight: 15,
    },
  },
  dashboardApptTable_container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dashboardApptTable: {
    maxWidth: 300,
    [theme.breakpoints.up('md')]: {
      minWidth: 985,
    },
  },
}));

const details = [
  { title: 'Doctors', date: 'updated: 10:20am', data: 40 },
  { title: 'Patients', date: 'updated: 10:20am', data: 100 },
  { title: 'Admitted Patients', date: 'updated: 10:20am', data: 10 },
  { title: 'Bed Occupancy Rate', date: 'updated: 10:19am', data: '14.0%' },
];
