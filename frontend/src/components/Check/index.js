import React from 'react';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import getStyles from './styles';

const Check = ({ checked, onClick, sx }) => {
  const styles = getStyles(checked);

  return (
    <Box
      sx={{
        ...styles.root,
        ...(onClick === null && styles.readOnly),
        ...sx,
      }}
      onClick={onClick}
    >
      {checked && <Box sx={styles.insideDot} />}
    </Box>
  );
};

Check.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  sx: PropTypes.object,
};

Check.defaultProps = {
  checked: false,
  onClick: noop,
  sx: {},
};

export default Check;
