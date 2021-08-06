// @ts-check

import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react/index.js';

import routes, { baseUrl } from '../api/routes.js';

const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const tags = {
  LIST: 'LIST',
  TASK: 'TASK',
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getLists: builder.query({
      query: routes.lists,
      providesTags: [tags.LIST],
    }),
    addList: builder.mutation({
      query: (data) => ({
        url: routes.lists(),
        body: data,
        method: httpMethods.POST,
      }),
      invalidatesTags: [tags.LIST],
    }),
    removeList: builder.mutation({
      query: (id) => ({
        url: routes.list(id),
        method: httpMethods.DELETE,
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: tags.TASK, id },
        tags.LIST,
      ],
    }),
    getTasksByListId: builder.query({
      query: routes.listTasks,
      providesTags: (_result, _error, id) => [{ type: tags.TASK, id }],
    }),
    addTask: builder.mutation({
      query: ({ listId, ...body }) => ({
        url: routes.listTasks(listId),
        method: httpMethods.POST,
        body,
      }),
      invalidatesTags: (result) => [{ type: tags.TASK, id: result.listId }],
    }),
    removeTask: builder.mutation({
      query: (id) => ({
        url: routes.task(id),
        method: httpMethods.DELETE,
      }),
      invalidatesTags: [tags.TASK],
    }),
    toggleCompleted: builder.mutation({
      query: ({ id, ...body }) => ({
        url: routes.task(id),
        method: httpMethods.PATCH,
        body,
      }),
      invalidatesTags: [tags.TASK],
    }),
  }),
  tagTypes: Object.values(tags),
});

export const {
  useGetListsQuery,
  useGetTasksByListIdQuery,
  useAddTaskMutation,
  useAddListMutation,
  useRemoveListMutation,
  useRemoveTaskMutation,
  useToggleCompletedMutation,
} = api;
