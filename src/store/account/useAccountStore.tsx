import { create } from "zustand";
import { AccountState } from "./accountTypes";
import { AddressData } from "./accountTypes";
import { AxiosError } from "axios";

import {
  updateEmailApi,
  updateNameApi,
  updatePasswordApi,
  updatePhoneApi,
  updateAddressApi,
  fetchAddressApi
} from "./createAccountActions";

const useAccountStore = create<AccountState>((set) => ({
  // 🔹 Base fields
  name: "",
  email: "",
  phone: "",
  userId: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",

  // 🔹 Address fields (must exist for AccountState)
  fullName: "",
  state: "",
  city: "",
  address: "",
  landmark: "",
  postalCode: "",

  // 🔹 Setters
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  setCurrentPassword: (currentPassword) => set({ currentPassword }),
  setNewPassword: (newPassword) => set({ newPassword }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),

  // ✅ Address setters
  setFullName: (fullName) => set({ fullName }),
  setStateField: (stateValue) => set({ state: stateValue }),
  setCity: (city) => set({ city }),
  setAddress: (address) => set({ address }),
  setLandmark: (landmark) => set({ landmark }),
  setPostalCode: (postalCode) => set({ postalCode }),

  // 🔹 Actions
  updateName: async (userId: string, username: string) => {
    try {
      const result = await updateNameApi(userId, username);
      return result
      // console.log("Name updated:", result);
    } catch (err) {
      console.error(err);
    }
  },

  updateEmail: async (userId: string, newEmail: string) => {
    try {
      const result = await updateEmailApi(userId, newEmail);
      return result;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error("[Zustand] updateEmail failed:", error.response?.data || error.message);
      throw err;
    }
  },

  updatePhone: async (userId: string, phone: string) => {
    try {
      const result = await updatePhoneApi(userId, phone);
      return result;
    } catch (err) {
      console.error(err);
    }
  },

  updatePassword: async (currentPassword, newPassword) => {
    try {
      const res = await updatePasswordApi(currentPassword, newPassword);
      return res;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      throw new Error(error.message || "Failed to update password");
    }
  },

  updateAddress: async (data: AddressData) => {
    try {
      const res = await updateAddressApi(data);
      return res;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error("[Zustand] updateAddress failed:", error.response?.data || error.message);
      throw err;
    }
  },

  fetchAddress: async () => {
    try {
      const res = await fetchAddressApi();
      const addr = res.address;
      // populate state with fetched address
      set({
        fullName: addr.fullName || "",
        email: addr.email || "",
        state: addr.state || "",
        city: addr.city || "",
        address: addr.address || "",
        landmark: addr.landmark || "",
        postalCode: addr.postalCode || "",
      });
    } catch (err) {
      console.error("[Zustand] fetchAddress failed:", err);
    }
  },

  

  

}));

export default useAccountStore;
