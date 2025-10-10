import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from 'store/cart/useCartStore';
import { useAuthStore } from 'store/auth/useAuthStore';
import { useProductStore } from 'store/product/useProductStore';
import {formatCurrency} from '../../../utils/FormatCurrency'
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';


type Product = {
  productName: string;
  description: string;
  id: string;
  image: string;
  priceInKobo: number
  rating: number;
  unitType: string; // e.g. 'per lb', 'each', etc.
  isFavorite: boolean
};


function ProductCard({
  productName, 
  description, 
  id,
  image, 
  priceInKobo,
  rating = 4.5,
  unitType,
  isFavorite
} : Product) {
  // const addToCart = useCartStore((state) => state.addToCart);
  // const formattedPrice = formatCurrency(priceInKobo);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(isFavorite);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const addToCart = useCartStore((state)=>(state.addToCart))
  const toggleFavorite = useProductStore(state => state.toggleFavorite);
  const authUser = useAuthStore(state => state.authUser)
  const userId = useAuthStore(state => state.authUser?.id);


  // console.log('authuser from product card', userId)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent Link navigation
    setCartClicked(true);
    addToCart({ id, productName,  image, priceInKobo, quantity: 1, unitType});
    toast.success(`${productName} added to cart!`);
    setTimeout(() => setCartClicked(false), 300); // Reset animation
  };

  const handleFavoriteToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isTogglingFavorite) return; // prevent spam clicks
    setIsTogglingFavorite(true);

    try {
      const result = await toggleFavorite(userId, id); // call backend

      if (result === "added") {
        toast.success(`${productName} added to wishlist`);
        setLocalFavorite(true);
      } else {
        toast.success(`${productName} removed from wishlist`);
        setLocalFavorite(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  console.log('is favorite from product card', isFavorite)

  return (
    <Link href={`/products/${id}`} className="block w-[230px] lg:w-[240px] shrink-0 group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col relative">
        <div className="relative">
          { image ? <Image
            src={image}
            alt={productName}
            width={400}  // match your layout's actual width
            height={160} // h-40 = 160px
            className="w-full h-40 object-cover"
          /> : null}

          {/* SALE or NEW tag */}
          <span className={`absolute bottom-2 right-2 text-white text-xs font-bold px-2 py-1 rounded ${priceInKobo < 20 ? 'bg-green-600' : 'bg-red-500'}`}>
            {priceInKobo < 20 ? 'NEW' : 'SALE'}
          </span>

          {/* Favorite Icon (left) */}
          {authUser ? (
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={handleFavoriteToggle}
              disabled={isTogglingFavorite}
              className={`absolute top-2 left-2 rounded-full p-1 shadow-md transition-all 
                ${isTogglingFavorite ? "opacity-50 cursor-not-allowed" : "bg-white bg-opacity-90 hover:bg-opacity-100"}
              `}
            >
              {localFavorite ? (
                <AiFillHeart size={18} className="text-red-600" />
              ) : (
                <AiOutlineHeart size={18} className="text-gray-600" />
              )}
            </motion.button>
          ) : null}


          {/* Cart Icon (right) */}
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={handleAddToCart}
            animate={cartClicked ? { scale: 1.2 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 shadow-md"
          >
            <FiShoppingCart size={18} className="text-teal-900" />
          </motion.button>
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>

          <p className="text-sm text-gray-600 mb-2 line-clamp-3">{description}</p>

          <div className="mt-auto">
            {/* Ratings */}
            <div className="flex items-center mb-2 gap-1 text-yellow-500 text-sm">
              {Array.from({ length: 5 }, (_, i) => (
                <AiFillStar key={i} className={i < Math.round(rating) ? 'fill-current' : 'text-gray-300'} />
              ))}
              <span className="text-gray-500 text-xs ml-1">({rating})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-bold">
                {formatCurrency(priceInKobo)}
                <span className="text-xs text-gray-500 ml-1">/{unitType}</span>
              </span>
              <span className="line-through text-sm text-gray-400">
                {formatCurrency(priceInKobo + 10250)}
              </span>
            </div>

          </div>
        </div>

      </div>
    </Link>
  );
}


export default ProductCard;