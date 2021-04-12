import React from 'react';
import { Box } from '@material-ui/core';
import { SuccessfullAction } from '../auth/AuthStoreSlice';
import { NotifitionAlert } from '../common/Alert';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard(props) {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = React.useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);

  React.useEffect(() => {
    if (isLoading === 'success') {
      setOpenAlert((previous) => !previous);
      dispatch(SuccessfullAction());
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
