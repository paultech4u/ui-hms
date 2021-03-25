import React from 'react';
import PropTypes from "prop-types";
import { Box, Typography, makeStyles, Tabs, Tab, AppBar} from '@material-ui/core';
import { CustomCard } from '../common/Card';
import clsx from 'clsx';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function AddUser(props) {
  const styles = useStyles();

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <CustomCard elevation={4}>
      <div className={clsx(styles.addUser_header_title)}>
        <Typography>Build Your Profile</Typography>
        <Typography>This information will let them know about you</Typography>
      </div>
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleTabChange}>
            <Tab label="About" {...a11yProps(0)}/>
            <Tab label="Account" {...a11yProps(1)}/>
            <Tab label="Address" {...a11yProps(2)}/>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>About</TabPanel>
        <TabPanel value={value} index={1}>Account</TabPanel>
        <TabPanel value={value} index={2}>Address</TabPanel>
      </div>
    </CustomCard>
  );
}

const useStyles = makeStyles((theme) => ({
  addUser_header_title: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0',
  },  
}));

export default AddUser;
