import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartState, CartActions } from "./cartTypes";
import { createCartActions } from "./createCartActions";

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],            // logged-in user cart
      guestItems: [],       // guest cart
      ...createCartActions(set, get), // all actions
    }),
    {
      name: "cart-storage", // storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ✅ Sync Zustand cart across multiple browser tabs
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "cart-storage" && event.newValue) {
      try {
        const newState = JSON.parse(event.newValue);
        if (newState?.state) {
          useCartStore.setState(newState.state);
          console.log("🔄 Cart synced across tabs:", newState.state);
        }
      } catch (error) {
        console.error("❌ Failed to sync cart:", error);
      }
    }
  });
}

