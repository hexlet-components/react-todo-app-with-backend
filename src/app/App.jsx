// @ts-check

import React from 'react';

import { ToastContainer } from 'react-toastify';

import NewTaskForm from '../features/tasks/NewTaskForm.jsx';
import TasksList from '../features/tasks/TasksList.jsx';

import NewListForm from '../features/lists/NewListForm.jsx';
import ListsList from '../features/lists/ListsList.jsx';

const App = () => {
  return (
    <>
      <div className="container p-3">
        <nav className="navbar navbar-light bg-light mb-3">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Hexlet Todos</span>
          </div>
        </nav>
        <div className="row">
          <div className="col-4 h-100 px-3 border-end">
            <h4 className="mb-3">Lists</h4>
            <NewListForm />
            <ListsList />
          </div>
          <div className="col-8 px-3">
            <h4 className="mb-3">Tasks</h4>
            <NewTaskForm />
            <TasksList />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
