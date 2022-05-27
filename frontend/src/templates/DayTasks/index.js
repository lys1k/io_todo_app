import React from 'react';
import { map } from 'lodash';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import DayIndicator from 'components/DayIndicator';
import TaskRow from 'components/TaskRow';
import { tasksShape } from './shapes';

const DayTasks = ({ date, tasks, onTaskClick, onTaskCheck }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', width: '100%', columnGap: 40 }}>
        <Box sx={{ flex: 1 }}>
          {map(tasks, (task) => (
            <TaskRow
              key={task.id}
              isDone={task.finished}
              onClick={() => onTaskClick(task.id)}
              onCheck={() => onTaskCheck(task.id)}
              title={task.name}
              tags={task.tags}
              time={task.time}
              severity={task.severity}
              sx={{ marginBottom: 5 }}
            />
          ))}
        </Box>
        <Box sx={{ marginTop: 15, width: 150 }}>
          <DayIndicator date={date} />
        </Box>
      </Box>
    </Box>
  );
};

DayTasks.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  tasks: tasksShape.isRequired,
  onTaskClick: PropTypes.func,
  onTaskCheck: PropTypes.func,
};

DayTasks.defaultProps = {
  onTaskClick: noop,
  onTaskCheck: noop,
};

export default DayTasks;
