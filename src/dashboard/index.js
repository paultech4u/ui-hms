import React from 'react';
import { Box } from '@material-ui/core';
import { NotifitionAlert } from '../common/Alert';
import { useSelector } from 'react-redux';

function Dashboard(props) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated === true) {
      setOpenAlert((p) => !p);
    }
  }, [isAuthenticated]);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Box>
      <NotifitionAlert
        open={openAlert}
        severity='success'
        onClose={handleAlertClose}>
        Login Successful
      </NotifitionAlert>
    </Box>
  );
}

export default Dashboard;
