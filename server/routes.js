// @ts-check

import _ from 'lodash';

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const primaryListId = getNextId();
  const secondaryListId = getNextId();
  const state = {
    lists: [
      { id: primaryListId, name: 'primary', removable: false },
      { id: secondaryListId, name: 'secondary', removable: true },
    ],
    tasks: [],
    currentListId: primaryListId,
  };

  if (defaultState.tasks) {
    state.tasks.push(...defaultState.tasks);
  }
  if (defaultState.lists) {
    state.lists.push(...defaultState.lists);
  }
  if (defaultState.currentListId) {
    state.currentListId = defaultState.currentListId;
  }

  return state;
};

export default (app, defaultState = {}) => {
  const state = buildState(defaultState);

  app
    .get('/', (_req, reply) => {
      reply.view('index.pug', { gon: state });
    })
    .post('/api/v1/lists', (req, reply) => {
      const { name } = req.body;
      const list = {
        name,
        removable: true,
        id: getNextId(),
      };
      state.lists.push(list);

      reply.send(201, list);
    })
    .delete('/api/v1/lists/:id', (req, reply) => {
      const listId = Number(req.params.id);
      state.lists = state.lists.filter((l) => l.id !== listId);
      state.tasks = state.tasks.filter((t) => t.listId !== listId);

      reply.send(204);
    })
    .post('/api/v1/lists/:id/tasks', (req, reply) => {
      const { name } = req.body;
      const task = {
        name,
        listId: Number(req.params.id),
        id: getNextId(),
        done: false,
      };
      state.tasks.push(task);
      reply.send(201, task);
    })
    .patch('/api/v1/tasks/:id', (req, reply) => {
      const taskId = Number(req.params.id);
      const { done } = req.body;
      const task = state.tasks.find((t) => t.id === taskId);
      task.done = done;
      reply.send(201, task);
    })
    .delete('/api/v1/tasks/:id', (req, reply) => {
      const taskId = Number(req.params.id);
      state.tasks = state.tasks.filter((t) => t.taskId !== taskId);

      reply.send(204);
    });
};
