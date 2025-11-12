"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { formatCurrency } from "utils/FormatCurrency";
import { useCartStore } from "store/cart/useCartStore";
import { useAuthStore } from "store/auth/useAuthStore";
import { useProductStore } from "store/product/useProductStore";
import type { Product } from "store/product/productTypes";
import Image from "next/image";

interface Props {
  product: Product;
}

const getStableRating = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  const random = Math.abs(hash % 100) / 100;
  return Math.min(5, Math.max(3, Math.round(random * 2 + 3)));
};

const MobileProductCard = ({ product }: Props) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(product.isFavorite || false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const toggleFavorite = useProductStore((s) => s.toggleFavorite);
  const authUser = useAuthStore((s) => s.authUser);

  const stableRating = useMemo(() => product.rating || getStableRating(product.id), [product.id, product.rating]);

  const goToProduct = () => router.push(`/products/${product.id}`);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addToCart({
      id: product.id,
      productId: product.id,
      productName: product.productName,
      image: product.images?.[0]?.url || "/placeholder.jpg",
      priceInKobo: product.priceInKobo,
      quantity: 1,
      unitType: product.unitType || "each",
    });
    toast.success(`${product.productName} added to cart 🛒`, { duration: 1500 });
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!authUser?.id) return toast.error("Please log in to save favorites");
    if (isTogglingFavorite) return;

    setIsTogglingFavorite(true);
    try {
      const result = await toggleFavorite(authUser.id, product.id);
      setLocalFavorite(result === "added");
      toast.success(
        result === "added"
          ? `${product.productName} added to wishlist ❤️`
          : `${product.productName} removed from wishlist 💔`
      );
    } catch {
      toast.error("Failed to update wishlist");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 w-60 cursor-pointer hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToProduct}
      whileHover={{ scale: 1.03 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-44">
        <Image
          src={product.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.productName}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Hover icons */}
        <div
          className={`absolute top-2 right-2 flex gap-2 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.button
            whileTap={{ scale: 1.2 }}
            onClick={handleFavoriteToggle}
            disabled={isTogglingFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
              localFavorite ? "bg-red-100 hover:bg-red-200" : "bg-white hover:bg-red-100"
            }`}
          >
            <Heart className={`w-4 h-4 ${localFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 1.1 }}
            onClick={(e) => {
              e.stopPropagation();
              goToProduct();
            }}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-blue-100"
          >
            <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </motion.button>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < stableRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-gray-500">({stableRating})</span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.productName}</h3>
        <p className="text-sm font-bold text-green-600">{formatCurrency(product.priceInKobo)}</p>

        <motion.button
          whileTap={{ scale: 1.1 }}
          onClick={handleAddToCart}
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MobileProductCard;
