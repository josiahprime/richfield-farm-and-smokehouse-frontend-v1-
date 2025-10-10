// // store/checkout/checkoutAction.ts

// import { StateCreator } from "zustand";
// import { CheckoutState, CheckoutActions } from "./checkoutTypes";
// import {useCartStore}from '../cart/useCartStore'
// import { axiosInstance } from '../../lib/axios';
// import toast from "react-hot-toast";

// export const createCheckoutSlice: StateCreator<
//   CheckoutState & CheckoutActions,
//   [],
//   [],
//   CheckoutState & CheckoutActions
// > = (set) => ({
//   isPaying: false,
//   amount: 0,
//   email: "",
//   phone: "",
//   name: "",
//   items: [],
//   status: "loading",
//   message: "",

//   setAmount: (amount) => set({ amount }),
//   setItems: (items) => set({ items }),

//   // store/checkout/checkoutAction.ts

//   handlePaystackPayment: async ({
//     name,
//     email,
//     phone,
//     address,
//     postalCode,
//     state,
//     city,
//     landmark,
//     extraInstructions,
//     pickupStation,
//     deliveryType,
//     amount,
//     items,
//   }) => {
//     set({ isPaying: true });

//     try {
//       const response = await axiosInstance.post("/pay/paystack/initiate", {
//         name,
//         email,
//         phone,
//         address,
//         postalCode,
//         state,
//         city,
//         landmark,
//         extraInstructions,
//         pickupStation,
//         deliveryType,
//         amount,
//         items,
//       });

//       const { authorization_url } = response.data.data;

//       if (!authorization_url) {
//         toast.error("Error initiating payment");
//         return;
//       }

//       window.location.href = authorization_url;
//     } catch (error: any) {
//       console.error("Payment init error:", error);
//       toast.error("Payment Failed");
//     } finally {
//       set({ isPaying: false });
//     }
//   },



  // handlePaystackPayment: async (name, email, phone, address, amount, items) => {
  //   set({ isPaying: true });

  //   try {
  //     const response = await axiosInstance.post("/pay/paystack/initiate", {
  //       name,
  //       email,
  //       phone,
  //       address,
  //       amount,
  //       items,
  //     });

  //     const { authorization_url } = response.data.data;

  //     if (!authorization_url) {
  //       toast.error("Error initiating payment");
  //       return;
  //     }

  //     window.location.href = authorization_url;
  //   } catch (error: any) {
  //     console.error("Payment init error:", error);
  //     toast.error("Payment Failed");
  //   } finally {
  //     set({ isPaying: false });
  //   }
  // },

//   verifyPayment: async (reference) => {
//     try {
//       const response = await axiosInstance.get(`/pay/paystack/verify/${reference}`);

//       if (response.data.status === "paid") {
//         useCartStore.getState().clearCart()
//         toast.success("Payment Successful");
//         set({
//           status: "success",
//           message: "Payment verified successfully!",
//         });
//         history.replaceState(null, "", "/product");
//       } else {
//         set({
//           status: "error",
//           message: "Payment verification failed.",
//         });
//       }
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || "Error verifying payment.";
//       toast.error(errorMessage);
//       set({
//         status: "error",
//         message: errorMessage,
//       });
//     }
//   },
// });

// verifyPayment: async (reference) => {
//   try {
//     console.log("🔁 Verifying payment for reference:", reference);

//     const response = await axiosInstance.get(`/pay/paystack/verify/${reference}`);

//     console.log("✅ Payment verification response:", response.data);

//     if (response.data.status === "paid") {
//       useCartStore.getState().clearCart();
//       toast.success("Payment Successful");

//       set({
//         status: "success",
//         message: "Payment verified successfully!",
//       });

//       // This line doesn't trigger navigation in Next.js. See note below.
//       // history.replaceState(null, "", "/product");
//     } else {
//       console.warn("❌ Payment verification failed response:", response.data);
//       set({
//         status: "error",
//         message: "Payment verification failed.",
//       });
//     }
//   } catch (error) {
//     console.error("❌ Error during payment verification:", error);

//     const errorMessage = error?.response?.data?.error || "Error verifying payment.";
//     toast.error(errorMessage);

//     set({
//       status: "error",
//       message: errorMessage,
//     });
//   }
// }

import { StateCreator } from "zustand";
import { CheckoutState, CheckoutActions } from "./checkoutTypes";
import { useCartStore } from "../cart/useCartStore";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const createCheckoutSlice: StateCreator<
  CheckoutState & CheckoutActions,
  [],
  [],
  CheckoutState & CheckoutActions
> = (set) => ({
  isPaying: false,
  amount: 0,
  email: "",
  phone: "",
  name: "",
  items: [],
  status: "loading",
  message: "",

  setAmount: (amount) => set({ amount }),
  setItems: (items) => set({ items }),

  // 🟢 Initiates Paystack payment
  handlePaystackPayment: async ({
    name,
    email,
    phone,
    address,
    postalCode,
    state,
    city,
    landmark,
    extraInstructions,
    pickupStation,
    deliveryType,
    amount,
    items,
    subtotal,
    taxAmount,
    taxRate,
    shippingFee,
    total
  }) => {
    set({ isPaying: true });

    try {
      const response = await axiosInstance.post("/pay/paystack/initiate", {
        name,
        email,
        phone,
        address,
        postalCode,
        state,
        city,
        landmark,
        extraInstructions,
        pickupStation,
        deliveryType,
        amount,
        items,
        subtotal,
        taxAmount,
        taxRate,
        shippingFee,
        total
      });

      const { authorization_url } = response.data.data;

      if (!authorization_url) {
        toast.error("Error initiating payment");
        return;
      }

      window.location.href = authorization_url;
    } catch (error: any) {
      console.error("Payment init error:", error);
      toast.error("Payment Failed");
    } finally {
      set({ isPaying: false });
    }
  },

  // 🟢 Verifies Paystack payment after redirect
  verifyPayment: async (reference) => {
    try {
      console.log("🔁 Verifying payment for reference:", reference);

      const response = await axiosInstance.get(`/pay/paystack/verify/${reference}`);

      console.log("✅ Payment verification response:", response.data);

      if (response.data.status === "paid") {
        useCartStore.getState().clearCart();
        toast.success("Payment Successful");

        set({
          status: "success",
          message: "Payment verified successfully!",
        });

        // Do navigation using router.push in your component, not here
      } else {
        console.warn("❌ Payment verification failed response:", response.data);
        set({
          status: "error",
          message: "Payment verification failed.",
        });
      }
    } catch (error) {
      console.error("❌ Error during payment verification:", error);

      const errorMessage = error?.response?.data?.error || "Error verifying payment.";
      toast.error(errorMessage);

      set({
        status: "error",
        message: errorMessage,
      });
    }
  },
});

