import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWE2Y2MwZDIxMGI0ZDcyYmFjYmQxYSIsImlhdCI6MTYyMDczNjE2NCwiZXhwIjoxNjIwODIyNTY0LCJhdWQiOiI2MDlhNmNjMGQyMTBiNGQ3MmJhY2JkMWEifQ.C3vHIJnn2aCvtVfxGXlfvL5yglyNTdJpyKqoSl4F8ik';

function DoctorPage(props) {
  const [user, setUser] = useState(null);

  const deleteUser = useCallback(async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/delete',
        {},
        {
          params: {
            Id: '609ab86f53f3a53d53349b91',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user === null) {
          const res = await axios.get(
            'http://localhost:5000/get-user-profile',
            {
              params: {
                Id: '609ab86f53f3a53d53349b91',
              },
            }
          );
          setUser(res.data.profile);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  return (
    <Box>
      {user !== null && <Typography>{user.email}</Typography>}
      <Button
        size='small'
        variant='contained'
        color='primary'
        onClick={deleteUser}>
        delete user
      </Button>
    </Box>
  );
}

export default DoctorPage;
