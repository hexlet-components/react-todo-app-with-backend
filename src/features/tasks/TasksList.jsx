// @ts-check

import { Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import Loader from "../../lib/Loader.jsx";
import { useTasks } from "../../services/api.js";
import { useCurrentListId } from "../../store/index.js";
import Task from "./Task.jsx";

const sortComparer = (a, b) => {
  if (a.completed === b.completed) {
    return b.touched - a.touched;
  }

  return a.completed ? 1 : -1;
};

const TasksList = () => {
  const currentListId = useCurrentListId();
  const { data: tasks, error, isLoading } = useTasks(currentListId);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    notifications.show({ color: "red", message: "Network error" });
    return <Text>Error while loading</Text>;
  }

  if (tasks.length === 0) {
    return <Text>Tasks list is empty</Text>;
  }

  return (
    <Stack gap="xs" data-testid="tasks">
      {tasks
        .slice()
        .sort(sortComparer)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </Stack>
  );
};

export default TasksList;
