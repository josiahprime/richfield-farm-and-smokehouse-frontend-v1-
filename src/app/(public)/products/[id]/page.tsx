'use client';

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import ProductInfo from "../../../../../sections/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../../../../sections/pageProps/productDetails/ProductsOnSale";
import ProductInfoSkeleton from "app/components/ui/ProductInfoSkeleton";
import { useProductStore } from "store/product/useProductStore";
import { useAuthStore } from "store/auth/useAuthStore";
import ProductTabs from "../../../../../sections/pageProps/productDetails/ProductTabs";
import ProductReviews from "../../../../../sections/pageProps/productDetails/ProductReviews";
import ProductFAQs from "../../../../../sections/pageProps/productDetails/ProductFaq";
import ProductDetailsSection from "../../../../../sections/pageProps/productDetails/ProductDetailsSection";

const ProductDetails = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const userId = useAuthStore((state) => state.authUser?.id);


  // ✅ Use individual selectors (no infinite render loops)
  const singleProduct = useProductStore((state) => state.singleProduct);
  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const isLoading = useProductStore((state) => state.isLoading);

  const [activeTab, setActiveTab] = React.useState<
    "details" | "reviews" | "faqs"
  >("details");

  useEffect(() => {
    if (id) {
      fetchProductById(id, userId);
    }
  }, [id, userId, fetchProductById]);

  if (isLoading || !singleProduct) {
    return (
      <ProductInfoSkeleton/>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto p-4">
        <div className="w-full">
          <div className="xl:col-span-2">
            {/* Product info */}
            <ProductInfo productInfo={singleProduct} />

            {/* Tabs */}
            <ProductTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              reviews={singleProduct.reviews}
            />

            {/* Conditional sections */}
            {activeTab === "details" && (
              <ProductDetailsSection productInfo={singleProduct} />
            )}
            {activeTab === "reviews" && (
              <ProductReviews productId={singleProduct.id} />
            )}
            {activeTab === "faqs" && <ProductFAQs />}

            {/* Products on sale */}
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
