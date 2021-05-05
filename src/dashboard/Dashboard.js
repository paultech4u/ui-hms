import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Popper,
  makeStyles,
  IconButton,
  Typography,
  InputAdornment,
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

  const anchorEl = React.useRef(null);
  const [openDatePicker, setDatePicker] = React.useState(false);

  const handleDatePickerOpen = () => {
    setDatePicker((prev) => !prev);
  };

  const handleDatePickerClose = () => {
    setDatePicker((prev) => prev);
  };

  return (
    <Box className={clsx(classes.card_container)}>
      <Box flex={1} display='flex' flexDirection='column'>
        <Box className={clsx(classes.card_item_filter_container)}>
          <DashboardItem
            title='Hospitals'
            icon={<BsFunnel />}
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
            )}>
            <AutocompleteInput options={hospitals} />
          </DashboardItem>
          <DashboardItem
            title='Doctors'
            icon={<BsFunnel />}
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
            )}>
            <AutocompleteInput options={doctors} />
          </DashboardItem>
          <DashboardItem
            title='Specialist'
            icon={<BsFunnel />}
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
            )}>
            <AutocompleteInput options={specialist} />
          </DashboardItem>
          <DashboardItem
            title='Date'
            icon={<BsFunnel />}
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
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
          <Popper
            placement='bottom'
            open={openDatePicker}
            anchorEl={anchorEl.current}
            onDatePickerClose={handleDatePickerClose}>
            <DatePickerPopper />
          </Popper>
        </Box>
        <Box className={classes.card_item_chart_container}>
          <DashboardItem
            title='Patients Count by Week'
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_lineChart
            )}>
            <PatientCountLineChart />
          </DashboardItem>
          <DashboardItem
            title='Patients Count by Week'
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_barChart
            )}>
            <PatientCountBarChartBySpec />
          </DashboardItem>
        </Box>
        <Box>
          <DashboardItem
            title='Upcoming Appointments'
            className={clsx(classes.card_item, classes.card_item_apptTable)}>
            <AppointmentTable />
          </DashboardItem>
        </Box>
      </Box>
      <Box className={clsx(classes.card_item_details_container)}>
        {details.map(({ title, data, date }, index) => (
          <DashboardItem
            key={index}
            title={title}
            subheader={date}
            icon={<MdMoreHoriz />}
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_details
            )}>
            <Typography variant='h4'>{data}</Typography>
          </DashboardItem>
        ))}
      </Box>
    </Box>
  );
}

export default Dashboard;

const useStyles = makeStyles((theme) => ({
  card_container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  },
  card_item: {
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
  card_item_chart_container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      //   justifyContent: 'space-between',
    },
    [theme.breakpoints.up('md')]: {
      flexWrap: 'no-wrap',
      // justifyContent: 'space-between',
    },
  },
  card_item_filter_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      //   justifyContent: 'space-between',
    },
    [theme.breakpoints.up('md')]: {
      flexWrap: 'no-wrap',
      // justifyContent: 'space-between',
    },
  },
  card_item_details_container: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
  card_item_details: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      maxWidth: 150,
      '& .MuiCardContent-root:last-child': {
        paddingBottom: 10,
      },
    },
  },
  card_item_filter: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      maxWidth: 155,
    },
  },
  card_item_lineChart: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 430,
    },
  },
  card_item_barChart: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 220,
    },
  },
  card_item_adjust: {
    marginRight: 0,
    marginBottom: 15,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 15,
      marginRight: 15,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: 15,
      marginRight: 15,
    },
  },
  card_item_apptTable: {
    maxWidth: 300,
    [theme.breakpoints.up('md')]: {
      maxWidth: 667,
    },
    // '& .MuiCardContent-root': {
    //   overflowX: 'auto',
    // },
  },
}));

const details = [
  { title: 'Doctors', date: 'updated: 10:20am', data: 40 },
  { title: 'Patients', date: 'updated: 10:20am', data: 100 },
  { title: 'Admitted Patients', date: 'updated: 10:20am', data: 10 },
  { title: 'Bed Occupancy Rate', date: 'updated: 10:19am', data: '14.0%' },
];
