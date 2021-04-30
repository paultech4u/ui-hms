import React from 'react';
import { KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
import { CalenderPopper } from '../common/CustomCalenderPopper';
import { Box, makeStyles } from '@material-ui/core';

/**
 *
 * @param {import('@material-ui/core').PopperProps} props
 * @returns
 */
export function DatePopper(props) {
  const classes = useStyles();
  return (
    <CalenderPopper {...props}>
      <Box display='flex'>
        <KeyboardDatePicker
          autoOk
          size='small'
          variant='inline'
          inputVariant='outlined'
          format='MM/dd/yyyy'
          className={classes.keyboardPicker_input}
          // value={selectedDate}
          // InputAdornmentProps={{ position: 'start' }}
          // onChange={(date) => handleDateChange(date)}
        />
        <KeyboardDatePicker
          autoOk
          size='small'
          variant='inline'
          inputVariant='outlined'
          format='MM/dd/yyyy'
          className={classes.keyboardPicker_input}
          // value={selectedDate}
          // InputAdornmentProps={{ position: 'start' }}
          // onChange={(date) => handleDateChange(date)}
        />
      </Box>
      <Box display='flex'>
        <DatePicker
          autoOk
          disableToolbar
          orientation='portrait'
          variant='static'
          openTo='date'
          className={classes.datePicker}
          // value={date}
          // onChange={changeDate}
        />
        <DatePicker
          autoOk
          disableToolbar
          orientation='portrait'
          variant='static'
          openTo='date'
          className={classes.datePicker}
          // value={date}
          // onChange={changeDate}
        />
      </Box>
    </CalenderPopper>
  );
}

const useStyles = makeStyles({
  keyboardPicker_input: {
    '& .MuiIconButton-root': {
      display: 'none',
    },
  },
  datePicker: {
    '& .MuiPickersStaticWrapper-staticWrapperRoot': {
      minWidth: 0,
    },
    '& .MuiPickersBasePicker-container': {
      width: '200px',
    },
    '& .MuiPickersBasePicker-pickerView': {
      minWidth: 0,
    },
  },
});
