// @ts-nocheck

import React from 'react';

const Task = ({ task, handleRemoveTask, handleToggleTaskState }) => {
  const handledText = task.completed ? <s>{task.text}</s> : task.text;

  return (
    <li className="list-group-item container">
      <div className="row align-items-center justify-content-between">
        <div className="col-8">
          <input
            className="me-2"
            type="checkbox"
            value={task.completed}
            onChange={handleToggleTaskState(task)}
          />
          <span className="fs-5">{handledText}</span>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button
            onClick={handleRemoveTask(task)}
            className="btn btn-danger"
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default Task;
