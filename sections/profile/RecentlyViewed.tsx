"use client";

import { motion } from "framer-motion";
import { Clock, ShoppingBag } from "lucide-react";
import Image from "next/image";
import DemoNotice from "app/components/DemoNotice";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
};

export default function RecentlyViewed() {
  const products: Product[] = [
    {
      id: 1,
      name: "Bamboo Sunglasses",
      category: "Accessories",
      price: "₦9,500",
      image:
        "https://images.unsplash.com/photo-1617814076281-4e4dbbdf4c54?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Handcrafted Clay Mug",
      category: "Home & Kitchen",
      price: "₦5,200",
      image:
        "https://images.unsplash.com/photo-1615485290357-3c2cc8d0483e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Eco Cotton Tote",
      category: "Fashion",
      price: "₦3,800",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2a?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Minimalist Watch",
      category: "Lifestyle",
      price: "₦22,000",
      image:
        "https://images.unsplash.com/photo-1617052071744-bb1b50b8f3f1?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Organic Cotton Hoodie",
      category: "Clothing",
      price: "₦15,000",
      image:
        "https://images.unsplash.com/photo-1584270354949-1a3d79b93aa6?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-100 to-white p-6">
      {/* 🟡 Floating Demo Mode Notice */}
      <DemoNotice/>

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="text-emerald-600" />
          Recently Viewed
        </h1>

        {/* Empty State */}
        {products.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl shadow p-10 text-center border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShoppingBag className="mx-auto mb-3 w-12 h-12 text-emerald-500" />
            <p className="text-gray-700 text-lg mb-4">
              You haven’t viewed any products yet.
            </p>
            <button
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition"
              onClick={() => alert("Demo Mode — Browse products not enabled.")}
            >
              Browse Products
            </button>
          </motion.div>
        ) : (
          // Products Grid
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition flex flex-col items-center text-center"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative w-32 h-32 rounded-xl overflow-hidden mb-3 border border-emerald-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="150px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <p className="text-emerald-600 font-medium mt-1">
                  {product.price}
                </p>
                <button
                  onClick={() => alert("Demo Mode — View not enabled.")}
                  className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition"
                >
                  View Product
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
