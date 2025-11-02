// createProductActions.ts
import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';
import { AxiosError } from "axios";

import { axiosInstance } from '../../lib/axios';
import {
  ProductSlice,
  ProductActions,
  CreateProductPayload,
} from './productTypes';

export const createProductActions: StateCreator<
  ProductSlice & ProductActions,
  [],
  [],
  ProductActions
> = (set) => ({
  setProduct: (product) => {
    // Optionally store a selected or active product (if needed)
    console.log('Product set:', product);
  },

  createProduct: async (payload: CreateProductPayload) => {
    set({ isLoading: true, error: null, success: false });
    console.log("🚀 Starting product creation...");

    try {
      const data = new FormData();

      // 🧩 Basic product info
      data.append("productName", payload.productName);
      data.append("description", payload.description);
      data.append("category", payload.category);

      if (payload.subCategory)
        data.append("subCategory", payload.subCategory);

      data.append("priceInKobo", String(payload.priceInKobo));
      data.append("stock", String(payload.stock));
      data.append("unitType", payload.unitType);
      data.append("isVariableWeight", String(payload.isVariableWeight));

      if (payload.minOrderQuantity)
        data.append("minOrderQuantity", String(payload.minOrderQuantity));

      // 🏷️ Tags
      if (payload.tags && payload.tags.length > 0)
        data.append("tags", JSON.stringify(payload.tags));

      // 🧮 Discount
      if (payload.discountId)
        data.append("discountId", payload.discountId);

      // 💡 Display label
      if (payload.displayLabel)
        data.append("displayLabel", payload.displayLabel);

      // 🖼️ Handle images
      payload.images.forEach((file) => {
        if (file instanceof File) {
          data.append("images", file);
        }
      });

      // 📡 API request
      const response = await axiosInstance.post("/products/add-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ isLoading: false, success: true });
      toast.success("✅ New item was added successfully!");
      console.log("✅ Product created:", response.data);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error("❌ Product creation failed:", err);
      set({
        isLoading: false,
        error: error.response?.data.error || "Failed to create product",
      });
      toast.error("There was an error adding this item");
    }
  },


  updateProduct: async (payload: FormData) => {
    set({ isUpdatingProduct: true });
    try {
      const id = payload.get("id") as string; // FormData values are string | File
      const res = await axiosInstance.put(`/products/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ data: res.data });
      toast.success("Item updated successfully");
      return true;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || "Item update failed");
      return false;
    } finally {
      set({ isUpdatingProduct: false });
    }
  },



  fetchProducts: async (filters = {}, userId?: string) => {
    set({ isLoading: true, error: null });
    console.log('fetching products....')

    try {
      // merge filters + userId
      const paramsObj = { ...filters, ...(userId ? { userId } : {}) };
      const params = new URLSearchParams(paramsObj as Record<string, string>).toString();

      const response = await axiosInstance.get(`/products/get-products?${params}`);
      console.log('response from products db',response)

      set({ products: response.data.products, isLoading: false }); 
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      set({ isLoading: false, error: error.message });
    }
  },

  fetchProductById: async (id: string, userId?: string) => {
    try {
      set({ isLoading: true, error: null, singleProduct: null });

      // Build query string only if userId exists
      const query = userId ? `?userId=${userId}` : "";

      // ✅ send optional userId as query param
      const res = await axiosInstance.get(`/products/${id}${query}`);

      const product = res.data?.product;
      if (!product) throw new Error("Product not found");

      set({ singleProduct: product, success: true });
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error("Error fetching product by ID:", err);
      set({
        error: error.message || "Failed to fetch product details",
        singleProduct: null,
        success: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },





  

  deleteProduct: async (id: string) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success('Item deleted successfully');
      return true;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || 'Item delete failed');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

 fetchFavorites: async (userId: string) => {
  set({ isLoading: true, error: null });
  try {
    const { data } = await axiosInstance.get(`/products/favorites/${userId}`);
    console.log('favorites from fetch favorites function',data)
    set({ favorites: data, isLoading: false });
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    set({ error: error.message, isLoading: false });
  }
},

toggleFavorite: async (userId: string, productId: string) => {
  try {
    const { data } = await axiosInstance.post(`/products/favorites/toggle`, { userId, productId });
    console.log("toggle favorite response:", data);

    set((state) => {
      console.log('state before we do anything with', state)
      if (data.status === "added") {
        console.log("favorites added");
        return { favorites: [...state.favorites, data.product] };
      } else {
        console.log("favorite removed");
        console.log('state we want to filter',state.favorites)
        return { favorites: state.favorites.filter((p) => p.id !== productId) };
      }
    });

    const result = data.status === "added" ? "added" : "removed";
    console.log("final return value from toggleFavorite:", result); // 👈 log here
    return result;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    set({ error: error.message });
    return "removed";
  }
},


  

  fetchDailyDeals: async () => {
    //107257
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/products/daily-deals');
      console.log('fetch daily deals res', response)
      set({ dailyDeals: response.data.dailyDeals, isLoading: false });
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      set({ isLoading: false, error: error.message });
    }
    
  },

  fetchPopularProducts: async () => {
    console.log('fetching Products')
    set({ isLoading: true, error: null });
      try {
        const response = await axiosInstance.get('/products/popular-products');
        console.log('fetch popular products res', response)
        set({ popularProducts: response.data.popularProducts, isLoading: false });
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        set({ isLoading: false, error: error.message });
      }  
  }
});


