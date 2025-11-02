import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import useProductStore from "../../store/useProductStore"; // Import the product store


const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const { products, isLoading, fetchProducts, error } = useProductStore(); // Access the store state and actions


  console.log('id', id)

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts(); // Fetch products from the store if not already fetched
    }
  }, [fetchProducts, products]);


 

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find((p) => p.id === id);
      console.log("foundProduct", foundProduct);

      if (foundProduct) {
        setProductInfo(foundProduct);
      } else {
        setProductInfo(null); // Ensure to handle missing product
      }

      setPrevLocation(`/product/${id}`);
    }
  }, [id, products]);


  if (!productInfo) {
    return <h1 className="text-center text-2xl font-bold mt-10">Product Not Found</h1>;
  }

    
  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="flex">
        <div className="h-full">
          <ProductsOnSale />
        </div>
        <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
          <ProductInfo productInfo={productInfo} />
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;


