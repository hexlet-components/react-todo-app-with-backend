// @ts-check

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";

const init = () => {
  // Клиент создаётся на запуск приложения, а не модульным синглтоном: иначе
  // кеш переживал бы перезапуск и утекал между прогонами.
  const queryClient = new QueryClient();

  const vdom = (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  return vdom;
};

export default init;
