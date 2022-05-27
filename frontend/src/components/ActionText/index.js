import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const ActionText = ({ children, onClick, sx }) => {
  return (
    <Typography
      variant="h3"
      onClick={onClick}
      sx={{
        color: (theme) => theme.palette.primary.dark,
        cursor: 'pointer',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

ActionText.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

ActionText.defaultProps = {
  sx: {},
};

export default ActionText;
