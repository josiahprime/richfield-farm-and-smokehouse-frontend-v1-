'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductInfo from "../../../../../sections/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../../../../sections/pageProps/productDetails/ProductsOnSale";
import { useProductStore } from "store/product/useProductStore";
import ProductTabs from "../../../../../sections/pageProps/productDetails/ProductTabs";
import ProductReviews from "../../../../../sections/pageProps/productDetails/ProductReviews";
import ProductFAQs from "../../../../../sections/pageProps/productDetails/ProductFaq";
import ProductDetailsSection  from "../../../../../sections/pageProps/productDetails/ProductDetailsSection";

const ProductDetails = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("details"); // 👈 state for controlling tabs

  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const isLoading = useProductStore((state) => state.isLoading);

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts]);

  useEffect(() => {
    if (products && products.length > 0 && id) {
      const foundProduct = products.find((p) => p.id === id);
      setProductInfo(foundProduct || null);
    }
  }, [products, id]);

  if (isLoading || !productInfo) {
    return <div className="text-center mt-10 text-gray-600">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto p-4">
        <div className="w-full">
          <div className="xl:col-span-2">
            {/* Product info (main gallery, price, etc.) */}
            <ProductInfo productInfo={productInfo} />

            {/* Tabs for details/reviews/faqs  */}
            <ProductTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              reviews={productInfo.reviews}
            />

            {/* Conditionally render based on the tab */}
            {activeTab === "details" && (
              <ProductDetailsSection  productInfo={productInfo} />
            )}


            {activeTab === "reviews" && (
              <ProductReviews productId={productInfo.id}/>
            )}

            {activeTab === "faqs" && (
              <ProductFAQs/>
            )}

             {/* Products on sale always at bottom */}
            <div className="mt-12">
              <ProductsOnSale />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;