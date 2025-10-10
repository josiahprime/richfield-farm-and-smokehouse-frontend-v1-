"use client"
import React,{useEffect} from "react"
import ShopSideNav from "../../../../sections/products/ShopSideNav/ShopSideNav"
import PaginatedProducts from "../../../../sections/products/Pagination/Pagination"
import { useProductStore } from "store/product/useProductStore"
import { useAuthStore } from "store/auth/useAuthStore"
import { ProductState } from "store/product/productTypes"
// import useProductStore from ""


const Product = () => {
  const products = useProductStore((state: ProductState)=>(state.products))
  const isLoading = useProductStore((state: ProductState)=>(state.isLoading))
  const fetchProducts = useProductStore((state: ProductState)=>(state.fetchProducts))
  const error = useProductStore((state: ProductState)=>(state.error))
  const userId = useAuthStore((state)=>(state.authUser?.id))
  // const { products, isLoading, fetchProducts, error } = useProductStore(); 

  
  useEffect(() => {
    // Pass filters + userId (filters empty by default here)
    fetchProducts({}, userId);
  }, [fetchProducts, userId]); // ✅ include userId so it refetches if user logs in

  console.log("📦 products from the ProductsDB:", products);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  


  return (
    <div className="w-full h-full flex pb-20 ">
       <div className="hidden lg:inline-flex w-[25%] mt-4 h-full">
        <ShopSideNav />
      </div>

      <div className="mx-4 my-4 flex justify-center relative">
        <PaginatedProducts products={products} itemsPerPage={12}/>
      </div>
    </div>
  )
}

export default Product