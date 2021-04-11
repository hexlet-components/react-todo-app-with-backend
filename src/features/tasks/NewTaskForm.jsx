// @ts-check

import { useDispatch, useSelector } from 'react-redux';
import { tasksActions } from './tasksSlice';
import { listsSelectors } from '../lists/listsSlice';

const NewTaskForm = () => {
  const dispatch = useDispatch();
  const currentListId = useSelector(listsSelectors.selectCurrent);

  const handleAddTask = (evt) => {
    evt.preventDefault();
    try {
      dispatch(tasksActions.create({ title: '123', listId: currentListId }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleAddTask} className="form mb-3">
      <div className="input-group input-group-lg">
        <input
          // value={title}
          type="text"
          className="form-control"
          placeholder="Please type text..."
        />
        <button
          disabled
          className="btn btn-lg btn-outline-success"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default NewTaskForm;
