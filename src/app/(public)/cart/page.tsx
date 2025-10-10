'use client'
import { useState } from "react";
import { formatCurrency } from "utils/FormatCurrency";
import {useCartStore} from "../../../store/cart/useCartStore";
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, ArrowRight, X } from "lucide-react";
import Link from "next/link";





const CartPage = () => {
//Retrieve cart state and actions from Zustand
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  console.log(cartItems)

  

  const total = cartItems.reduce((sum, item) => sum + item.priceInKobo * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);



  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-32 h-32 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <ShoppingCart className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">Start shopping and add some amazing products to your cart!</p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-2 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
                <p className="text-sm text-gray-600">
                  {totalItems} item{totalItems > 1 ? 's' : ''} • {formatCurrency(total)}
                </p>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-all duration-300 border border-red-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table Section */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-200">
                      <th className="text-left py-6 px-6 font-semibold text-gray-700">#</th>
                      <th className="text-left py-6 px-6 font-semibold text-gray-700">Product</th>
                      <th className="text-center py-6 px-6 font-semibold text-gray-700">Price</th>
                      <th className="text-center py-6 px-6 font-semibold text-gray-700">Quantity</th>
                      <th className="text-center py-6 px-6 font-semibold text-gray-700">Total</th>
                      <th className="text-center py-6 px-6 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-indigo-50/30 transition-all duration-200">
                        <td className="py-6 px-6">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shadow-md">
                              <img 
                                src={item.image} 
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg">{item.productName}</h3>
                              <p className="text-gray-500 text-sm">Premium Quality</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-center">
                          <span className="text-lg font-bold text-gray-800">{formatCurrency(item.priceInKobo)}</span>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center space-x-3">
                            <button
                              onClick={() => decrementQuantity(item.id)}
                              className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-lg text-gray-800 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => incrementQuantity(item.id)}
                              className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-center">
                          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text">
                            {formatCurrency(item.priceInKobo * item.quantity)}
                          </span>
                        </td>
                        <td className="py-6 px-6 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-10 h-10 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all duration-300 flex items-center justify-center group"
                          >
                            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-6">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="bg-white/80 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {index + 1}
                      </div>
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                        <p className="text-indigo-600 font-bold">{formatCurrency(item.priceInKobo)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-lg font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text">
                        {formatCurrency(item.priceInKobo * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg h-fit sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-3 rounded-xl shadow-lg">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
                  <p className="text-gray-600">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-800">{formatCurrency(total)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Subtotal</span>
                    <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="cart/checkout"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-3 group mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products"
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

// import { useState } from "react";
// import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Star } from "lucide-react";
// import Link from "next/link";

// interface CartItem {
//   id: string;
//   productName: string;
//   image: string;
//   priceInKobo: number;
//   quantity: number;
// }

// // Mock cart data for demonstration
// const mockCartItems: CartItem[] = [
//   {
//     id: "1",
//     productName: "Premium Wireless Headphones",
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
//     priceInKobo: 25000,
//     quantity: 1
//   },
//   {
//     id: "2", 
//     productName: "Smart Watch Series 8",
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
//     priceInKobo: 45000,
//     quantity: 2
//   },
//   {
//     id: "3",
//     productName: "Bluetooth Speaker",
//     image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
//     priceInKobo: 15000,
//     quantity: 1
//   }
// ];

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

//   const formatCurrency = (amount: number) => {
//     return (amount / 100).toLocaleString('en-NG');
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.priceInKobo * item.quantity, 0);
//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const incrementQuantity = (id: string) => {
//     setCartItems(items => 
//       items.map(item => 
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decrementQuantity = (id: string) => {
//     setCartItems(items => 
//       items.map(item => 
//         item.id === id && item.quantity > 1 
//           ? { ...item, quantity: item.quantity - 1 } 
//           : item
//       )
//     );
//   };

//   const removeFromCart = (id: string) => {
//     setCartItems(items => items.filter(item => item.id !== id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto px-6">
//           <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
//             <ShoppingCart className="w-16 h-16 text-gray-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
//           <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
//           <Link
//             href="/products"
//             className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
//           >
//             <ShoppingBag className="w-5 h-5" />
//             <span>Start Shopping</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl">
//                 <ShoppingCart className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   Shopping Cart
//                 </h1>
//                 <p className="text-gray-600">{totalItems} item{totalItems > 1 ? 's' : ''} in your cart</p>
//               </div>
//             </div>
//             <button
//               onClick={clearCart}
//               className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl hover:bg-red-200 transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//               <span>Clear All</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-6">
//             {cartItems.map((item) => (
//               <div key={item.id} className="bg-white rounded-3xl p-6 shadow-2xl border border-white/20 group hover:shadow-3xl transition-all duration-300">
//                 <div className="flex flex-col sm:flex-row gap-6">
//                   {/* Product Image */}
//                   <div className="relative">
//                     <img 
//                       src={item.image} 
//                       alt={item.productName}
//                       className="w-32 h-32 object-cover rounded-2xl shadow-lg"
//                     />
//                     <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
//                       {item.quantity}
//                     </div>
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
//                       {item.productName}
//                     </h3>
                    
//                     <div className="flex items-center space-x-1 mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       ))}
//                       <span className="text-sm text-gray-600 ml-2">(4.8)</span>
//                     </div>

//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                       {/* Price */}
//                       <div>
//                         <p className="text-sm text-gray-600">Unit Price</p>
//                         <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                           ₦{formatCurrency(item.priceInKobo)}
//                         </p>
//                       </div>

//                       {/* Quantity Controls */}
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-2">
//                           <button
//                             onClick={() => decrementQuantity(item.id)}
//                             className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
//                           >
//                             <Minus className="w-4 h-4" />
//                           </button>
//                           <span className="mx-4 font-semibold text-lg min-w-[2rem] text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => incrementQuantity(item.id)}
//                             className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
//                           >
//                             <Plus className="w-4 h-4" />
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="w-12 h-12 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center group"
//                         >
//                           <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Total for this item */}
//                     <div className="mt-4 pt-4 border-t border-gray-200">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Subtotal</span>
//                         <span className="text-xl font-bold text-gray-900">
//                           ₦{formatCurrency(item.priceInKobo * item.quantity)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/20 h-fit sticky top-24">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl">
//                   <ShoppingBag className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
//                   <p className="text-sm text-gray-600">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
//                 </div>
//               </div>

//               <div className="space-y-4 mb-8">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-semibold">₦{formatCurrency(total)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-semibold text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax (7.5%)</span>
//                   <span className="font-semibold">₦{formatCurrency(Math.round(total * 0.075))}</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-bold text-gray-900">Total</span>
//                     <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                       ₦{formatCurrency(total + Math.round(total * 0.075))}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Checkout Button */}
//               <Link
//                 href="cart/checkout"
//                 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 group"
//               >
//                 <span>Proceed to Checkout</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>

//               {/* Trust Indicators */}
//               <div className="mt-6 grid grid-cols-2 gap-4">
//                 <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
//                   <ShoppingBag className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//                   <p className="text-xs font-semibold text-blue-800">Free Shipping</p>
//                 </div>
//                 <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
//                   <Star className="w-6 h-6 text-green-600 mx-auto mb-2" />
//                   <p className="text-xs font-semibold text-green-800">Quality Assured</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// "use client"
// import Link from "next/link";
// import {useCartStore} from "../../../store/cart/useCartStore";
// import { formatCurrency } from "utils/FormatCurrency";
// import { FaTrashAlt } from "react-icons/fa";

// const Cart = () => {
//   // Retrieve cart state and actions from Zustand
//   const cartItems = useCartStore((state) => state.items);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);
//   const clearCart = useCartStore((state) => state.clearCart);
//   const incrementQuantity = useCartStore((state) => state.incrementQuantity);
//   const decrementQuantity = useCartStore((state) => state.decrementQuantity);

//   console.log(cartItems);

//   // Calculate total price
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.priceInKobo * item.quantity,
//     0
//   );

//   return (
//     <div className="bg-white py-12">
//       <div className="max-w-6xl mx-auto p-6 text-slate-600">
//         {cartItems.length === 0 ? (
//           <div className="grid place-content-center bg-white px-4">
//             <div className="text-center">
//               <h1 className="text-9xl font-black text-gray-300 mb-10">Ops!</h1>
//               <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                 No item in the cart
//               </p>
//               <Link
//                 href="/products"
//                 className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
//               >
//                 Add Product
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Table for larger screens */}
//             <div className="hidden md:block">
//               <table className="w-full table-auto border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-3 border border-gray-300">S.N.</th>
//                     <th className="p-3 border text-left border-gray-300">Image</th>
//                     <th className="p-3 border border-gray-300 text-left">Product</th>
//                     <th className="p-3 border border-gray-300">Unit Price</th>
//                     <th className="p-3 border border-gray-300">Quantity</th>
//                     <th className="p-3 border border-gray-300">Total Price</th>
//                     <th className="p-3 border border-gray-300">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cartItems.map((item, index) => (
//                     <tr key={item.id}>
//                       <td className="p-3 border border-gray-300 text-center">{index + 1}</td>
//                       <td className="p-3 border border-gray-300 text-center">
//                         <img
//                           src={item.image}
//                           alt={item.productName}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       </td>
//                       <td className="p-3 border border-gray-300">{item.productName}</td>
//                       <td className="p-3 border border-gray-300 text-center">
//                         ₦{formatCurrency(item.priceInKobo)}
//                       </td>
//                       <td className="border border-gray-300 text-center">
//                         <div className="border rounded-full p-2 w-44 mx-auto">
//                           <button
//                             className="w-10 py-1 text-white bg-teal-900 rounded-md hover:bg-teal-950"
//                             onClick={() => decrementQuantity(item.id)}
//                           >
//                             -
//                           </button>
//                           <span className="mx-2">{item.quantity}</span>
//                           <button
//                             className="w-10 py-1 text-white bg-teal-900 rounded-md hover:bg-teal-950"
//                             onClick={() => incrementQuantity(item.id)}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </td>
//                       <td className="p-3 border border-gray-300 text-center">
//                         ₦{formatCurrency(item.priceInKobo * item.quantity)}
//                       </td>
//                       <td className="p-3 border border-gray-300 text-center">
//                         <button
//                           className="text-slate-700 text-2xl"
//                           onClick={() => removeFromCart(item.id)}
//                         >
//                           <FaTrashAlt className="text-xl text-red-500"/>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Cards for mobile view */}
//             <div className="md:hidden space-y-4">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col sm:flex-row items-center gap-4 border border-gray-300 p-4 rounded-lg"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.productName}
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <h2 className="text-lg font-bold">{item.productName}</h2>
//                     <p>Unit Price: ₦{formatCurrency(item.priceInKobo)}</p>
//                     <p>Total: ₦{formatCurrency(item.priceInKobo * item.quantity)}</p>
//                     <div className="flex items-center mt-2">
//                       <button
//                         className="px-2 text-white bg-green-500 rounded"
//                         onClick={() => decrementQuantity(item.id)}
//                       >
//                         -
//                       </button>
//                       <span className="mx-2">{item.quantity}</span>
//                       <button
//                         className="px-2 text-white bg-orange-500 rounded"
//                         onClick={() => incrementQuantity(item.id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <button onClick={() => removeFromCart(item.id)}>
//                     <FaTrashAlt className="text-xl text-red-500" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Footer actions */}
//             <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
//               <button
//                 className="px-6 py-2 bg-red-600 text-white rounded shadow w-full sm:w-auto"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//               <div className="flex items-center text-base font-bold text-green-600">
//                 Quantity ({cartItems.length} Items):
//                 <div className="mx-3 text-xl">₦ {formatCurrency(total)}</div>
//               </div>
//               <Link
//                 href="cart/checkout"
//                 className="px-8 py-3 bg-green-600 text-white rounded shadow w-full sm:w-auto"
//               >
//                 Check Out
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
