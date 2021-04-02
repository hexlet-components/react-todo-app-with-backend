import {
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  createServer,
  Factory,
} from "miragejs";

const server = () => {
  return createServer({
    serializers: {
      task: RestSerializer.extend({
        include: ["list"],
        embed: true,
      }),
      list: RestSerializer.extend({
        include: ["tasks"],
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
        }
      }),
    },

    seeds(server) {

      server.createList("list", 2);

      server.createList("task", 4, { listId: 1 });
      server.createList("task", 3, { listId: 2 });

    },

    routes() {
      this.get("/api/lists", (schema, request) => {
        return schema.lists.all();
      });

      this.get("/api/lists/:id/tasks", (schema, request) => {
        let list = schema.lists.find(request.params.id);
        return list.tasks;
      });

      this.get("/api/tasks", (schema) => {
        return schema.tasks.all();
      });

      this.post("/api/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.tasks.create(attrs);
      });

      this.post("/api/lists", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.lists.create(attrs);
      });

      this.delete("/api/tasks/:id", (schema, request) => {
        let id = request.params.id;
        return schema.tasks.find(id).destroy();
      });

      this.delete("/api/lists/:id", (schema, request) => {
        let id = request.params.id;
        let list = schema.lists.find(id);
        list.tasks.destroy();
        return list.destroy();
      });
    },
  });
}

export default server;
