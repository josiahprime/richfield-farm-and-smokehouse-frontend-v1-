"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { formatCurrency } from "utils/FormatCurrency";
import { useCartStore } from "store/cart/useCartStore";
import { useAuthStore } from "store/auth/useAuthStore";
import { useProductStore } from "store/product/useProductStore";
import { Product } from "store/product/productTypes";
import Image from "next/image";




interface Props {
  product: Product;
}

// Utility: generate consistent pseudo-random rating
const getStableRating = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const random = Math.abs(hash % 100) / 100;
  return Math.min(5, Math.max(3, Math.round(random * 2 + 3)));
};

const PopularProductCard = ({ product }: Props) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(product.isFavorite || false);

  const addToCart = useCartStore((s) => s.addToCart);
  const toggleFavorite = useProductStore((s) => s.toggleFavorite);
  const authUser = useAuthStore((s) => s.authUser);


  const stableRating = useMemo(
    () => product.rating || getStableRating(product.id),
    [product.id, product.rating]
  );

  // Build cart item
  const buildCartItem = () => ({
    id: product.id,
    productId: product.id,  
    productName: product.productName,
    image: product.images?.[0]?.url || "/placeholder.jpg",
    priceInKobo: product.priceInKobo,
    quantity: 1,
    unitType: product.unitType || "each",
  });

  // Add to Cart handler
  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    const cartItem = buildCartItem();
    addToCart(cartItem);
    toast.success(`${product.productName} added to cart 🛒`, {
      duration: 1800,
      style: { borderRadius: 8, background: "#111", color: "#fff" },
    });
  };

  // Favorite handler
  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!authUser?.id) {
      toast.error("Please log in to save favorites");
      return;
    }

    if (isTogglingFavorite) return;

    setIsTogglingFavorite(true);
    try {
      const result = await toggleFavorite(authUser.id, product.id);
      if (result === "added") {
        toast.success(`${product.productName} added to wishlist ❤️`);
        setLocalFavorite(true);
      } else {
        toast.success(`${product.productName} removed from wishlist 💔`);
        setLocalFavorite(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  // Navigate to product details
  const goToProduct = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToProduct}
      whileHover={{ scale: 1.02 }}
    >
      {/* Product Image */}
      <div className="relative">
        <div className="relative w-full h-48">
          <Image
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.productName}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false} // optional: set true if above-the-fold
          />
        </div>

        {/* Hover Icons */}
        <div
          className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {/* Favorite */}
          <motion.button
            whileTap={{ scale: 1.2 }}
            onClick={handleFavoriteToggle}
            disabled={isTogglingFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow ${
              localFavorite
                ? "bg-red-100 hover:bg-red-200"
                : "bg-white hover:bg-red-100"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                localFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.button>

          {/* View */}
          <motion.button
            whileTap={{ scale: 1.1 }}
            onClick={(e) => {
              e.stopPropagation();
              goToProduct();
            }}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-100"
          >
            <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </motion.button>
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
                i < stableRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500">({stableRating})</span>
        </div>

        {/* Product Info */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-green-600">
          {product.productName}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
        <div className="text-xs text-gray-500">Category: {product.category}</div>
        <div className="text-xs text-gray-500">In Stock: {product.stock}</div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-green-600 font-bold text-base">
            {formatCurrency(product.priceInKobo)}
          </span>
          <motion.button
            whileTap={{ scale: 1.2 }}
            onClick={handleAddToCart}
            className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularProductCard;
