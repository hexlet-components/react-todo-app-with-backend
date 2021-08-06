// @ts-check

import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import {
  useRemoveTaskMutation,
  useToggleCompletedMutation,
} from '../../services/api.js';

const Task = ({ task }) => {
  const [removeTask, { isLoading: isLoadingOnRemove }] =
    useRemoveTaskMutation();
  const [toggleTaskCompleted, { isLoading: isLoadingOnToggleCompleted }] =
    useToggleCompletedMutation();
  const isLoading = isLoadingOnRemove || isLoadingOnToggleCompleted;

  const checkboxRef = useRef();
  const buttonRef = useRef();

  const remove = async () => {
    try {
      await removeTask(task.id);
    } catch (err) {
      buttonRef.current?.focus();
      toast('Network error');
    }
  };

  const toggleCompleted = async ({ target }) => {
    try {
      await toggleTaskCompleted({ id: task.id, completed: target.checked });
    } catch (err) {
      toast('Network error');
    }
    checkboxRef.current?.focus();
  };

  return (
    <div className="row align-items-center justify-content-between">
      <div className="col-8">
        <label className="pointer" htmlFor={`task-${task.id}`}>
          <input
            id={`task-${task.id}`}
            className="me-2"
            type="checkbox"
            onChange={toggleCompleted}
            disabled={isLoading}
            ref={checkboxRef}
            checked={task.completed}
          />
          {task.completed ? <s>{task.text}</s> : task.text}
        </label>
      </div>
      <div className="col-4 d-flex justify-content-end">
        <button
          onClick={remove}
          className="btn btn-sm btn-danger"
          type="button"
          disabled={isLoading}
          ref={buttonRef}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Task;
