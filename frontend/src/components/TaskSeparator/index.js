import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import styles from './styles';

const TaskSeparator = ({ value }) => {
  return (
    <Box>
      {value != 0 && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={styles.circle} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={styles.circle} />
            <Box>{value == 1 ? value + ' dzień' : value + ' dni'}</Box>
          </Box>
        </>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={styles.circle} />
      </Box>
    </Box>
  );
};

TaskSeparator.propTypes = {
  value: PropTypes.number.isRequired,
};

export default TaskSeparator;
