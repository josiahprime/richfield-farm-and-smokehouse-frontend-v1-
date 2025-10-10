import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavTitle from "./NavTitle";
import { useProductStore } from "store/product/useProductStore";
import { ChevronDown, ChevronUp } from "lucide-react";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const brands = [
    { _id: 9006, title: "Vegetables" },
    { _id: 9007, title: "Fruits" },
    { _id: 9008, title: "Grains" },
    { _id: 9009, title: "Tubers" },
    { _id: 9010, title: "Legumes" },
    { _id: 9011, title: "Organic Produce" },
  ];

  const handleFilter = (category: string) => {
    fetchProducts({ category });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="flex items-center justify-between cursor-pointer"
      >
        <NavTitle title=" Crops & Produce" icons={false} />
        {showBrands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      <AnimatePresence>
        {showBrands && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-col gap-3"
          >
            {brands.map((brand) => (
              <li
                key={brand._id}
                onClick={() => handleFilter(brand.title.toLowerCase())}
                className="cursor-pointer px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primeColor transition-colors duration-200"
              >
                {brand.title}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Brand;
