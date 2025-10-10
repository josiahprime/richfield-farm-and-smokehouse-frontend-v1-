"use client"
import { Menu } from 'lucide-react';
import MobileCategoryBar from './ScrollBar';
import MobileSidebar from './MobileSidebar';
import SaleBanner from './SaleBanner';
import Logo from './Logo';
import { NavLinks } from './NavLinks';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';
import { useUiStore } from 'store/ui/useUiStore';
// import ProfileSwitcher from './ProfileSwitcher';
import UserIcon from './ProfileSwitcher'
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import { useAuthStore } from 'store/auth/useAuthStore';
import { useProductStore } from 'store/product/useProductStore';
import { ProductState } from 'store/product/productTypes';
import { useEffect, useState } from 'react';
import Notifications from './Notifications';



const Header = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)
  const products = useProductStore((state: ProductState)=>(state.products))
  const fetchProducts = useProductStore((state: ProductState)=>(state.fetchProducts))
  const { toggleSidebar, isSidebarOpen, openSidebar, closeSidebar } = useUiStore();
  const [isOpen, setIsOpen] = useState(false);
  

    console.log("📦 products from the ProductsDB:", products);
    useEffect(() => {
      if (!products) {
        fetchProducts();
      }
    }, [fetchProducts]);

  
  console.log(authUser)
  return (
    <header className="sticky top-0 z-50 bg-white ">
      <div className='shadow-md'>
        <div className=''>
          <SaleBanner />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:mb-2 lg:px-2 h-20 flex items-center justify-between">
          
          {/* Mobile toggle button */}
          <div className='flex items-center'>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-800 bg-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Logo />
            </div>
          

          {/* Desktop nav */}
          <div className="hidden lg:flex">
            <NavLinks />
          </div>

          <MobileSidebar />
          <div className='hidden lg:flex'>
            <SearchBar products={products} />
          </div>
          
          
          
          <div className="items-center gap-4 hidden lg:flex">
            {authUser ? <Notifications/> : ''}
            <ThemeToggle />
            {isCheckingAuth ? <AuthSkeleton /> : (
              authUser ? <CartIcon /> : <LoginButton />
            )}
            

            {/* {authUser ? <CartIcon /> : <LoginButton />} */}
            {/* {!isCheckingAuth && authUser && <ProfileSwitcher />}mains*/}
            {!isCheckingAuth && authUser && <UserIcon />}
          </div>
        </div>
        <div className='flex lg:hidden mt-2 items-center justify-center'>
          <SearchBar products={products} />
        </div>
      
      </div>

      <div className=''>
        <MobileCategoryBar/>
      </div>
    </header>
    
  );
};

export default Header;

//
// AuthSkeleton defined below for local use
//
const AuthSkeleton = () => {
  return (
    <div className="w-28 h-12 flex items-center gap-2 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200" />
      <div className="flex flex-col gap-1">
        <div className="w-16 h-3 bg-gray-200 rounded" />
        <div className="w-12 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
};
