import React from 'react';
import { isEmpty, map } from 'lodash';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Check from 'components/Check';
import Chip from 'components/Chip';
import { severityShape } from './shapes';
import getStyles from './styles';

const TaskRow = ({
  isDone,
  title,
  tags,
  time,
  severity,
  onClick,
  onCheck,
  sx,
}) => {
  const styles = getStyles(isDone);

  const handleCheck = (event) => {
    event.stopPropagation();
    onCheck();
  };

  return (
    <Box sx={{ ...styles.root, ...sx }} onClick={onClick}>
      <Check checked={isDone} onClick={handleCheck} sx={{ marginRight: 20 }} />
      <Typography variant="h3" sx={styles.title} noWrap>
        {title}
      </Typography>
      {!isEmpty(tags) && (
        <Box>
          {map(tags, (entry) => (
            <Chip key={entry.id} title={entry.tagName} />
          ))}
        </Box>
      )}
      <Box
        sx={{
          ...(severity === 'warning' && styles.warning),
          ...(severity === 'error' && styles.error),
        }}
      >
        <Typography variant="h4" noWrap>
          {time}
        </Typography>
      </Box>
    </Box>
  );
};

TaskRow.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  severity: severityShape,
  onClick: PropTypes.func,
  onCheck: PropTypes.func,
  sx: PropTypes.object,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tagName: PropTypes.string,
      id: PropTypes.number,
    })
  ),
};

TaskRow.defaultProps = {
  severity: 'default',
  isDone: false,
  onClick: noop,
  onCheck: noop,
  sx: {},
  tags: [],
};

export default TaskRow;
