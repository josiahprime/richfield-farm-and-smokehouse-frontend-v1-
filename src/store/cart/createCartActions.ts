import { CartItem, CartState, CartActions } from './cartTypes';

export const createCartActions = (
  set: (fn: (state: CartState) => CartState) => void,
  get: () => CartState
): CartActions => ({
  addToCart: (item: CartItem) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: item.quantity || 1 }],
      };
    }),

  removeFromCart: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set(() => ({ items: [] })),

  incrementQuantity: (id: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decrementQuantity: (id: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
});
