"use client";

import ProductCardSkeleton from "app/components/ui/ProductCardSkeleton";
import ShopSideNav from "../../../../sections/products/ShopSideNav/ShopSideNav";
import MobileCategoryNav from "../../../../sections/products/ShopSideNav/ScrollBar";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row pb-20">
      <div className="hidden lg:inline-flex w-[50%] max-w-[400px] mt-4 h-full shrink-0">
        <ShopSideNav />
      </div>

      <MobileCategoryNav />

      <div className="grid flex-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:px-0 mb-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
