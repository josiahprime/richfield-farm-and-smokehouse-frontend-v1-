"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredProducts = products?.filter((item) =>
    item.productName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <div className="relative h-[50px] text-base text-primeColor bg-transparent shadow-md flex items-center justify-between px-2 rounded-xl mb-2 lg:mb-0">
      <div className="relative w-[400px] h-full flex items-center">
        <input
          className="flex-1 h-full border-none outline-none text-sm placeholder-transparent focus:ring-0"
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Animate placeholder */}
        <AnimatePresence>
          {!searchQuery && !isFocused && (
            <motion.span
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4C4C4] text-[14px] pointer-events-none select-none"
            >
              Search your products here
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <FaSearch className="w-5 h-5 ml-2 text-gray-400" />

      {searchQuery && (
        <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
          {filteredProducts.length ? (
            filteredProducts.map((item) => (
              <div
                key={item.id}
                className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 p-2"
              >
                <img className="w-24 object-cover" src={item.images[0].url} alt={item.name} />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-xs">{item.description}</p>
                  <p className="text-sm">
                    Price: <span className="text-primeColor font-semibold">${item.priceInKobo}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-gray-500 p-4">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
