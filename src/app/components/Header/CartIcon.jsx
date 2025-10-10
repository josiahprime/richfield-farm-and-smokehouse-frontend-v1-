import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from 'store/cart/useCartStore';

const CartIcon = () => {
  const cartItems = useCartStore((state) => state.items);
  return (
    <Link href="/cart" className="relative text-2xl text-gray-700">
      <div className="item flex items-center mr-5  relative cursor-pointer">
        <div className=' p-2 rounded-md transition-all duration-300 hover:bg-gray-200'>
          <ShoppingCart className="icon text-lg" />
        </div>
        
        <div className="counter w-[15px] h-[15px]  bg-red-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold absolute right-1 bottom-5 ">
          {cartItems.length}
        </div>
      </div>
      {/* Add a badge if you want */}
      {/* <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">2</span> */}
    </Link>
  );
};

export default CartIcon;
