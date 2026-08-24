// @ts-check

import { AppShell, Container, Grid, MantineProvider, Title } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import ListsList from "../features/lists/ListsList.jsx";
import NewListForm from "../features/lists/NewListForm.jsx";
import NewTaskForm from "../features/tasks/NewTaskForm.jsx";
import TasksList from "../features/tasks/TasksList.jsx";

const headerHeight = 56;

const App = () => (
  <MantineProvider>
    <Notifications position="bottom-right" />
    <AppShell header={{ height: headerHeight }} padding="md">
      <AppShell.Header>
        <Container h="100%" size="lg">
          <Title order={1} size="h4" lh={`${headerHeight}px`}>
            Hexlet Todos
          </Title>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Title order={2} size="h5" mb="sm">
                Lists
              </Title>
              <NewListForm />
              <ListsList />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <Title order={2} size="h5" mb="sm">
                Tasks
              </Title>
              <NewTaskForm />
              <TasksList />
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  </MantineProvider>
);

export default App;
