// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import axios from 'axios';
import routes from '../common/routes.js';
import Panel from '../features/taskForm/Panel.jsx';
import Task from '../features/tasks/Task.jsx';

// import { initLists, addList, removeList, selectList } from '../features/currentListId/listsSlice.js'
import {
  initTasks,
  addTask,
  removeTask,
  toggleTaskState,
} from '../features/tasks/tasksSlice.js';
import { updateText } from '../features/taskForm/textSlice.js';
import { Panel, Task } from '../../components/index.js';
import { actions } from '../../slices/index.js';
import { tasksThunks, tasksSelectors } from '../../slices/tasks.js';
import { listsThunks, listsSelectors } from '../../slices/lists.js';

const sortTasks = (prevTask, nextTask) => {
  const prevTaskStatus = prevTask.completed;
  const nextTaskStatus = nextTask.completed;
  return prevTaskStatus - nextTaskStatus;
};

const initialTasksSelector = tasksSelectors.selectAll;

const sortedTasksSelector = createSelector(initialTasksSelector, (tasks) => {
  const sortedTasks = [...tasks].sort(sortTasks);
  return sortedTasks;
});

const App = () => {
  const tasks = useSelector(sortedTasksSelector);
  const currentListId = useSelector(listsSelectors.selectCurrentListId);
  const { text } = useSelector((state) => state.text);
  const dispatch = useDispatch();

  const {
    textActions: { updateText },
  } = actions;

  const handleUpdateText = ({ target: { value } }) => {
    dispatch(updateText({ newText: value }));
  };

  useEffect(() => {
    try {
      dispatch(listsThunks.fetchLists());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      dispatch(tasksThunks.fetchTasksByListId({ currentListId }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, currentListId]);

  const handleAddTask = (evt) => {
    evt.preventDefault();
    try {
      dispatch(tasksThunks.addTask({ text, listId: currentListId }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTask = (task) => () => {
    try {
      dispatch(tasksThunks.removeTask({ id: task.id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleTaskState = (task) => () => {
    try {
      dispatch(
        tasksThunks.updateTask({ id: task.id, completed: !task.completed })
      );
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

export default App;
