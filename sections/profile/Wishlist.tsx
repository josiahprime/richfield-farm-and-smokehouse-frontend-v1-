"use client";

import React, { useEffect, useState } from "react";
import { Heart, Loader2, Trash2 } from "lucide-react";
import { useProductStore } from "store/product/useProductStore";
import { useAuthStore } from "store/auth/useAuthStore";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  const fetchFavorites = useProductStore((state) => state.fetchFavorites);
  const favorites = useProductStore((state) => state.favorites);
  const loading = useProductStore((state) => state.isLoading);
  const userId = useAuthStore((state) => state.authUser?.id);

  useEffect(() => {
    if (!userId) return;
    fetchFavorites(userId);
  }, [userId, fetchFavorites]);

  // Pagination logic
  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = favorites.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-xl mb-8 bg-gradient-to-r from-green-600 to-emerald-700 p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 text-white p-3 rounded-full shadow-md">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
            <p className="text-sm text-gray-600 mt-1">
              Keep track of your favorite items — don’t lose sight of what you love.
            </p>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-600">
          {favorites.length} {favorites.length === 1 ? "item" : "items"}
        </div>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-100 mb-4" />
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        // EMPTY STATE
        <div className="flex flex-col items-center justify-center py-12 text-center text-black/60">
          <Heart className="w-12 h-12 text-green-100 mb-4" />
          <div className="text-lg font-medium mb-2">Your wishlist is empty</div>
          <div className="max-w-[480px]">
            Add items you love to your wishlist to find them later.
          </div>
        </div>
      ) : (
        <>
          {/* ITEMS LIST */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="w-full bg-white border border-gray-200 rounded-2xl p-3 flex flex-col shadow-sm hover:shadow-md transition relative"
              >
                <div className="absolute top-3 right-3">
                  <button
                    className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-full transition"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold truncate">{item.productName}</h3>
                <p className="text-black/60 text-sm mt-1 line-clamp-2">{item.description}</p>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-lg font-bold">
                    ₦{(item.priceInKobo / 100).toLocaleString()}
                  </div>
                  <button
                    onClick={() => router.push(`/products/${item.id}`)}
                    className="px-4 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
