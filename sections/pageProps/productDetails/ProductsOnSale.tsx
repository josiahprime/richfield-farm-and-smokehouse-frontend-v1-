'use client';
import React, { useEffect, useMemo } from 'react';
import { useProductStore } from 'store/product/useProductStore';
import ProductCard from 'app/components/ProductCard/ProductCard';
import { motion } from 'framer-motion';
import Button from 'app/components/Button/Button';

// Utility to shuffle array without mutating the original
const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const ProductsOnSale = () => {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const isLoading = useProductStore((state) => state.isLoading);


  useEffect(() => {
    if (!products?.length) fetchProducts();
  }, [products, fetchProducts]);

  // Shuffle once per render, keep it memoized so it doesn't keep reordering
  const randomizedProducts = useMemo(
    () => shuffleArray(products || []).slice(0, 5),
    [products]
  );


  if (isLoading || !products?.length) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Fetching hot deals...
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Products on Sale
        </h3>
        <span className="px-2 py-1 text-xs rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white">
          Hot Deals
        </span>
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5"
      >
        {randomizedProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            productName={item.productName}
            description={item.description}
            image={item.images?.[0]?.url || "/placeholder.png"}
            priceInKobo={item.priceInKobo}
            rating={item.rating}
            unitType={item.unitType || 'each'}
            isFavorite={item.isFavorite || false}
          />
        ))}
      </motion.div>

      <div className="mt-6 text-center">
        <Button
          variant="outline"
          className="px-6 py-2 rounded-xl border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition"
        >
          View All Sale Items
        </Button>
      </div>
    </div>
  );
};

export default ProductsOnSale;
