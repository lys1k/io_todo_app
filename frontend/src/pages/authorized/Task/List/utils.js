import { differenceInHours } from 'date-fns';
import {
  filter,
  forEach,
  groupBy,
  map,
  sortBy,
  split,
  toInteger,
  uniqueId,
} from 'lodash';
import { DATE_FORMAT, TIME_FORMAT } from 'consts/dateFormats';
import { formatDate } from 'utils/dateUtils';

const getSeverity = (datetime) => {
  let severity = 'default';
  const diff = differenceInHours(new Date(datetime), new Date());
  if (diff < 3) {
    severity = 'warning';
  }
  if (diff < 1) {
    severity = 'error';
  }

  return severity;
};

const getMappedTasks = (tasks, hideFinished) => {
  const groupedByDate = groupBy(tasks, (task) =>
    formatDate(task.date, DATE_FORMAT)
  );

  const result = [];
  forEach(groupedByDate, (value, key) => {
    const [day, month, year] = split(key, '-');
    let tasks = map(value, (task) => ({
      ...task,
      time: formatDate(task.date, TIME_FORMAT),
      severity: getSeverity(task.date),
    }));

    if (hideFinished) {
      tasks = filter(tasks, ({ finished }) => !finished);
    }

    tasks = sortBy(tasks, 'time');

    if (tasks.length > 0) {
      result.push({
        id: uniqueId(),
        date: new Date(toInteger(year), toInteger(month) - 1, toInteger(day)),
        tasks,
      });
    }
  });

  return sortBy(result, 'date');
};

export { getMappedTasks };
