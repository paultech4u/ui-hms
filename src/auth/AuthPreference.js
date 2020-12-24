import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from '@material-ui/core';
import { MdKeyboardArrowDown } from 'react-icons/md';

function AuthPreference(props) {
  return (
    <Box hidden={props.hidden}>
      <Accordion>
        <AccordionSummary expandIcon={<MdKeyboardArrowDown />}>
          <Typography>Hospital Logo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='textSecondary'>
            The click event of the nested action will propagate up and expand
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<MdKeyboardArrowDown />}>
          <Typography>Billing Platform</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='textSecondary'>
            The click event of the nested action will propagate up and expand
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default AuthPreference;
