// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import axios from 'axios';

import routes from '../../routes.js';
import { Panel, Task } from '../../components/index.js';
import { actions } from '../../slices/index.js';

const sortTasks = (prevTask, nextTask) => {
  const prevTaskId = Number(prevTask.id);
  const nextTaskId = Number(nextTask.id);
  return prevTaskId - nextTaskId;
};

const initialTasksSelector = (state) => state.tasks.tasks;

const activeTasksSelector = createSelector(initialTasksSelector, (tasks) => {
  const activeTasks = tasks.filter((task) => !task.completed).sort(sortTasks);
  return activeTasks;
});

const completedTasksSelector = createSelector(initialTasksSelector, (tasks) => {
  const completedTasks = tasks.filter((task) => task.completed).sort(sortTasks);
  return completedTasks;
});

const tasksSelector = createSelector(
  activeTasksSelector,
  completedTasksSelector,
  (activeTasks, completedTasks) => [...activeTasks, ...completedTasks]
);

const TodoApp = () => {
  const tasks = useSelector(tasksSelector);
  const { currentListId } = useSelector((state) => state.lists);
  const { text } = useSelector((state) => state.text);
  const dispatch = useDispatch();

  const {
    // listsActions: { initLists, addList, removeList, selectList },
    tasksActions: { initTasks, addTask, removeTask, toggleTaskState },
    textActions: { updateText },
  } = actions;

  const handleUpdateText = ({ target: { value } }) => {
    dispatch(updateText({ newText: value }));
  };

  // useEffect(() => {
  //   const url = routes.lists();
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       console.log('useEffect lists res.data', res.data)
  //       dispatch(initLists(res.data));
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [dispatch, initLists])

  // const handleAddList = (evt) => {
  //   evt.preventDefault();
  //   const url = routes.lists();
  //   axios
  //     .post(url, { text: 'list' })
  //     .then((res) => {
  //       console.log('handleAddList res.data', res.data)
  //       dispatch(addList(res.data));
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  // const handleRemoveList = (id) => () => {
  //   const url = routes.list(id);
  //   axios
  //     .delete(url)
  //     .then((res) => {
  //       console.log('handleRemoveList res', res)
  //       dispatch(removeList({ id }));
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  // const handleSelectList = (id) => () => {
  //   dispatch(selectList({ id }));
  // };

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

  const handleAddTask = (evt) => {
    evt.preventDefault();
    const url = routes.tasks();
    axios
      .post(url, { text, listId: currentListId })
      .then((res) => {
        console.log('handleAddTask res.data', res.data);
        dispatch(addTask(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleRemoveTask = (task) => () => {
    const url = routes.task(task.id);
    axios
      .delete(url)
      .then((res) => {
        console.log('handleRemoveTask res', res);
        dispatch(removeTask({ id: task.id }));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleToggleTaskState = (task) => () => {
    const url = routes.task(task.id);
    axios
      .patch(url, { completed: !task.completed })
      .then((res) => {
        console.log('handleToggleTaskState res', res);
        dispatch(toggleTaskState(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
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
