// createProductActions.ts
import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';

import { axiosInstance } from '../../lib/axios';
import {
  ProductSlice,
  ProductActions,
  Product,
  CreateProductPayload,
  UpdateProductPayload
} from './productTypes';

export const createProductActions: StateCreator<
  ProductSlice & ProductActions,
  [],
  [],
  ProductActions
> = (set, get) => ({
  setProduct: (product) => {
    // Optionally store a selected or active product (if needed)
    console.log('Product set:', product);
  },


  createProduct: async ({ formData, tags, stock, formattedImages }: CreateProductPayload) => {
    set({ isLoading: true, error: null, success: false });
    console.log('🚀 Starting product creation...');

    try {
      const data = new FormData();

      // 🧩 Basic product info
      data.append("productName", formData.productName);
      data.append("description", formData.description);
      data.append("category", formData.category);

      if (formData.subCategory)
        data.append("subCategory", formData.subCategory);

      data.append("priceInKobo", String(formData.priceInKobo));
      data.append("stock", String(stock));
      data.append("unitType", formData.unitType);
      data.append("isVariableWeight", String(formData.isVariableWeight));

      if (formData.minOrderQuantity)
        data.append("minOrderQuantity", String(formData.minOrderQuantity));

      // 🏷️ Tags (as JSON string)
      if (tags && tags.length > 0)
        data.append("tags", JSON.stringify(tags));

      // 🧮 Discount (only discountId now)
      if (formData.discountId)
        data.append("discountId", formData.discountId);

      // 💡 Display label
      if (formData.displayLabel)
        data.append("displayLabel", formData.displayLabel);

      // 🖼️ Handle images
      formattedImages.forEach((imgObj) => {
        if (imgObj.file instanceof File) {
          data.append("images", imgObj.file);
          data.append("imageIndexes", String(imgObj.index));
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

    } catch (err: any) {
      console.error("❌ Product creation failed:", err);
      set({ isLoading: false, error: err.message || "Failed to create product" });
      toast.error("There was an error adding this item");
    }
  },


  updateProduct: async (formData: UpdateProductPayload) => {
    set({ isUpdatingProduct: true });
    try {
      const res = await axiosInstance.put(`/products/${formData.get("id")}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 🧠 crucial for file uploads
        },
      });

      set({ data: res.data });
      toast.success("Item updated successfully");
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Item update failed");
      return false;
    } finally {
      set({ isUpdatingProduct: false });
    }
  },


  fetchProducts: async (filters = {}, userId?: string) => {
    set({ isLoading: true, error: null });

    try {
      // merge filters + userId
      const paramsObj = { ...filters, ...(userId ? { userId } : {}) };
      const params = new URLSearchParams(paramsObj as Record<string, string>).toString();

      const response = await axiosInstance.get(`/products/get-products?${params}`);
      console.log('response from products db',response)

      set({ products: response.data.products, isLoading: false }); 
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },



  

  deleteProduct: async (id: string) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success('Item deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Item delete failed');
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
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
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
  } catch (err: any) {
    set({ error: err.message });
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
    } catch (error: any) {
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
      } catch (error: any) {
        set({ isLoading: false, error: error.message });
      }  
  }
});


