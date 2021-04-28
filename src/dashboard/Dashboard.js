import React from 'react';
import clsx from 'clsx';
import { CardItem } from './DashboardCard';
import {
  doctorSelector,
  hospitalsSelector,
  specialistSelector,
} from './DashboardStoreSlice';
import { AutocompleteInput } from '../common/AutocompleteInput';
import { useSelector } from 'react-redux';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { PatientChart } from './DashboardCharts';

function Dashboard(props) {
  const classes = useStyles();
  const hospitals = useSelector(hospitalsSelector.selectAll);
  const doctors = useSelector(doctorSelector.selectAll);
  const specialist = useSelector(specialistSelector.selectAll);

  return (
    <Box className={clsx(classes.card_container)}>
      <Box flex={1} display='flex' flexDirection='column'>
        <Box className={clsx(classes.card_item_filter_container)}>
          <CardItem
            title='Hospitals'
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
            )}>
            <AutocompleteInput options={hospitals} />
          </CardItem>
          <CardItem
            title='Doctors'
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
            )}>
            <AutocompleteInput options={doctors} />
          </CardItem>
          <CardItem
            title='Specialist'
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
            )}>
            <AutocompleteInput options={specialist} />
          </CardItem>
          <CardItem
            title='Date'
            className={clsx(
              classes.card_item,
              classes.card_item_adjust,
              classes.card_item_filter
            )}>
            <AutocompleteInput options={specialist} />
          </CardItem>
        </Box>
        <Box>
          <CardItem
            title='Patients Count by Week'
            className={clsx(classes.card_item, classes.card_item_chart_line)}>
            <PatientChart />
          </CardItem>
        </Box>
      </Box>
      <Box
        className={clsx(
          classes.card_item_adjust,
          classes.card_item_details_container
        )}>
        <CardItem
          title='Doctors'
          subheader='updated: 10:20am'
          className={clsx(
            classes.card_item,
            classes.card_item_adjust,
            classes.card_item_details
          )}>
          <Typography variant='h4'>40</Typography>
        </CardItem>
        <CardItem
          title='Patients'
          subheader='updated: 1:20pm'
          className={clsx(
            classes.card_item,
            classes.card_item_adjust,
            classes.card_item_details
          )}>
          <Typography variant='h4'>100</Typography>
        </CardItem>
        <CardItem
          title='Admitted Patients'
          subheader='updated: 1:20pm'
          className={clsx(
            classes.card_item,
            classes.card_item_adjust,
            classes.card_item_details
          )}>
          <Typography variant='h4'>10</Typography>
        </CardItem>
        <CardItem
          title='Bed Occupancy Rate'
          subheader='updated: 1:20pm'
          className={clsx(
            classes.card_item,
            classes.card_item_adjust,
            classes.card_item_details
          )}>
          <Typography variant='h4'>14.0%</Typography>
        </CardItem>
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
      justifyContent: 'space-between',
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
      width: 360,
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
      width: 150,
    },
  },
  card_item_chart_line: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 430,
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
}));
