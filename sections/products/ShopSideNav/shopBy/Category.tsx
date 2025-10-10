import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavTitle from "./NavTitle";
import { useProductStore } from "store/product/useProductStore";

const Category = () => {
  const [showCategories, setShowCategories] = useState(true);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const items = [
    { _id: 990, title: "New Arrivals" },
    { _id: 991, title: "Gadgets" },
    { _id: 992, title: "Accessories" },
    { _id: 993, title: "Electronics" },
    { _id: 994, title: "Others" },
  ];

  const handleFilter = (category: string) => {
    fetchProducts({ category });
  };

  return (
    <div className="space-y-2">
      <div
        onClick={() => setShowCategories((prev) => !prev)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Category" icons />
      </div>

      <AnimatePresence>
        {showCategories && (
          <motion.ul
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 text-sm lg:text-base text-gray-600"
          >
            {items.map((item) => (
              <li
                key={item._id}
                onClick={() => handleFilter(item.title.toLowerCase())}
                className="cursor-pointer text-lg px-2 py-2 rounded-xl border border-transparent hover:border-gray-300 hover:bg-gray-50 hover:text-primeColor transition-all duration-200"
              >
                {item.title}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Category;
