// @ts-check

import { ActionIcon, Group, TextInput, VisuallyHidden } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

import validateName from "../../lib/validateName.js";
import { useAddList, useLists } from "../../services/api.js";
import { useSetCurrentListId } from "../../store/index.js";

const NewListForm = () => {
  const setCurrentListId = useSetCurrentListId();
  const { data: lists, isLoading } = useLists();
  const { mutateAsync: addList, isPending } = useAddList();

  const form = useForm({
    initialValues: { text: "" },
    validateInputOnChange: false,
    validate: {
      text: (value) =>
        validateName(
          value,
          (lists ?? []).map((list) => list.name),
        ),
    },
  });

  if (isLoading) {
    return null;
  }

  const handleSubmit = async ({ text }) => {
    try {
      const data = await addList({ name: text });
      setCurrentListId(data.id);
      form.reset();
    } catch {
      notifications.show({ color: "red", message: "Network error" });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} data-testid="list-form">
      <Group align="flex-start" gap="xs" mb="md" wrap="nowrap">
        <TextInput
          {...form.getInputProps("text")}
          id="new-list"
          name="text"
          placeholder="List name..."
          readOnly={isPending}
          flex={1}
          aria-label="New list"
        />
        <ActionIcon type="submit" variant="outline" color="green" size="lg" disabled={isPending}>
          <IconCheck size={16} />
          <VisuallyHidden>add list</VisuallyHidden>
        </ActionIcon>
      </Group>
    </form>
  );
};

export default NewListForm;
