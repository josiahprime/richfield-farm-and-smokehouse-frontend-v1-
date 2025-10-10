// store/checkout/useCheckoutStore.ts

import { create } from "zustand";
import { CheckoutState, CheckoutActions } from "./checkoutTypes";
import { createCheckoutSlice } from "./createCheckoutActions";

export const useCheckoutStore = create<CheckoutState & CheckoutActions>()(
  createCheckoutSlice
);
