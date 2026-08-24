// @ts-check

import { Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import Loader from "../../lib/Loader.jsx";
import { useLists } from "../../services/api.js";
import List from "./List.jsx";

const ListsList = () => {
  const { data: lists, error, isLoading } = useLists();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    notifications.show({ color: "red", message: "Network error" });
    return <Text>Error while loading</Text>;
  }

  return (
    <Stack gap="xs" data-testid="lists">
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </Stack>
  );
};

export default ListsList;
