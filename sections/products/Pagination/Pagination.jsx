"use client";

import {ProductCard} from "app/components/ProductCard/ProductCard";

import { InfiniteScroll } from "app/components/InfiniteScroll";
import ProductCardSkeleton from "app/components/ui/ProductCardSkeleton";

const PaginatedProducts = ({ products }) => {
  if (!products || !Array.isArray(products)) {
    // Replace spinner with shimmer skeletons
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4 md:px-0 mb-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:px-0 mb-0">
      <InfiniteScroll
        items={products}
        initialItems={8}
        loadCount={4}
        renderItem={(product, index) => (
          <ProductCard
            key={product.id || index}
            productName={product.productName}
            description={
              product.description.length > 80
                ? `${product.description.slice(0, 80)}...`
                : product.description
            }
            id={product.id}
            image={product.images[0]?.url}
            rating={product.rating}
            priceInKobo={product.priceInKobo}
            unitType={product.unitType}
            isFavorite={product.isFavorite}
            discount={product.discount}
          />
        )}
      />
    </div>
  );
};

export default PaginatedProducts;
