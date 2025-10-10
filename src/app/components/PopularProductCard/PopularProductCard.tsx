"use client";

import { useState } from "react";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";

type Product = {
  id: string;
  productName: string;
  description: string;
  priceInKobo: number;
  images: { url: string }[];
  rating: number;
  category: string;
  stock: number;
};

interface Props {
  product: Product;
}

const PopularProductCard = ({ product }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.productName}
          className="w-full h-48 object-cover"
        />

        {/* Hover Actions */}
        <div
          className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-100">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-100">
            <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-green-600">
          {product.productName}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

        {/* Extra Info */}
        <div className="text-xs text-gray-500">Category: {product.category}</div>
        <div className="text-xs text-gray-500">In Stock: {product.stock}</div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-green-600 font-bold text-base">
            ₦{(product.priceInKobo / 100).toFixed(2)}
          </span>
          <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularProductCard;
