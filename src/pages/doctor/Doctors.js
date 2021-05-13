import React from 'react';
import { Box } from '@material-ui/core';
import DoctorsTable from './DoctorsTable';

function DoctorPage(props) {
  return (
    <Box>
      <Box>
        <DoctorsTable />
      </Box>
    </Box>
  );
}

export default DoctorPage;
