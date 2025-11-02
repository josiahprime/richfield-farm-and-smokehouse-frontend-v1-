import { create } from "zustand";
import { createReviewActions } from "./createReviewActions";
import { ReviewState } from "./reviewTypes";

export const useReviewStore = create<ReviewState>()((set) => ({
  ...createReviewActions(set),
}));
