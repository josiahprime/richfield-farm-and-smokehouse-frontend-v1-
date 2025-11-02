"use client";

import React, { useEffect, useState } from "react";
import { Check, Star, ChevronLeft } from "lucide-react";
import { useReviewStore } from "store/review/useReviewStore";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

interface Review {
  id?: string;
  name: string;
  rating: number;
  verified?: boolean;
  text: string;
  date: string;
  profile?: string;
}




interface DisplayReview {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  text: string;
  date: string;
  profile?: string;
}



const defaultReviews: Review[] = [
  {
    name: "Samantha D.",
    rating: 4.5,
    verified: true,
    text:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "August 14, 2023",
  },
  {
    name: "Alex M.",
    rating: 4,
    verified: true,
    text:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "August 15, 2023",
  },
  {
    name: "Ethan R.",
    rating: 3.5,
    verified: true,
    text:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "August 16, 2023",
  },
  {
    name: "Olivia P.",
    rating: 4,
    verified: true,
    text:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    date: "August 17, 2023",
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const { productId } = useParams();
  const { reviews, fetchReviews } = useReviewStore();

  const [page, setPage] = useState(1);
  const [displayReviews, setDisplayReviews] = useState<Review[]>([]);
  const perPage = 10;

  // 🔹 Fetch reviews from store
  useEffect(() => {
    if (productId) {
      fetchReviews(productId as string).catch(() => {});
    }
  }, [productId, fetchReviews]);

  // 🔹 Handle default vs real reviews
  // inside your useEffect
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const mapped: DisplayReview[] = reviews.map((r) => ({
        id: r.id,
        name: r.user?.name || "Anonymous",
        rating: r.rating,
        verified: true,
        text: r.text,
        date: new Date(r.createdAt).toLocaleDateString(),
        profile: r.user?.profilePic, // ✅ correct property
      }));
      setDisplayReviews(mapped);
    } else {
      setDisplayReviews(defaultReviews);
    }
  }, [reviews]);

  const totalPages = Math.max(1, Math.ceil(displayReviews.length / perPage));
  const start = (page - 1) * perPage;
  const visible = displayReviews.slice(start, start + perPage);

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-[#FFC633] text-[#FFC633]"
              : i < rating
              ? "fill-[#FFC633] text-[#FFC633] opacity-50"
              : "fill-none text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col px-4 md:px-8 py-12 max-w-5xl mx-auto font-[sans-serif]">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-black/60 mb-6 hover:text-black transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to product
      </button>

      <h1 className="text-3xl font-bold mb-4">All Reviews</h1>
      <p className="text-black/60 mb-6">
        Customer reviews for this product
      </p>

      <div className="space-y-5">
        {visible.map((review, idx) => (
          <div
            key={review.id || idx}
            className="border border-gray-200 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 bg-white hover:shadow-sm transition"
          >
            {/* Profile Image or Initial */}
            <div className="flex-shrink-0">
              {review.profile ? (
                <Image
                  src={review.profile}
                  alt={review.name}
                  width={64} // w-16
                  height={64} // h-16
                  className="rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
                  {review.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>


            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <div className="text-black/60 text-sm">{review.date}</div>
                </div>

                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  {review.verified && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-black/70 mt-4">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 rounded border border-gray-200 disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>
        <div className="px-4 py-2 text-sm text-black/70">
          {page} / {totalPages}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-4 py-2 rounded border border-gray-200 disabled:opacity-50"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
