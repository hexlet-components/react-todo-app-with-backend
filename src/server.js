import {
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  createServer,
  Factory,
} from 'miragejs';

const server = () =>
  createServer({
    serializers: {
      task: RestSerializer.extend({
        include: ['list'],
        embed: true,
      }),
    },

    models: {
      list: Model.extend({
        tasks: hasMany(),
      }),
      task: Model.extend({
        list: belongsTo(),
      }),
    },

    factories: {
      list: Factory.extend({
        name(i) {
          return `List ${i + 1}`;
        },
      }),
      task: Factory.extend({
        text(i) {
          return `Task ${i + 1}`;
        },
        completed() {
          return false;
        },
      }),
    },

    // eslint-disable-next-line no-shadow
    seeds(server) {
      server.createList('list', 2);
      server.createList('task', 4, { listId: 1 });
      server.createList('task', 3, { listId: 2 });
    },

    routes() {
      this.get('/api/lists', (schema) => schema.lists.all());

      this.get('/api/lists/:id', (schema, request) => {
        const { id } = request.params;
        return schema.lists.find(id);
      });

      this.get('/api/lists/:id/tasks', (schema, request) => {
        const list = schema.lists.find(request.params.id);
        return list.tasks;
      });

      this.get('/api/tasks/:id', (schema, request) => {
        const { id } = request.params;
        return schema.tasks.find(id);
      });

      this.get('/api/tasks', (schema) => schema.tasks.all());

      this.post('/api/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.tasks.create(attrs);
      });

      this.post('/api/lists', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.lists.create(attrs);
      });

      this.patch('/api/lists/:id', (schema, request) => {
        const { id } = request.params;
        const newAttrs = JSON.parse(request.requestBody);
        return schema.lists.find(id).update(newAttrs);
      });

      this.patch('/api/tasks/:id', (schema, request) => {
        const { id } = request.params;
        const newAttrs = JSON.parse(request.requestBody);
        return schema.tasks.find(id).update(newAttrs);
      });

      this.delete('/api/tasks/:id', (schema, request) => {
        const { id } = request.params;
        return schema.tasks.find(id).destroy();
      });

      this.delete('/api/lists/:id', (schema, request) => {
        const { id } = request.params;
        const list = schema.lists.find(id);
        list.tasks.destroy();
        return list.destroy();
      });
    },
  });

export default server;
