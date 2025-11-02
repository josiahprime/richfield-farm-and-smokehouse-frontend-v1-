"use client";

import React, { useEffect, useState } from "react";
import { Check, Star, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Review {
  name: string;
  rating: number;
  verified?: boolean;
  text: string;
  date: string;
  image?: string;
}

const defaultReviews: Review[] = [
  {
    name: "Samantha D.",
    rating: 4.5,
    verified: true,
    text:
      '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    date: "August 14, 2023",
  },
  {
    name: "Alex M.",
    rating: 4,
    verified: true,
    text:
      '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
    date: "August 15, 2023",
  },
  {
    name: "Ethan R.",
    rating: 3.5,
    verified: true,
    text:
      '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
    date: "August 16, 2023",
  },
  {
    name: "Olivia P.",
    rating: 4,
    verified: true,
    text:
      '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."',
    date: "August 17, 2023",
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const stored = localStorage.getItem("product_reviews");
    let loadedReviews: Review[];

    if (stored) {
      try {
        loadedReviews = JSON.parse(stored);
      } catch (e: unknown) {
        console.error("Failed to parse reviews:", e);
        loadedReviews = defaultReviews;
      }
    } else {
      loadedReviews = defaultReviews;
      localStorage.setItem("product_reviews", JSON.stringify(defaultReviews));
    }

    // Fetch random profile images for each review
    fetch(`https://randomuser.me/api/?results=${loadedReviews.length}`)
      .then((res) => res.json())
      .then((data) => {
        const users = data.results;
        const withImages = loadedReviews.map((r, i) => ({
          ...r,
          image: users[i]?.picture?.medium || "/placeholder.jpg",
        }));
        setReviews(withImages);
      })
      .catch(() => setReviews(loadedReviews));
  }, []);

  const totalPages = Math.max(1, Math.ceil(reviews.length / perPage));
  const start = (page - 1) * perPage;
  const visible = reviews.slice(start, start + perPage);

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
    <div className="min-h-screen flex flex-col px-4 md:px-8 py-12 max-w-5xl mx-auto">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-black/60 mb-6 hover:text-black transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to product
      </button>

      <h1 className="text-3xl font-bold mb-4">All Reviews</h1>
      <p className="text-black/60 mb-6">
        Customer reviews for One Life Graphic T-shirt
      </p>

      <div className="space-y-5">
        {visible.map((review, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-3xl p-6 flex flex-col sm:flex-row gap-6"
          >
            <div className="flex-shrink-0">
              <Image
                src={review.image || "/placeholder.jpg"}
                alt={review.name}
                width={64}  // equivalent to w-16
                height={64} // equivalent to h-16
                className="rounded-full object-cover border border-gray-200"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
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

              <p className="text-black/60 mt-4">{review.text}</p>
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
        <div className="px-4 py-2">
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
