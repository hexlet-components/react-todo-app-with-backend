// @ts-check

import React from 'react';
import PropTypes from 'prop-types';

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
        <div className="col-4" align="end">
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

Task.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
  handleToggleTaskState: PropTypes.func.isRequired,
};

export default Task;
