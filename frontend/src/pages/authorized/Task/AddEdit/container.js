import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { filter, get, map } from 'lodash';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { INPUT_FORMAT } from 'consts/dateFormats';
import useUnauthorizedHandler from 'hooks/useUnauthorizedHandler';
import { formatDate } from 'utils/dateUtils';
import { initialTaskData } from './consts';
import TaskAddEditView from './view';

const TaskAddEditContainer = ({ isEdit }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { handleUnauthorized } = useUnauthorizedHandler();
  const taskId = parseInt(params.taskId);

  const [task, setTask] = useState(initialTaskData);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    if (!isEdit) {
      setTask(initialTaskData);
    }
  }, [isEdit]);

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/task/${taskId}`
        );
        const task = res.data;
        setTask(task);
      } catch (err) {
        handleUnauthorized(err);
      }
    };

    if (isEdit) {
      getTask();
    }
  }, [taskId]);

  useEffect(() => {
    const getAvailableTasks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/task`);
        const filteredTasks = filter(
          res.data,
          (task) => !task.finished && task.id !== taskId
        );
        const options = map(filteredTasks, (task) => ({
          value: task.id,
          label: task.name,
        }));
        setAvailableTasks(options);
      } catch (err) {
        console.log(err);
      }
    };

    getAvailableTasks();
  }, []);

  useEffect(() => {
    const getAvailableTags = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
        const tags = res.data;
        const options = map(tags, (tag) => ({
          value: tag.id,
          label: tag.tagName,
        }));
        setAvailableTags(options);
      } catch (err) {
        console.log(err);
      }
    };

    getAvailableTags();
  }, []);

  const onSubmit = async (values) => {
    const data = {
      ...values,
      date: new Date(values.date),
    };
    try {
      if (isEdit) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/task/${taskId}`,
          data
        );
        navigate(`/application/tasks/${taskId}`);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/task`, data);
        navigate('/application/tasks/list');
      }
    } catch (err) {
      handleUnauthorized(err);
    }
  };

  const initialValues = useMemo(() => {
    const date = formatDate(get(task, 'date', ''), INPUT_FORMAT);

    return {
      name: get(task, 'name', ''),
      description: get(task, 'description', ''),
      date,
      previousTasks: map(get(task, 'previousTasks', []), (task) => ({
        id: task.id,
      })),
      tags: map(get(task, 'tags', []), (tag) => ({
        id: tag.id,
      })),
      subTasks: map(get(task, 'subTasks', []), (subtask) => ({
        name: subtask.name,
      })),
    };
  }, [task, isEdit]);

  return (
    <TaskAddEditView
      isEdit={isEdit}
      onSubmit={onSubmit}
      initialValues={initialValues}
      availableTasks={availableTasks}
      availableTags={availableTags}
    />
  );
};

TaskAddEditContainer.propTypes = {
  isEdit: PropTypes.bool,
};

TaskAddEditContainer.defaultProps = {
  isEdit: false,
};

export default TaskAddEditContainer;
