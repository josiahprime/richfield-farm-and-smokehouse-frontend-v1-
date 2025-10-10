// store/createUiActions.ts
import { StateCreator } from "zustand";
import { UiStore } from "./uiTypes";

export const createUiActions: StateCreator<UiStore, [], [], UiStore> = (set) => ({
  isSidebarOpen: false,

  toggleSidebar: () => set((state) => ({
    isSidebarOpen: !state.isSidebarOpen,
  })),

  openSidebar: () => set({ isSidebarOpen: true }),

  closeSidebar: () => set({ isSidebarOpen: false }),
});
