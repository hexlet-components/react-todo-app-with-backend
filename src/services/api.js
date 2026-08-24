// @ts-check

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import routes, { baseUrl } from "../api/routes.js";

const client = axios.create({ baseURL: baseUrl });

export const listsKey = ["lists"];
export const tasksKey = (listId) => ["lists", listId, "tasks"];

export const useLists = () =>
  useQuery({
    queryKey: listsKey,
    queryFn: async () => (await client.get(routes.lists())).data,
  });

export const useTasks = (listId) =>
  useQuery({
    queryKey: tasksKey(listId),
    queryFn: async () => (await client.get(routes.listTasks(listId))).data,
  });

export const useAddList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => (await client.post(routes.lists(), body)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: listsKey }),
  });
};

export const useRemoveList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => client.delete(routes.list(id)),
    // Вместе со списком исчезают его задачи, поэтому сбрасывается и их кеш.
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: listsKey });
      queryClient.removeQueries({ queryKey: tasksKey(id) });
    },
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ listId, ...body }) =>
      (await client.post(routes.listTasks(listId), body)).data,
    onSuccess: (task) => queryClient.invalidateQueries({ queryKey: tasksKey(task.listId) }),
  });
};

export const useRemoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => client.delete(routes.task(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });
};

export const useToggleCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...body }) => client.patch(routes.task(id), body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });
};
