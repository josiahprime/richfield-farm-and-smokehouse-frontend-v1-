// store/useUiStore.ts
import { create } from "zustand";
import { createUiActions } from "./createUiActions";
import { UiStore } from "./uiTypes";

export const useUiStore = create<UiStore>()((...args) => ({
  ...createUiActions(...args),
}));
