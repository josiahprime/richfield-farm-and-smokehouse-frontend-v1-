import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../home/Products/Product";

const PaginatedProducts = ({ products, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  console.log("📦 products prop in PaginatedProducts:", products);

  if (!Array.isArray(products)) {
    return <div>No products available.</div>;
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
      

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <ReactPaginate
          previousLabel="←"
          nextLabel="→"
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2 text-base font-semibold"
          activeClassName="bg-black text-white px-3 py-1 rounded"
          pageLinkClassName="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
        />
      </div>
    </div>
  );
};

export default PaginatedProducts;
