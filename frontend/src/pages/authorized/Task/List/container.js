import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { findIndex } from 'lodash';
import { useNavigate } from 'react-router-dom';
import useUnauthorizedHandler from 'hooks/useUnauthorizedHandler';
import { getMappedTasks } from './utils';
import TaskLIstView from './view';

const TaskListContainer = () => {
  const navigate = useNavigate();
  const { handleUnauthorized } = useUnauthorizedHandler();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(tomorrow.getDate() - 1);
    const getTasks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/task`);
        const tasks = res.data;
        setTasks(tasks);
      } catch (err) {
        handleUnauthorized(err);
      }
    };

    getTasks();
  }, []);

  const onTaskClick = (id) => {
    console.log('Task clicked: ', id);
    navigate(`/application/tasks/${id}`);
  };

  const onTaskCheck = async (taskId) => {
    try {
      const taskIndex = findIndex(tasks, ({ id }) => id === taskId);
      const checked = !tasks[taskIndex].finished;
      const endpoint = checked ? 'check' : 'uncheck';
      await axios.put(
        `${process.env.REACT_APP_API_URL}/task/${taskId}/${endpoint}`
      );
      const newTasks = [...tasks];
      newTasks[taskIndex].finished = checked;
      setTasks(newTasks);
    } catch (err) {
      handleUnauthorized(err);
    }
  };

  return (
    <TaskLIstView
      tasks={getMappedTasks(tasks)}
      onTaskClick={onTaskClick}
      onTaskCheck={onTaskCheck}
    />
  );
};

export default TaskListContainer;
