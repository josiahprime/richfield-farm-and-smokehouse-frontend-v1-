import { create } from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware';
import { CartItem, CartState, CartActions } from './cartTypes';
import { createCartActions } from './createCartActions';

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      ...createCartActions(set, get),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
