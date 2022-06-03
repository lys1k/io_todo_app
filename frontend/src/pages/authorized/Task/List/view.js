import React from 'react';
import differenceInDays from 'date-fns/fp/differenceInDays';
import { Form, Formik } from 'formik';
import map from 'lodash/map';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Button from 'components/Button';
import Input from 'components/Input';
import TaskSeparator from 'components/TaskSeparator';
import DayTasks from 'templates/DayTasks';
import { tasksWithDateShape } from './shapes';

const TaskListView = ({
  tasks,
  onTaskClick,
  onTaskCheck,
  switchFinishedTasksVisibility,
  hideFinished,
  filtersInitialValues,
  onFiltersSubmit,
}) => {
  return (
    <Box>
      <Formik initialValues={filtersInitialValues} onSubmit={onFiltersSubmit}>
        <Form>
          <Box sx={{ display: 'flex', columnGap: 20, marginBottom: 20 }}>
            <Input name="dateFrom" label="Date from" type="datetime-local" />
            <Input name="dateTo" label="Date to" type="datetime-local" />
          </Box>
          <Button size="small" sx={{ marginBottom: 10 }} submit>
            Filtruj
          </Button>
        </Form>
      </Formik>
      <Button
        size="small"
        sx={{ marginBottom: 40 }}
        onClick={switchFinishedTasksVisibility}
      >
        {hideFinished ? 'Pokaż wykonane zadania' : 'Ukryj wykonane zadania'}
      </Button>
      {map(tasks, (entry, index) => (
        <Box sx={{ marginBottom: 40 }} key={entry.id}>
          <DayTasks
            date={entry.date}
            tasks={entry.tasks}
            onTaskClick={onTaskClick}
            onTaskCheck={onTaskCheck}
          />
          {!isNaN(tasks?.[index + 1]?.date) ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30,
              }}
            >
              <Box sx={{ width: 220 }}>
                <TaskSeparator
                  value={
                    differenceInDays(
                      tasks[index].date,
                      tasks?.[index + 1]?.date
                    ) - 1
                  }
                />
              </Box>
            </Box>
          ) : null}
        </Box>
      ))}
    </Box>
  );
};

TaskListView.propTypes = {
  tasks: tasksWithDateShape,
  onTaskClick: PropTypes.func,
  onTaskCheck: PropTypes.func,
  switchFinishedTasksVisibility: PropTypes.func,
  hideFinished: PropTypes.bool,
  filtersInitialValues: PropTypes.shape({
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
  }),
  onFiltersSubmit: PropTypes.func,
};

TaskListView.defaultProps = {
  tasks: [],
  onTaskClick: noop,
  onTaskCheck: noop,
  switchFinishedTasksVisibility: noop,
  hideFinished: false,
};

export default TaskListView;
