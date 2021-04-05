// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { uniqueId } from 'lodash';

import axios from 'axios';

import routes from '../../routes.js';
import { Panel, Task } from '../../components/index.js';
import { actions } from '../../slices/index.js';

const TodoApp = () => {
  // @ts-ignore
  const { tasks } = useSelector((state) => state.tasks);
  // @ts-ignore
  const { text } = useSelector((state) => state.text);
  const dispatch = useDispatch();

  const {
    // listsActions: { initLists, addList, removeList, selectList },
    tasksActions: { initTasks, addTask, removeTask, toggleTaskState },
    textActions: { updateText },
  } = actions;

  const handleUpdateText = ({ target: { value } }) => {
    dispatch(updateText({ newText: value }));
  };

  // useEffect(() => {
  //   const url = routes.lists();
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       console.log(res.data)
  //       dispatch(initLists(res.data));
  //     })
  //     .catch((e) => {
  //       console.error(e); 
  //     });
  // }, [dispatch, initLists])

  
  // const handleAddList = (evt) => {
  //   evt.preventDefault();
  //   const url = routes.lists();
  //   axios
  //     .post(url, { text: 'list' })
  //     .then((res) => {
  //       console.log(res.data)
  //       dispatch(addList(res.data));
  //     })
  //     .catch((e) => {
  //       console.error(e); 
  //     });
  // };

  // const handleRemoveList = (id) => () => {
  //   const url = routes.list(id);
  //   axios
  //     .delete(url)
  //     .then((res) => {
  //       console.log(res)
  //       dispatch(removeList({ id }));
  //     })
  //     .catch((e) => {
  //       console.error(e); 
  //     });
  // };

  // const handleSelectList = (id) => () => {
  //   dispatch(selectList({ id }));
  // };

  useEffect(() => {
    const url = currentListId ? routes.listTasks(currentListId) : routes.tasks();
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        dispatch(initTasks(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dispatch, initTasks, currentListId])

  const handleAddTask = (evt) => {
    evt.preventDefault();
    const url = routes.tasks();
    axios
      .post(url, { text, listId: currentListId })
      .then((res) => {
        console.log(res.data);
        dispatch(addTask(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleRemoveTask = (id) => () => {
    const url = routes.task(id);
    axios
      .delete(url)
      .then((res) => {
        console.log(res)
        dispatch(removeTask({ id }));
      })
      .catch((e) => {
        console.error(e); 
      });
  };

  const handleToggleTaskState = (task) => () => {
    const url = routes.task(task.id);
    axios
      .patch(url, { completed: !task.completed })
      .then((res) => {
        console.log(res)
        dispatch(toggleTaskState(res.data));
      })
      .catch((e) => {
        console.error(e); 
      });
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
