import React, { useState, useEffect } from "react";
import Button from "app/components/Button/Button";
import toast from "react-hot-toast";
import { formatCurrency } from "utils/FormatCurrency";
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft, ArrowRight } from "lucide-react";
import { useCartStore } from "store/cart/useCartStore";
import { useProductStore } from "store/product/useProductStore";
import { useAuthStore } from "store/auth/useAuthStore";
import Badge from "app/components/Badge/Badge";
import type { Product } from "store/product/productTypes";


interface ProductInfoProps {
  productInfo: Product;
}

  const ProductInfo: React.FC<ProductInfoProps> = ({ productInfo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);


  const [selectedImage, setSelectedImage] = useState<string>("");

  

  const userId = useAuthStore((state)=>state.authUser?.id)
  const addToCart = useCartStore((state) => state.addToCart);


  const favorites = useProductStore((state)=> state.favorites)
  const toggleFavorites = useProductStore((state)=>state.toggleFavorite)

  useEffect(() => {
    if (productInfo.images[0]?.url) {
      setSelectedImage(productInfo.images[0].url);
    }
  }, [productInfo.images]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % productInfo.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [productInfo.images.length]);

  useEffect(() => {
    setSelectedImage(productInfo.images[index]?.url || "");
  }, [index, productInfo.images]);


   useEffect(() => {
    // ✅ Check if the product is already in favorites
    const exists = favorites.some((fav) => fav.id === productInfo.id);
    setIsFavorite(exists);
  }, [favorites, productInfo.id]);

  

  // const handleAddToCart = () => {
  //   toast.success(`${productInfo.productName} added to cart! Quantity: ${quantity}`);
  // };

  // ✅ FIXED FUNCTION
  const handleAddToCart = () => {
    addToCart({
      id: productInfo.id,           // satisfies CartItem.id
      productId: productInfo.id,    // backend-friendly field
      productName: productInfo.productName,
      image: productInfo.images?.[0]?.url || "", // avoid empty src errors
      priceInKobo: productInfo.priceInKobo,
      quantity,
      unitType: productInfo.unitType,
    });

    toast.success(`${productInfo.productName} added to cart!`);
  };



  const handleWishlist = async () => {
    if (!userId) {
      toast.error("You must be logged in to add to wishlist");
      return;
    }

    try {
      await toggleFavorites(userId, productInfo.id);
      setIsFavorite(!isFavorite);
      toast.success(
        !isFavorite
          ? `${productInfo.productName} added to your wishlist ❤️`
          : `${productInfo.productName} removed from wishlist 💔`
      );
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      toast.error("Something went wrong while updating your wishlist.");
    }
  };



  

  const nextImage = () => setIndex((index + 1) % productInfo.images.length);
  const prevImage = () => setIndex(index === 0 ? productInfo.images.length - 1 : index - 1);

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/30 shadow-xl lg:h-[600px] flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 flex-1">
          
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative group rounded-2xl shadow-neumorphic overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={productInfo.productName}
                  className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}


              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              >
                <ArrowLeft className="w-3 h-3 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              >
                <ArrowRight className="w-3 h-3 text-gray-700" />
              </button>

              {/* Sale Badge */}
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 text-xs font-semibold">
                  25% OFF
                </Badge>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 justify-center mt-2">
              {productInfo.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedImage(img.url || "");
                    setIndex(i);
                  }}

                  className={`rounded-lg transition-all duration-300 hover:scale-105 ${
                    selectedImage === img.url ? "ring-2 ring-green-500 shadow-lg" : "ring-1 ring-gray-200 hover:ring-gray-300"
                  }`}
                >
                  <img src={img.url} alt="Thumbnail" className="w-12 h-12 object-cover rounded-lg" />
                </button>
              ))}
            </div>

            {/* Image indicators */}
            <div className="flex justify-center gap-1 mt-2">
              {productInfo.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === i ? "bg-green-500 w-4" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-2.5">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {productInfo.productName}
            </h1>

              <div className="flex items-center gap-2">
                {renderStars(productInfo.rating ?? 0)}
                <span className="text-xs font-medium text-gray-600">
                  {productInfo.rating ?? 0}
                </span>
              </div>


            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                {formatCurrency(productInfo.priceInKobo)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(productInfo.priceInKobo + 8333)}
              </span>
              <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 text-xs">
                Save ₦833
              </Badge>
            </div>

            <p className="text-gray-600 leading-relaxed text-xs">{productInfo.description}</p>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl shadow-neumorphic border border-gray-200/50 bg-white/80">
              {/* <div>
                <span className="text-xs font-semibold text-gray-700">Brand:</span>
                <p className="text-gray-600 text-xs">{productInfo.brand}</p>
              </div> */}
              <div>
                <span className="text-xs font-semibold text-gray-700">Category:</span>
                <p className="text-gray-600 text-xs">{productInfo.category}</p>
              </div>
              {/* <div>
                <span className="text-xs font-semibold text-gray-700">Weight:</span>
                <p className="text-gray-600 text-xs">{productInfo.weight}</p>
              </div> */}
              <div>
                <span className="text-xs font-semibold text-gray-700">Stock:</span>
                <p className="text-green-600 font-medium text-xs">In Stock</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-200 transition-all text-gray-700 text-sm font-semibold active:scale-95"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-gray-800 bg-white select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-200 transition-all text-gray-700 text-sm font-semibold active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-xs"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>

                <Button
                  onClick={handleWishlist}
                  variant="outline" // always a valid variant
                  className={`flex-1 py-2 rounded-xl border-2 transition-all duration-300 text-xs flex items-center justify-center ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-600" // "filled" style
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  <Heart className={`w-3 h-3 mr-1 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                  {isFavorite ? "In Wishlist" : "Add to Wishlist"}
                </Button>

                <Button variant="outline" className="px-2 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all">
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-xs">
                Buy Now
              </Button>
              <div className="flex items-center gap-4 pt-2 border-t border-gray-200 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-green-600" /> Free Shipping
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-600" /> Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;




// import React, { useState, useEffect } from "react";
// import Button from "app/components/Button/Button";
// import toast from "react-hot-toast";
// import { formatCurrency } from "utils/FormatCurrency";
// import { useAuthStore } from "store/auth/useAuthStore";
// import {
//   ShoppingCart,
//   Heart,
//   Share2,
//   Star,
// } from "lucide-react";
// import { useCartStore } from "store/cart/useCartStore";
// import { useProductStore } from "store/product/useProductStore";
// import Badge from "app/components/Badge/Badge";

// const ProductInfo = ({ productInfo }) => {
//   const [selectedImage, setSelectedImage] = useState(productInfo.images[0].url);
//   const userId = useAuthStore((state)=>state.authUser?.id)
//   const addToCart = useCartStore((state) => state.addToCart);


//   const favorites = useProductStore((state)=> state.favorites)
//   const toggleFavorites = useProductStore((state)=>state.toggleFavorite)

//   const [index, setIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // ✅ Auto-rotate images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % productInfo.images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [productInfo.images.length]);

//   useEffect(() => {
//     setSelectedImage(productInfo.images[index]);
//   }, [index, productInfo.images]);

//   // ✅ Detect if product is already in favorites
//   useEffect(() => {
//     const exists = favorites.some((fav) => fav.id === productInfo.id);
//     setIsFavorite(exists);
//   }, [favorites, productInfo.id]);

//   // ✅ This now triggers your store’s toggleFavorites
//   const handleWishlist = async () => {
//     try {
//       await toggleFavorites(userId, productInfo.id);
//       setIsFavorite(!isFavorite);
//       toast.success(
//         !isFavorite
//           ? `${productInfo.productName} added to your wishlist ❤️`
//           : `${productInfo.productName} removed from wishlist 💔`
//       );
//     } catch (err) {
//       console.error("Error toggling wishlist:", err);
//       toast.error("Something went wrong while updating your wishlist.");
//     }
//   };

//   const handleAddToCart = () => {
//     const product = {
//       id: productInfo.id,
//       productName: productInfo.productName,
//       image: productInfo.images?.[0]?.url,
//       priceInKobo: productInfo.priceInKobo,
//       quantity,
//       unitType: productInfo.unitType,
//     };

//     addToCart(product);
//     toast.success(`${productInfo.productName} added to cart!`);
//   };

//   const nextImage = () => setIndex((index + 1) % productInfo.images.length);
//   const prevImage = () =>
//     setIndex(index === 0 ? productInfo.images.length - 1 : index - 1);

//   const renderStars = (rating) => (
//     <div className="flex gap-1">
//       {[...Array(5)].map((_, i) => (
//         <Star
//           key={i}
//           className={`w-3 h-3 ${
//             i < Math.floor(rating)
//               ? "fill-yellow-400 text-yellow-400"
//               : "text-gray-300"
//           }`}
//         />
//       ))}
//     </div>
//   );

//   return (
//     <div className="w-full">
//       <div className="max-w-screen-xl mx-auto rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/30 shadow-xl lg:h-[600px] flex flex-col">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 flex-1">
//           {/* ... Gallery code unchanged ... */}

//           {/* Product Details */}
//           <div className="flex flex-col space-y-2.5">
//             <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               {productInfo.productName}
//             </h1>

//             {/* Wishlist + Add to Cart */}
//             <div className="flex flex-wrap gap-2 mt-2">
//               <Button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-xs"
//               >
//                 <ShoppingCart className="w-3 h-3 mr-1" />
//                 Add to Cart
//               </Button>

//               <Button
//                 onClick={handleWishlist}
//                 variant={isFavorite ? "filled" : "outline"}
//                 className={`flex-1 py-2 rounded-xl border-2 transition-all duration-300 text-xs flex items-center justify-center ${
//                   isFavorite
//                     ? "bg-red-50 border-red-200 text-red-600"
//                     : "hover:bg-gray-50 border-gray-300"
//                 }`}
//               >
//                 <Heart
//                   className={`w-3 h-3 mr-1 ${
//                     isFavorite ? "fill-current text-red-500" : ""
//                   }`}
//                 />
//                 {isFavorite ? "In Wishlist" : "Add to Wishlist"}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="px-2 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all"
//               >
//                 <Share2 className="w-3 h-3" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;

