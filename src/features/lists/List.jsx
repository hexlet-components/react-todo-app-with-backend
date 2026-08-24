// @ts-check

import { useRef } from "react";
import { ActionIcon, Anchor, Group, VisuallyHidden } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

import defaultListId from "../../config/index.js";
import { useRemoveList } from "../../services/api.js";
import { useCurrentListId, useSetCurrentListId } from "../../store/index.js";

const List = ({ list }) => {
  const currentListId = useCurrentListId();
  const setCurrentListId = useSetCurrentListId();
  const { mutateAsync: removeList, isPending } = useRemoveList();

  const buttonRef = useRef();

  const setCurrent = (e) => {
    e.preventDefault();
    setCurrentListId(list.id);
  };

  const remove = async () => {
    try {
      await removeList(list.id);
      setCurrentListId(defaultListId);
    } catch {
      buttonRef.current?.focus();
      notifications.show({ color: "red", message: "Network error" });
    }
  };

  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap">
      <Anchor
        component="button"
        type="button"
        onClick={setCurrent}
        c={currentListId === list.id ? "blue" : "dimmed"}
      >
        {list.name}
      </Anchor>
      {list.removable && (
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={remove}
          disabled={isPending}
          ref={buttonRef}
        >
          <IconX size={16} />
          <VisuallyHidden>remove list</VisuallyHidden>
        </ActionIcon>
      )}
    </Group>
  );
};

export default List;
