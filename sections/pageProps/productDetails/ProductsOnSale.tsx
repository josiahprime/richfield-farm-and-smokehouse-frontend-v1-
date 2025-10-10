'use client';
import React from "react";
import Badge from "app/components/Badge/Badge";
import Button from "app/components/Button/Button";
import { ShoppingCart, Star } from "lucide-react";

const productsOnSale = [
  {
    id: "ghT-06Qv-90V-004",
    name: "Fresh Fish",
    description: "Freshly caught fish.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
    priceInKobo: 270000,
    originalPrice: 360000,
    rating: 4.5,
    category: "Seafood"
  },
  {
    id: "ghT-06Qv-90V-003",
    name: "6kg Spiced Crabs",
    description: "Delicious and spiced crabs.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
    priceInKobo: 600000,
    originalPrice: 750000,
    rating: 4.8,
    category: "Seafood"
  },
  {
    id: "ghT-06Qv-90V-002",
    name: "4kg Fresh Shrimps",
    description: "High-quality fresh shrimps.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
    priceInKobo: 350000,
    originalPrice: 450000,
    rating: 4.6,
    category: "Seafood"
  },
  {
    id: "ghT-06Qv-90V-001",
    name: "Basket of Tomatoes",
    description: "Organic and fresh tomatoes.",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
    priceInKobo: 250000,
    originalPrice: 320000,
    rating: 4.7,
    category: "Vegetables"
  },
  {
    id: "ghT-06Qv-90V-000",
    name: "2kg Red Beef",
    description: "Freshly cut premium red beef.",
    image: "https://images.unsplash.com/photo-1588347818108-9d6c0c9d3c86?w=400&h=300&fit=crop",
    priceInKobo: 300000,
    originalPrice: 400000,
    rating: 4.9,
    category: "Meat"
  }
];

const ProductsOnSale = () => {
  const formatCurrency = (priceInKobo: number) => `₦${(priceInKobo / 100).toLocaleString()}`;
  const getDiscountPercentage = (original: number, current: number) =>
    Math.round(((original - current) / original) * 100);

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Products on Sale
        </h3>
        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs">Hot Deals</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {productsOnSale.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-200/30 shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-500 text-white text-xs px-1 py-0.5">
                  -{getDiscountPercentage(item.originalPrice, item.priceInKobo)}%
                </Badge>
              </div>
            </div>

            <div className="p-3 flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors truncate">
                {item.name}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between mt-1">
                {renderStars(item.rating)}
                <span className="text-xs text-gray-600">{item.rating}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-green-600 font-bold text-sm">{formatCurrency(item.priceInKobo)}</span>
                  <span className="text-gray-400 text-xs line-through">{formatCurrency(item.originalPrice)}</span>
                </div>
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white shadow-lg px-2 py-1 h-6 text-xs"
                >
                  <ShoppingCart className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
