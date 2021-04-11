// @ts-check

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NewTaskForm from 'features/tasks/NewTaskForm.jsx';
import { tasksActions } from '../features/tasks/tasksSlice';
import { listsActions, listsSelectors } from '../features/lists/listsSlice';
import TasksList from '../features/tasks/TasksList';

const App = () => {
  const currentListId = useSelector(listsSelectors.selectCurrent);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listsActions.fetchAll()).catch(console.error);
  }, [dispatch]);

  useEffect(() => {
    dispatch(tasksActions.fetchAll({ currentListId })).catch(console.error);
  }, [dispatch, currentListId]);

  return (
    <div className="container">
      <h1>Hexlet Todos</h1>
      <NewTaskForm />
      <TasksList />
    </div>
  );
};

export default App;
