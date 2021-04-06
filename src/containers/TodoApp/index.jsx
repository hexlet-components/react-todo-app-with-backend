// @ts-nocheck

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import axios from 'axios';

import routes from '../../routes.js';
import { Panel, Task } from '../../components/index.js';
import { actions } from '../../slices/index.js';
import {
  addTaskThunk,
  removeTaskThunk,
  toggleTaskStateThunk,
} from '../../slices/tasks.js';

const sortTasks = (prevTask, nextTask) => {
  const prevTaskStatus = prevTask.completed;
  const nextTaskStatus = nextTask.completed;
  return prevTaskStatus - nextTaskStatus;
};

const initialTasksSelector = (state) => state.tasks.tasks;

const sortedTasksSelector = createSelector(initialTasksSelector, (tasks) => {
  const sortedTasks = [...tasks].sort(sortTasks);
  return sortedTasks;
});

const TodoApp = () => {
  const tasks = useSelector(sortedTasksSelector);
  const { currentListId } = useSelector((state) => state.lists);
  const { text } = useSelector((state) => state.text);
  const dispatch = useDispatch();

  const {
    tasksActions: { initTasks },
    textActions: { updateText },
  } = actions;

  const handleUpdateText = ({ target: { value } }) => {
    dispatch(updateText({ newText: value }));
  };

  useEffect(() => {
    const url = currentListId
      ? routes.listTasks(currentListId)
      : routes.tasks();
    axios
      .get(url)
      .then((res) => {
        console.log('useEffect tasks res.data', res.data);
        dispatch(initTasks(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dispatch, initTasks, currentListId]);

  const handleAddTask = async (evt) => {
    evt.preventDefault();
    try {
      const res = await dispatch(addTaskThunk({ text, listId: currentListId }));
      console.log('handleAddTask res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTask = (task) => async () => {
    try {
      const res = await dispatch(removeTaskThunk({ id: task.id }));
      console.log('handleRemoveTask res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleTaskState = (task) => async () => {
    try {
      const res = await dispatch(
        toggleTaskStateThunk({ id: task.id, completed: !task.completed })
      );
      console.log('handleToggleTaskState res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const buildTask = (task) => (
    <Task
      handleToggleTaskState={handleToggleTaskState}
      handleRemoveTask={handleRemoveTask}
      key={task.id}
      task={task}
    />
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-white">
            <div className="card-body">
              <h3>Hexlet Todos</h3>
              <Panel
                handleAddTask={handleAddTask}
                handleUpdateText={handleUpdateText}
                text={text}
              />
              {tasks.length > 0 && (
                <ul className="list-group">{tasks.map(buildTask)}</ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
