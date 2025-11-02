"use client";

import { Menu } from "lucide-react";
import { useUiStore } from "store/ui/useUiStore";
import { NavLinks } from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import CartIcon from "./CartIcon";
import SaleBanner from "./SaleBanner";
import Logo from "./Logo";
import MobileSidebar from "./MobileSidebar";
import UserIcon from "./ProfileSwitcher";
import LoginButton from "./LoginButton";
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";
import { useAuthStore } from "store/auth/useAuthStore";
import { useProductStore } from "store/product/useProductStore";
import { ProductState } from "store/product/productTypes";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NavbarSkeleton from "../ui/NavbarSkeleton";
import SaleBannerSkeleton from "../ui/SalesBannerSkeleton";

const Header = () => {
  const pathname = usePathname();
  const isProfilePage = pathname === "/account";

  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const products = useProductStore((state: ProductState) => state.products);
  const fetchProducts = useProductStore((state: ProductState) => state.fetchProducts);
  const { toggleSidebar } = useUiStore();

  useEffect(() => {
    if (!products) fetchProducts();
  }, [fetchProducts, products]);

  const hideOnMobile = isProfilePage ? "hidden md:block" : "";
  console.log('is checking auth from header',isCheckingAuth)

  // 👉 If not authenticated and not checking, show skeleton (desktop only)
  if (isCheckingAuth) {
    return (
      <header className={`sticky top-0 z-50 bg-white w-full ${hideOnMobile}`}>
        <div className="hidden lg:block">
          <SaleBannerSkeleton />
          <NavbarSkeleton />
        </div>
        <div className="lg:hidden">
          <div className="shadow-md">
            <div className="flex items-center justify-between px-4 h-16">
              <button
                onClick={toggleSidebar}
                className="text-gray-800 bg-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Logo />
              <CartIcon />
            </div>
          </div>
        </div>
      </header>
    );
  }


  // 👇 Normal navbar (authenticated or checking)
  return (
    <header className={`sticky top-0 z-50 bg-white w-full ${hideOnMobile}`}>
      <div className="shadow-md">
        <div>
          <SaleBanner />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:mb-2 lg:px-2 h-20 flex items-center justify-between">
          {/* Mobile toggle */}
          <div className="flex items-center">
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

          <div className="hidden lg:flex">
            <SearchBar products={products} />
          </div>

          <div className="items-center gap-4 hidden lg:flex">
            {authUser && <Notifications />}
            <ThemeToggle />
            {authUser ? <CartIcon /> : <LoginButton />}
            {!isCheckingAuth && authUser && <UserIcon />}
          </div>

          <div className="md:hidden block">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
