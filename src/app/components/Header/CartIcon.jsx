import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from 'store/cart/useCartStore';

const CartIcon = () => {
  const items = useCartStore((state) => state.items);
  const guestItems = useCartStore((state) => state.guestItems);

  const totalCount = items.length + guestItems.length;

  return (
    <Link href="/cart" className="relative text-2xl text-gray-700">
      <div className="item flex items-center mr-5 relative cursor-pointer">
        <div className="p-2 rounded-md transition-all duration-300 hover:bg-gray-200">
          <ShoppingCart className="icon text-lg" />
        </div>

        {totalCount > 0 && (
          <div className="counter w-[15px] h-[15px] bg-red-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold absolute right-1 bottom-5">
            {totalCount}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
