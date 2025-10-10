"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { useReviewStore } from "store/review/useReviewStore";

interface WriteReviewFormProps {
  productId: string;
}

export default function WriteReviewForm({ productId }: WriteReviewFormProps) {
  const { addReview, loading, error } = useReviewStore();

  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState("");

  const handleSubmit = async () => {
    if (!formName.trim() || !formText.trim() || formRating <= 0) {
      toast.error("Please fill all fields and select a rating");
      return;
    }

    const reviewData = {
      name: formName.trim(),
      rating: formRating,
      text: formText.trim(),
      productId,
    };

    const promise = addReview(reviewData);
    toast.promise(promise, {
      loading: "Submitting your review...",
      success: "Review submitted successfully! 🎉",
      error: "Failed to submit review",
    });

    await promise;

    setFormName("");
    setFormText("");
    setFormRating(0);
  };

  return (
    <div className="border border-gray-200 rounded-3xl p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Write a review</h3>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm text-black/60 mb-2">Your name</label>
          <input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-3"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm text-black/60 mb-2">Your rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFormRating(n)}
                className={`p-1 rounded ${formRating >= n ? "bg-[#FFC633]/20" : "hover:bg-gray-100"}`}
              >
                <Star
                  className={`w-6 h-6 ${formRating >= n ? "text-[#FFC633]" : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-black/60 mb-2">Your review</label>
        <textarea
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
          className="w-full rounded-md border border-gray-200 px-4 py-3 min-h-[120px]"
          placeholder="Share your thoughts about the product"
        />
      </div>

      <div className="flex items-center justify-end mt-4">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`px-6 py-2 rounded-full text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
