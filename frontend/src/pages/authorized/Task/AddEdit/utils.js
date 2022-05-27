import { filter, includes, map } from 'lodash';

const getUniqueAvailableTasks = (allTasks, formTasks, currentFieldValue) => {
  const ids = map(formTasks, ({ id }) => id);

  return filter(
    allTasks,
    (task) => !includes(ids, task.value) || task.value === currentFieldValue
  );
};

const getUniqueTags = (allTags, formTags, currentFieldValue) => {
  const ids = map(formTags, ({ id }) => id);

  return filter(
    allTags,
    (tag) => !includes(ids, tag.value) || tag.value === currentFieldValue
  );
};

export { getUniqueAvailableTasks, getUniqueTags };
