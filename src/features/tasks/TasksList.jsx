// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useGetTasksByListIdQuery } from '../../services/api.js';
import { selectCurrentListId } from '../../store/currentListIdSlice.js';
import Task from './Task.jsx';
import Loader from '../../lib/Loader.jsx';

const sortComparer = (a, b) => {
  if (a.completed === b.completed) {
    return b.touched - a.touched;
  }

  return a.completed ? 1 : -1;
};

const TasksList = () => {
  const currentListId = useSelector(selectCurrentListId);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksByListIdQuery(currentListId);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    toast('Network error');
    return <span>Error while loading</span>;
  }

  if (tasks.length === 0) {
    return <div>Tasks list is empty</div>;
  }

  return (
    <ul className="list-group" data-testid="tasks">
      {tasks
        .slice()
        .sort(sortComparer)
        .map((task) => (
          <li className="list-group-item container" key={task.id}>
            <Task task={task} />
          </li>
        ))}
    </ul>
  );
};

export default TasksList;
