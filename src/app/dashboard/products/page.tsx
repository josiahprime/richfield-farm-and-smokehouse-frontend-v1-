"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "../components/ProductsCard/ProductsCard";
import { useProductStore } from "store/product/useProductStore";




const Products = () => {
  const products = useProductStore((state)=>(state.products))
  const fetchProducts = useProductStore((state)=>(state.fetchProducts))
  const deleteProduct = useProductStore((state)=>(state.deleteProduct))
  const router = useRouter();

  useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);

    console.log(products)

  const handleEdit = (id: number) => {
    console.log(`item ${id} was edited`);
    router.push(`/dashboard/products/edit-product/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id); // Wait for delete to finish
      console.log(`Item ${id} was deleted`);
      await fetchProducts();   // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  return (
    <div className="w-full px-4 py-6 md:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm">Manage all your available products below</p>
        </div>
        <Link href="/dashboard/products/add-products">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow transition-all">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            imageUrl={item.images[0]?.url || "/placeholder.jpg"}
            title={item.productName}
            price={item.priceInKobo}
            stock={item.stock}
            description={item.description}
            onEdit={handleEdit}
            onDelete={()=>{handleDelete(item.id)}}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
