import { StateCreator, StoreApi } from "zustand";
import { OrderState, OrderActions, OrderStatus } from "./orderTypes";
import { axiosInstance } from "../../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

export const createOrderActions: StateCreator<
  OrderState & OrderActions,
  [],
  [],
  OrderState & OrderActions
> = (set, get, _store) => ({
  orders: [],
  cartItems: [],
  selectedOrder: null,
  userOrders: [],
  loading: false,
  error: null,
  preview: null,

  previewOrder: async (cartItems, userAddress, deliveryType) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("orders/preview", {
        cartItems,
        userAddress,
        deliveryType
      });

      

      set({ preview: res.data, loading: false });
      toast.success("order calculated successfully");
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },



  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/orders/get-orders");
      console.log('response',res)
      set({ orders: res.data, loading: false });
    } catch (err: any) {
      set({
        error: err?.message || "Error fetching orders",
        loading: false,
      });
    }
  },

  fetchOrderById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/api/orders/${id}`);
      set({ selectedOrder: res.data.order, loading: false });
    } catch (err: any) {
      set({
        error: err?.message || "Error fetching order",
        loading: false,
      });
    }
  },

  
  // User use
  getUserOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/orders/my");
      set({ userOrders: res.data, loading: false }); // ✅ Store in userOrders
    } catch (err: any) {
      set({
        error: err?.message || "Error fetching user orders",
        loading: false,
      });
    }
  },

  deleteOrder: async (id: string) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      set((state) => ({
        orders: state.orders.filter((order) => order.trackingId !== id),
      }));
      toast.success("Order deleted");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete order");
    }
  },

  updateOrder: async (id, payload) => {
    try {
      const res = await axiosInstance.put(`/orders/${id}`, payload);
      console.log('response',res)
      set((state) => ({
        orders: state.orders.map((order) =>
          order.trackingId === id ? res.data.order : order
        ),
      }));
      console.log("✅ Order updated in Zustand store:", res.data.order);
      toast.success("Order fulfillment status updated successfully");
      return true;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Order fulfillment update failed"
      );
      console.error("Update failed:", error);
      return false;
    }
  },

  resetOrders: () => {
    set({
      orders: [],
      selectedOrder: null,
      error: null,
      loading: false,
    });
  },

  filterOrdersByStatus: (status: OrderStatus) => {
    return get().orders.filter((order) => order.status === status);
  },
});
