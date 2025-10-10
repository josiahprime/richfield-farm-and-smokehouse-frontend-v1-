import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { OrderState, OrderActions } from "./orderTypes";
import { createOrderActions } from "./createOrderActions";

export const useOrderStore = create<OrderState & OrderActions>()(
  persist(
    (set, get, store) => ({
      ...createOrderActions(set, get, store),
    }),
    {
      name: "order-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        orders: state.orders,
        selectedOrder: state.selectedOrder,
      }),
    }
  )
);
