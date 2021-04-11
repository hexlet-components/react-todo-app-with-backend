import { useSelector } from 'react-redux';
import Task from './Task';
import { tasksSelectors } from './tasksSlice';

const TasksList = () => {
  const tasks = useSelector(tasksSelectors.selectSorted);

  return (
    <ul className="list-group">
      {tasks.map((task) => {
        return (
          <li className="list-group-item container" key={task.id}>
            <Task task={task} />
          </li>
        );
      })}
    </ul>
  );
};

export default TasksList;
