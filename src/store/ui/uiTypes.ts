// types/uiTypes.ts
export interface UiState {
  isSidebarOpen: boolean;
}

export interface UiActions {
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export type UiStore = UiState & UiActions;
