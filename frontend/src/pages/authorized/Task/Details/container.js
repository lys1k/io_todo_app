import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { findIndex } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import useUnauthorizedHandler from 'hooks/useUnauthorizedHandler';
import TaskDetailsView from './view';

const TaskDetailsContainer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { handleUnauthorized } = useUnauthorizedHandler();
  const taskId = parseInt(params.taskId);

  const [task, setTask] = useState({
    name: '',
    description: '',
    date: null,
  });

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

    getTask();
  }, [taskId]);

  const onTaskDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/task/${taskId}`);
      navigate('/application/tasks/list');
    } catch (err) {
      handleUnauthorized(err);
    }
  };

  const onTaskEdit = () => {
    navigate(`/application/tasks/edit/${taskId}`);
  };

  const onPreviousTaskClick = (prevTaskId) => {
    navigate(`/application/tasks/${prevTaskId}`);
  };

  const onSubTaskCheck = async (subTaskId) => {
    try {
      const subTaskIndex = findIndex(
        task.subTasks,
        ({ id }) => id === subTaskId
      );
      const checked = !task.subTasks[subTaskIndex].finished;
      const endpoint = checked ? 'check' : 'uncheck';
      await axios.put(
        `${process.env.REACT_APP_API_URL}/subtask/${subTaskId}/${endpoint}`
      );
      const newSubTasks = [...task.subTasks];
      newSubTasks[subTaskIndex].finished = checked;
      setTask({ ...task, subTasks: newSubTasks });
    } catch (err) {
      handleUnauthorized(err);
    }
  };

  return (
    <TaskDetailsView
      task={task}
      onTaskDelete={onTaskDelete}
      onTaskEdit={onTaskEdit}
      onSubTaskCheck={onSubTaskCheck}
      onPreviousTaskClick={onPreviousTaskClick}
    />
  );
};

export default TaskDetailsContainer;
