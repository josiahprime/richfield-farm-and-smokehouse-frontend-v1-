"use client";

import { motion } from "framer-motion";
import { Users, Store, Heart } from "lucide-react";
import Image from "next/image";
import DemoNotice from "app/components/DemoNotice";

type Seller = {
  id: number;
  name: string;
  category: string;
  image: string;
};

export default function Sellers() {
  const sellers: Seller[] = [
    {
      id: 1,
      name: "Green Market",
      category: "Organic Foods",
      image: "https://images.unsplash.com/photo-1606813903273-47e5c0c9a9f7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Nature’s Harvest",
      category: "Fresh Produce",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Eco Living Hub",
      category: "Sustainable Products",
      image: "https://images.unsplash.com/photo-1524594154908-edd333f19f31?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Farmville",
      category: "Local Farmers",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Wellness Co.",
      category: "Health & Wellness",
      image: "https://images.unsplash.com/photo-1580910051070-dc71d4a01b40?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Pure Organics",
      category: "Beauty & Care",
      image: "https://images.unsplash.com/photo-1600180758890-6f4a6f2a8e9e?auto=format&fit=crop&w=400&q=80",
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
          <Users className="text-emerald-600" />
          Followed Sellers
        </h1>

        {/* Empty state */}
        {sellers.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl shadow p-10 text-center border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Store className="mx-auto mb-3 w-12 h-12 text-emerald-500" />
            <p className="text-gray-700 text-lg mb-4">
              You haven’t followed any sellers yet.
            </p>
            <button
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition"
              onClick={() => alert("Demo Mode — Browse sellers not enabled.")}
            >
              Browse Sellers
            </button>
          </motion.div>
        ) : (
          // Sellers Grid
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {sellers.map((seller) => (
              <motion.div
                key={seller.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition flex flex-col items-center text-center"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border border-emerald-100">
                  <Image
                    src={seller.image}
                    alt={seller.name}
                    fill
                    sizes="100px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {seller.name}
                </h3>
                <p className="text-gray-600 text-sm">{seller.category}</p>
                <button
                  onClick={() => alert("Demo Mode — Unfollow not enabled.")}
                  className="mt-3 flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition"
                >
                  <Heart className="w-4 h-4" />
                  Unfollow
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
