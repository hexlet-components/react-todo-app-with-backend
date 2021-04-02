// @ts-nocheck

import React from 'react';

const Task = ({
  text,
  id,
  completed,
  handleRemoveTask,
  handleToggleTaskState,
}) => {
  const handledText = completed ? <s>{text}</s> : text;

  return (
    <li className="list-group-item container">
      <div className="row align-items-center justify-content-between">
        <div className="col-8">
          <input
            className="me-2"
            type="checkbox"
            value={completed}
            onChange={handleToggleTaskState(id)}
          />
          <span className="fs-5">{handledText}</span>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button
            onClick={handleRemoveTask(id)}
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
