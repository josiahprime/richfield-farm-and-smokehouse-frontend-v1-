import { CartItem, CartState, CartActions } from './cartTypes';
import { axiosInstance } from 'lib/axios';
import { useAuthStore } from 'store/auth/useAuthStore';

export const createCartActions = (
  set: (partial: Partial<CartState> | ((state: CartState) => CartState)) => void,
  get: () => CartState
): CartActions => ({
  getCart: async () => {
    try {
      const authUser = useAuthStore.getState().authUser;

      if (authUser) {
        // Logged-in: fetch from backend and clear guest cart
        const res = await axiosInstance.get("/cart");
        if (!res.data || !Array.isArray(res.data.items)) {
          console.warn("Invalid cart response format");
          return;
        }

        console.log("response from get cart", res.data);

        set(() => ({
          items: res.data.items,
          guestItems: [], // clear guest cart
        }));
      } else {
        // Guest: just keep existing guestItems
        set((state) => ({
          items: state.items,
          guestItems: state.guestItems, // preserve
        }));
      }
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    }
  },


  addToCart: async (item: CartItem) => {
    const authUser = useAuthStore.getState().authUser;
    const isLoggedIn = !!authUser;

    if (isLoggedIn) {
      // Logged-in user: update backend + state
      try {
        await axiosInstance.post('/cart', { productId: item.productId, quantity: item.quantity || 1 });
      } catch (err) {
        console.error('❌ Failed to sync addToCart:', err);
      }

      set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        return {
          items: existingItem
            ? state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
              )
            : [...state.items, { ...item, quantity: item.quantity || 1 }],
          guestItems: state.guestItems, // preserve guestItems as-is
        };
      });
    } else {
      // Guest user: only update local guestItems
      set((state) => {
        const existingItem = state.guestItems.find(i => i.id === item.id);
        return {
          guestItems: existingItem
            ? state.guestItems.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
              )
            : [...state.guestItems, { ...item, quantity: item.quantity || 1 }],
          items: state.items, // preserve logged-in items (should usually be empty)
        };
      });
    }
  },



  removeFromCart: async (id: string) => {
    const authUser = useAuthStore.getState().authUser;
    const isLoggedIn = !!authUser;

    if (isLoggedIn) {
      try {
        await axiosInstance.delete(`/cart/${id}`);
      } catch (err) {
        console.error('❌ Failed to sync removeFromCart:', err);
      }

      set((state) => ({
        items: state.items.filter(item => item.id !== id),
        guestItems: state.guestItems, // preserve guest cart
      }));
    } else {
      // guest user: only update guestItems
      set((state) => ({
        guestItems: state.guestItems.filter(item => item.id !== id),
        items: state.items, // preserve logged-in items (usually empty)
      }));
    }
  },

  clearCart: async () => {
    const authUser = useAuthStore.getState().authUser;
    if (authUser) {
      try { await axiosInstance.delete('/cart/clear'); } catch (err) { console.error(err); }
    }
    set({ items: [], guestItems: [] }); // clear both carts
    localStorage.removeItem('cart-storage');
  },


  incrementQuantity: async (id: string) => {
    const authUser = useAuthStore.getState().authUser;
    const isLoggedIn = !!authUser;

    set((state) => {
      if (isLoggedIn) {
        const updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        const updatedItem = updatedItems.find((i) => i.id === id);
        if (updatedItem) {
          axiosInstance.put(`/cart/${id}`, { quantity: updatedItem.quantity });
        }

        return {
          items: updatedItems,
          guestItems: state.guestItems, // preserve guest cart
        };
      } else {
        const updatedGuestItems = state.guestItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        return {
          guestItems: updatedGuestItems,
          items: state.items, // preserve logged-in cart (usually empty)
        };
      }
    });
  },

  decrementQuantity: async (id: string) => {
    const authUser = useAuthStore.getState().authUser;
    const isLoggedIn = !!authUser;

    set((state) => {
      if (isLoggedIn) {
        const updatedItems = state.items.map((item) =>
          item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );

        const updatedItem = updatedItems.find((i) => i.id === id);
        if (updatedItem) {
          axiosInstance.put(`/cart/${id}`, { quantity: updatedItem.quantity });
        }

        return {
          items: updatedItems,
          guestItems: state.guestItems,
        };
      } else {
        const updatedGuestItems = state.guestItems.map((item) =>
          item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );

        return {
          guestItems: updatedGuestItems,
          items: state.items,
        };
      }
    });
  },


  // 🧠 Merges guest cart to backend after login
  mergeCart: async () => {
    const { guestItems } = get();
    const authUser = useAuthStore.getState().authUser;
    if (!authUser || guestItems.length === 0) return;

    try {
      await axiosInstance.post('/cart/merge', { items: guestItems });
      const res = await axiosInstance.get('/cart');
      set({ items: res.data.items, guestItems: [] }); // ✅ clear guestItems after merge
      localStorage.removeItem('cart-storage');        // remove guest cart from storage
    } catch (err) {
      console.error('Failed to merge cart:', err);
    }
  },

});
