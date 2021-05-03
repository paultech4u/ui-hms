import React from 'react';
import { KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
import { Box, Paper, Button, Divider, makeStyles } from '@material-ui/core';

/**
 *
 * @param {} props
 */
export function DatePickerPopper(props) {
  const classes = useStyles();
  const { onDatePickerClose } = props;
  return (
    <Paper>
      <Box display='flex' padding={5}>
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
      <Paper
        elevation={0}
        variant='outlined'
        className={classes.datePicker_container}>
        <Box display='flex' justifyContent='space-between'>
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
      </Paper>
      <Divider />
      <Box display='flex' justifyContent='flex-end' padding={5}>
        <Button
          size='small'
          color='primary'
          variant='contained'
          style={{ marginRight: 5 }}>
          Apply
        </Button>
        <Button size='small' variant='outlined' onClick={onDatePickerClose}>
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}

const useStyles = makeStyles({
  keyboardPicker_input: {
    flex: 1,
    width: '20ch',
    alignItems: 'flex-start',
    '& .MuiIconButton-root': {
      display: 'none',
    },
  },
  datePicker_container: {
    margin: 5,
    '& .MuiPickersStaticWrapper-staticWrapperRoot': {
      minWidth: 0,
    },
    '& .MuiPickersBasePicker-pickerView': {
      minWidth: 0,
    },
  },
  datePicker: {
    '& .MuiPickersBasePicker-container': {
      width: '100px',
    },
  },
});
