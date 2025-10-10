import { ReviewState, Review } from "./reviewTypes";
import axiosInstance from "lib/axios";

export const createReviewActions = (
  set: (partial: Partial<ReviewState> | ((state: ReviewState) => Partial<ReviewState>)) => void,
  get: () => ReviewState
) => ({
  reviews: [] as Review[],
  loading: false,
  error: null as string | null,

// 🔹 Fetch product reviews
fetchReviews: async (productId: string) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get(`/reviews/${productId}`);
    console.log("response from fetch reviews", res);
    
    // Use the data directly — no mapping needed
    set({ reviews: res.data.reviews || [], loading: false });
  } catch (err: any) {
    console.error("Failed to fetch reviews:", err);
    set({
      loading: false,
      error: err.response?.data?.message || "Failed to load reviews",
    });
  }
},


  // 🔹 Add a new review (with optimistic update)
  addReview: async (data: {
    userId: string;
    productId: string;
    rating: number;
    text: string;
  }) => {
    set({ loading: true, error: null });

    // 1️⃣ Create optimistic review with string ID
    const optimisticReview: Review = {
      ...data,
      id: `temp-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      user: { name: "You" },
    } as Review;

    // 2️⃣ Show immediately
    set((state) => ({
      reviews: [optimisticReview, ...state.reviews],
    }));

    try {
      // 3️⃣ Send to backend
      const res = await axiosInstance.post(`/reviews`, data);
      const realReview: Review = {
        ...res.data,
        id: String(res.data.id),
        productId: String(res.data.productId),
        userId: String(res.data.userId),
      };

      // 4️⃣ Replace fake review with real one
      set((state) => ({
        reviews: state.reviews.map((r) =>
          r.id === optimisticReview.id ? realReview : r
        ),
        loading: false,
      }));
    } catch (err: any) {
      console.error("Failed to submit review:", err);

      // 5️⃣ Rollback on failure
      set((state) => ({
        reviews: state.reviews.filter((r) => r.id !== optimisticReview.id),
        loading: false,
        error: err.response?.data?.message || "Failed to submit review",
      }));
    }
  },
});
