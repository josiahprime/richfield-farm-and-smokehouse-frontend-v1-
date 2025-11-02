"use client";

import { ShoppingCart } from "lucide-react";
import Badge from "app/components/Badge/Badge";
import Button from "app/components/Button/Button";
import { formatCurrency } from "utils/FormatCurrency";
import { format, isToday, isTomorrow } from "date-fns";
import { useCartStore } from "store/cart/useCartStore";
import { toast } from "react-hot-toast";
import type { DailyDeal } from "store/product/productTypes";
import Image from "next/image";

interface FlashDealCardProps {
  deal: DailyDeal;
}

const FlashDealCard = ({ deal }: FlashDealCardProps) => {
  // console.log('deal from flash deal card', deal)
  const addToCart = useCartStore((s) => s.addToCart);
  const { product } = deal;
  // console.log('deal from product card', deal)

  // const discountValue = product.discount?.value ?? 0;
  const discountValue = product.discount?.value ?? 0;

  // original and discounted prices (priceInKobo is actually Naira per your setup)
  const originalPrice = product.priceInKobo;
  const discountedPrice = discountValue
    ? Math.round(originalPrice - (originalPrice * discountValue) / 100)
    : originalPrice;

  // first image -> use the same key "image" your ProductCard expects
  const mainImage = product.images?.[0]?.url || "/placeholder.jpg";

  // expiry formatting
  let formattedExpiry: string | null = null;
  if (deal.expiresAt) {
    const expiryDate = new Date(deal.expiresAt);
    if (isToday(expiryDate)) {
      formattedExpiry = `Today at ${format(expiryDate, "hh:mm a")}`;
    } else if (isTomorrow(expiryDate)) {
      formattedExpiry = `Tomorrow at ${format(expiryDate, "hh:mm a")}`;
    } else {
      formattedExpiry = format(expiryDate, "MMM d, hh:mm a");
    }
  }

  // Build cart item using the SAME shape ProductCard uses
  const buildCartItem = () => ({
    id: product.id,
    productId: product.id,  
    productName: product.productName,
    image: mainImage,
    priceInKobo: discountedPrice,     // NOTE: this is discounted price (same field name)
    quantity: 1,
    unitType: product.unitType || "each",
    discountId: product.discount?.id || undefined,

    // optional metadata for merging/analytics
    fromDeal: true,
    dealId: deal.id,
    originalPriceInKobo: originalPrice,
  });

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.preventDefault?.();
    const cartItem = buildCartItem();
    addToCart(cartItem);
    toast.success(`${product.productName} added to cart`, {
      icon: "🛒",
      duration: 1800,
      style: { borderRadius: 8, background: "#111", color: "#fff" },
    });
  };

  return (
    <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow">
      {/* Image & Badges */}
      <div className="relative mb-4">
        <div className="relative w-full h-40 rounded-lg overflow-hidden">
          <Image
            src={mainImage || "/placeholder.jpg"}
            alt={product.productName}
            fill
            className="object-cover rounded-lg"
            sizes="100vw"
          />
        </div>

        <div className="absolute top-2 left-2 flex gap-1">
          {discountValue > 0 && (
            <Badge className="bg-red-500 text-white text-xs">
              {product.discount?.label || `-${discountValue}%`}
            </Badge>
          )}
          {product.displayLabel && (
            <Badge className="bg-green-500 text-white text-xs">
              {product.displayLabel.replace("_", " ")}
            </Badge>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {product.productName}
      </h3>

      {/* Category */}
      <p className="text-xs text-gray-500 capitalize mb-3">
        {product.category.replace("-", " ")}
      </p>

      {/* Pricing + add-to-cart */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-green-600">
            {formatCurrency(discountedPrice)}
          </span>
          {discountValue > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>

        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-3 h-3" />
        </Button>
      </div>

      {/* Expiry */}
      {formattedExpiry && (
        <span className="text-[10px] text-gray-400 block text-right">
          Expires: {formattedExpiry}
        </span>
      )}
    </div>
  );
};

export default FlashDealCard;
