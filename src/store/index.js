// @ts-check

import { create } from "zustand";

import defaultListId from "../config/index.js";

// Единственное клиентское состояние приложения это выбранный список. Данные
// живут в кеше TanStack Query, поэтому своего стора им не нужно.
const useAppStore = create((set) => ({
  currentListId: defaultListId,
  setCurrentListId: (id) => set({ currentListId: id }),
}));

export const useCurrentListId = () => useAppStore((state) => state.currentListId);
export const useSetCurrentListId = () => useAppStore((state) => state.setCurrentListId);

export default useAppStore;
