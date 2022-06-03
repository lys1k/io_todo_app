import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { findIndex } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useUnauthorizedHandler from 'hooks/useUnauthorizedHandler';
import { formatDate } from 'utils/dateUtils';
import { INPUT_FORMAT } from '../../../../consts/dateFormats';
import { getMappedTasks } from './utils';
import TaskLIstView from './view';

const TaskListContainer = () => {
  const navigate = useNavigate();
  const { handleUnauthorized } = useUnauthorizedHandler();
  const [searchParams, setSearchParams] = useSearchParams();

  const [hideFinished, setHideFinished] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        console.log(searchParams);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/task/${searchParams.dateFrom}/${searchParams.dateTo}`
        );
        const tasks = res.data;
        setTasks(tasks);
      } catch (err) {
        handleUnauthorized(err);
      }
    };

    getTasks();
  }, [searchParams.dateFrom, searchParams.dateTo]);

  const onTaskClick = (id) => {
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

  const switchFinishedTasksVisibility = () => {
    setHideFinished(!hideFinished);
  };

  const filtersInitialValues = {
    dateFrom: formatDate('', INPUT_FORMAT),
    dateTo: formatDate('', INPUT_FORMAT),
  };

  const onFiltersSubmit = async (values) => {
    console.log(values);
    setSearchParams(values);
  };

  return (
    <TaskLIstView
      tasks={getMappedTasks(tasks, hideFinished)}
      onTaskClick={onTaskClick}
      onTaskCheck={onTaskCheck}
      switchFinishedTasksVisibility={switchFinishedTasksVisibility}
      hideFinished={hideFinished}
      filtersInitialValues={filtersInitialValues}
      onFiltersSubmit={onFiltersSubmit}
    />
  );
};

export default TaskListContainer;
