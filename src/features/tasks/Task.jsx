// @ts-check

import { useDispatch } from 'react-redux';
import { tasksActions } from './tasksSlice';

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(tasksActions.remove({ id: task.id }));
  };

  const toggle = () => {
    dispatch(tasksActions.update({ id: task.id, completed: !task.completed }));
  };

  return (
    <div className="row align-items-center justify-content-between">
      <div className="col-8">
        <input
          className="me-2"
          type="checkbox"
          value={task.completed}
          onChange={toggle}
        />
        <span className="fs-5">
          {task.completed ? <s>{task.title}</s> : task.title}
        </span>
      </div>
      <div className="col-4 d-flex justify-content-end">
        <button onClick={remove} className="btn btn-danger" type="button">
          Remove
        </button>
      </div>
    </div>
  );
};

export default Task;
