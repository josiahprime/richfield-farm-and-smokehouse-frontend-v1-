import { create } from "zustand";
import { createDiscountActions } from "./createDiscountActions";
import { DiscountState } from "./discountTypes";

export const useDiscountStore = create<DiscountState>()((set, get) => ({
  ...createDiscountActions(set, get),
}));
