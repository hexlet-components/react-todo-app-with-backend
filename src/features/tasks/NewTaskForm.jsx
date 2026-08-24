// @ts-check

import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import validateName from "../../lib/validateName.js";
import { useAddTask, useTasks } from "../../services/api.js";
import { useCurrentListId } from "../../store/index.js";

const NewTaskForm = () => {
  const currentListId = useCurrentListId();
  const { data: tasks, isLoading } = useTasks(currentListId);
  const { mutateAsync: addTask, isPending } = useAddTask();

  const form = useForm({
    initialValues: { text: "" },
    validateInputOnChange: false,
    validate: {
      text: (value) =>
        validateName(
          value,
          (tasks ?? []).map((task) => task.text),
        ),
    },
  });

  if (isLoading) {
    return null;
  }

  const handleSubmit = async ({ text }) => {
    try {
      await addTask({ listId: currentListId, text });
      form.reset();
    } catch {
      notifications.show({ color: "red", message: "Network error" });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} data-testid="task-form">
      <Group align="flex-start" gap="xs" mb="md" wrap="nowrap">
        <TextInput
          {...form.getInputProps("text")}
          id="new-task"
          name="text"
          placeholder="Please type text..."
          readOnly={isPending}
          flex={1}
          aria-label="New task"
        />
        <Button type="submit" variant="outline" color="green" disabled={isPending}>
          Add
        </Button>
      </Group>
    </form>
  );
};

export default NewTaskForm;
