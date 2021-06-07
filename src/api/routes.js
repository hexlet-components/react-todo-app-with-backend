// @ts-check

const host = '';
const prefix = 'api/v1';

const routes = {
  lists: () => [host, prefix, 'lists'].join('/'),
  tasks: () => [host, prefix, 'tasks'].join('/'),
  listTasks: (id) => [host, prefix, 'lists', id, 'tasks'].join('/'),
  list: (id) => [host, prefix, 'lists', id].join('/'),
  task: (id) => [host, prefix, 'tasks', id].join('/'),
};

export default routes;
