// @ts-check

import { useRef } from "react";
import { Button, Checkbox, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useRemoveTask, useToggleCompleted } from "../../services/api.js";

const Task = ({ task }) => {
  const { mutateAsync: removeTask, isPending: isRemoving } = useRemoveTask();
  const { mutateAsync: toggleTaskCompleted, isPending: isToggling } = useToggleCompleted();
  const isLoading = isRemoving || isToggling;

  const checkboxRef = useRef();
  const buttonRef = useRef();

  const remove = async () => {
    try {
      await removeTask(task.id);
    } catch {
      buttonRef.current?.focus();
      notifications.show({ color: "red", message: "Network error" });
    }
  };

  const toggleCompleted = async ({ target }) => {
    try {
      await toggleTaskCompleted({ id: task.id, completed: target.checked });
    } catch {
      notifications.show({ color: "red", message: "Network error" });
    }
    checkboxRef.current?.focus();
  };

  return (
    <Group justify="space-between" wrap="nowrap">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onChange={toggleCompleted}
        disabled={isLoading}
        ref={checkboxRef}
        label={task.completed ? <s>{task.text}</s> : task.text}
      />
      <Button
        onClick={remove}
        color="red"
        size="xs"
        variant="filled"
        disabled={isLoading}
        ref={buttonRef}
      >
        Remove
      </Button>
    </Group>
  );
};

export default Task;
