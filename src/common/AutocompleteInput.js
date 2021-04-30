import React from 'react';
import clsx from 'clsx';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { TextField, Checkbox, makeStyles } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

/**
 *
 * @param {import("@material-ui/lab").AutocompleteProps} props
 * @returns
 */
export function AutocompleteInput(props) {
  const classes = useStyles();
  return (
    <Autocomplete
      multiple
      {...props}
      size='small'
      limitTags={1}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      className={clsx(classes.clearIndicator, classes.input_item)}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            checked={selected}
            checkedIcon={checkedIcon}
            icon={icon}
            style={{ marginRight: 8 }}
          />
          {option.name}
        </React.Fragment>
      )}
      renderInput={(params) => <TextField {...params} variant='outlined' />}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  clearIndicator: {
    '& .MuiAutocomplete-clearIndicator': {
      display: 'none',
    },
  },
  input_item: {
    '& .MuiInputBase-root': {
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'row',
    },
    '& .MuiAutocomplete-inputRoot ': {
      flexWrap: 'nowrap',
    },
  },
}));
