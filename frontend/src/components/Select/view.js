import React from 'react';
import { truncate } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from '@mui/material';
import { optionsShape } from './shapes';

const Select = ({ field, error, helperText, label, options, sx, ...props }) => (
  <FormControl
    fullWidth
    error={!isEmpty(error)}
    sx={{
      width: '100%',
      ...sx,
    }}
  >
    <InputLabel>{label}</InputLabel>
    <MUISelect
      {...field}
      {...props}
      label={label}
      onChange={(event) => {
        field.onChange(event);
      }}
      sx={{
        borderRadius: 5,
      }}
      MenuProps={{
        MenuListProps: {
          sx: {
            backgroundColor: (theme) => theme.palette.white,
          },
        },
      }}
    >
      {map(options, ({ value, label }) => (
        <MenuItem
          value={value}
          key={value}
          sx={{
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
          }}
        >
          {truncate(label, { length: 30 })}
        </MenuItem>
      ))}
    </MUISelect>
    {(!isEmpty(error) || !isEmpty(helperText)) && (
      <FormHelperText sx={{ marginLeft: 0 }}>
        {error || helperText}
      </FormHelperText>
    )}
  </FormControl>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.any,
  error: PropTypes.string,
  helperText: PropTypes.string,
  options: optionsShape.isRequired,
  sx: PropTypes.objectOf(PropTypes.any),
};

Select.defaultProps = {
  error: '',
  helperText: '',
  sx: {},
};

export default Select;
