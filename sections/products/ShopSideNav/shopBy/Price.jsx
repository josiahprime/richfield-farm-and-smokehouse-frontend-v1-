import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import NavTitle from "./NavTitle";

const Price = () => {
  const [isOpen, setIsOpen] = useState(true);

  const priceList = [
    { _id: 950, priceOne: 500, priceTwo: 1499 },
    { _id: 951, priceOne: 1500, priceTwo: 2999 },
    { _id: 952, priceOne: 3000, priceTwo: 4999 },
    { _id: 953, priceOne: 5000, priceTwo: 9999 },
    { _id: 954, priceOne: 10000, priceTwo: 19999 },
    { _id: 955, priceOne: 20000, priceTwo: 50000 },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 text-primeColor">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer"
      >
        <NavTitle title="Shop by Price" icons={false} />
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-3">
          {priceList.map((item) => (
            <button
              key={item._id}
              className="text-left text-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:font-medium transition-colors duration-200"
            >
              ₦{item.priceOne.toLocaleString()} - ₦{item.priceTwo.toLocaleString()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Price;
