// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';

import { Panel, Task } from '../../components/index.js';
import { actions } from '../../slices/index.js';

const TodoApp = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { text } = useSelector((state) => state.text);
  const dispatch = useDispatch();

  const {
    tasksActions: { addTask, removeTask, toggleTaskState },
    textActions: { updateText },
  } = actions;

  const handleUpdateText = ({ target: { value } }) => {
    dispatch(updateText({ newText: value }));
  };

  const handleRemoveTask = (id) => () => {
    dispatch(removeTask({ id }));
  };

  const handleToggleTaskState = (id) => () => {
    dispatch(toggleTaskState({ id }));
  };

  const handleAddTask = (evt) => {
    evt.preventDefault();
    const task = { text, completed: false, id: uniqueId() };
    dispatch(addTask({ task }));
  };

  const buildTask = ({ text: currentText, id, completed }) => (
    <Task
      handleToggleTaskState={handleToggleTaskState}
      handleRemoveTask={handleRemoveTask}
      key={id}
      text={currentText}
      id={id}
      completed={completed}
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
