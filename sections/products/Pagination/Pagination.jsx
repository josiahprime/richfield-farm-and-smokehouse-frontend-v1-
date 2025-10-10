"use client"
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from '../../../src/app/components/ProductCard/ProductCard'
// import { formatCurrency } from "../../../src/utils/FormatCurrency"


const PaginatedProducts = ({ products, itemsPerPage }) => {
  console.log('main products from pagination',products)
  const [currentPage, setCurrentPage] = useState(0);

  if (!products || !Array.isArray(products)) {
    return <div>Loading products...</div>;
  }
  

  // Calculate the displayed items for the current page
  const offset = currentPage * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);


  
  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      {/* Product List */}
      {/* grid grid-cols-2 lg:grid-cols-4 gap-4 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 lg:gap-6 md:gap-3 lg:px-0 mb-0">
          {currentItems.map((product) => (
            console.log('product from pagination',product),
            <ProductCard
              key={product.id}
              productName={product.productName}
              description={product.description.length > 80 ? `${product.description.slice(0, 80)}...` : product.description}
              id={product.id}
              image={product.images[0]?.url}
              rating={product.rating}
              priceInKobo={product.priceInKobo}
              unitType={product.unitType}
              isFavorite={product.isFavorite}
            />
          ))}
        </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <ReactPaginate
            previousLabel="« Prev"
            nextLabel="Next »"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex space-x-3 text-base font-medium"
            activeClassName="bg-gray-800 text-white border-gray-800"
            pageClassName="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-200 transition"
            previousClassName="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-300 transition"
            nextClassName="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-300 transition"
            disabledClassName="opacity-50 cursor-not-allowed"
        />
        </div>

    </div>
  );
};

export default PaginatedProducts;
