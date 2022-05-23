import React from 'react';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './styles';

const FilterButton = ({ title, Icon, active, onClick }) => {
  return (
    <Box
      sx={{ ...styles.root, ...(active && styles.active) }}
      onClick={onClick}
    >
      <Icon sx={{ ...styles.icon, ...(active && styles.iconActive) }} />
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
};

FilterButton.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

FilterButton.defaultProps = {
  active: false,
  onClick: noop,
};

export default FilterButton;
