// authStore.ts

import { create } from 'zustand';
import { ProductState} from './productTypes';
import { createProductActions } from './createProductActions';



export const useProductStore = create<ProductState>()(
  (...args) => ({
    // Initial state
    products: null,
    isCreatingProduct: false,
    isFetchingProducts: false,
    isLoading: false,
    isUpdatingProduct: false,
    error: null,
    success: false,
    data: null,
    dailyDeals: [],
    popularProducts: [],
    favorites: [],
    

    // Actions
    ...createProductActions(...args),
  })
);
