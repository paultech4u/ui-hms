import React from 'react';
import { Box } from '@material-ui/core';
import { NotifitionAlert } from '../common/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { successfulAction } from '../auth/AuthStoreSlice';

function Dashboard(props) {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = React.useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);

  React.useEffect(() => {
    if (isLoading === 'success') {
      setOpenAlert((previous) => !previous);
      dispatch(successfulAction());
    }
  }, [isLoading, dispatch]);

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
