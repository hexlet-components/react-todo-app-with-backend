// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import NewTaskForm from '../features/tasks/NewTaskForm.jsx';
import TasksList from '../features/tasks/TasksList.jsx';
import { listsActions, listsSelectors } from '../features/lists/listsSlice';
import { tasksActions } from '../features/tasks/tasksSlice';

const App = () => {
  const currentListId = useSelector(listsSelectors.selectCurrent);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(listsActions.fetchAll());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(tasksActions.fetchAll({ currentListId }));
  // }, [dispatch, currentListId]);

  return (
    <>
      <div className="container">
        <h1>Hexlet Todos</h1>
        <NewTaskForm />
        <TasksList />
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
