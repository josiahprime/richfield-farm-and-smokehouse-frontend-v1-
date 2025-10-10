"use client";

import { Leaf, ShoppingCart } from "lucide-react";
import Badge from "app/components/Badge/Badge";
import Button from "app/components/Button/Button";
import { formatCurrency } from "utils/FormatCurrency";

interface FlashDealCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    discount: number;
    sold: number;
    weight: string;
    freshness: string;
    organic: boolean;
  };
}

const FlashDealCard = ({ product }: FlashDealCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow">
      {/* Image & Badges */}
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge className="bg-red-500 text-white text-xs">
            -{product.discount}%
          </Badge>
          {product.organic && (
            <Badge className="bg-green-500 text-white text-xs flex items-center gap-1">
              <Leaf className="w-2 h-2" />
              Organic
            </Badge>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {product.name}
      </h3>

      {/* Weight & Freshness */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Weight: {product.weight}</span>
          <span className="text-green-600 font-medium">{product.freshness}</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-bold text-green-600">
          {formatCurrency(product.price)}
        </span>
        <span className="text-sm text-gray-500 line-through">
          {formatCurrency(product.originalPrice)}
        </span>
      </div>

      {/* Footer: Sold & Add to Cart */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">{product.sold} sold</span>
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
          <ShoppingCart className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default FlashDealCard;
