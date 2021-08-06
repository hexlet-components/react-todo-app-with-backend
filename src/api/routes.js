// @ts-check

const host = '';
const prefix = 'api/v1';

export const baseUrl = [host, prefix].join('/');

const routes = {
  lists: () => ['lists'].join('/'),
  tasks: () => ['tasks'].join('/'),
  listTasks: (id) => ['lists', id, 'tasks'].join('/'),
  list: (id) => ['lists', id].join('/'),
  task: (id) => ['tasks', id].join('/'),
};

export default routes;
