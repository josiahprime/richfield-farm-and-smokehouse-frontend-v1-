"use client"
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

const SearchBar = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  // const router = useRouter();
  console.log('products from search', products)

  const filteredProducts = products?.filter((item) =>
    item.productName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const filteredProducts = (products || []).filter((item) =>
  //   item.productName?.toLowerCase().includes(searchQuery.toLowerCase())
  // );


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative h-[50px] text-base text-primeColor bg-transparent shadow-md flex items-center justify-between px-2 rounded-xl mb-2 lg:mb-0">
      <input
        className="flex-1 h-full w-[400px] outline-none border-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
        type="text"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Search your products here"
      />
      <FaSearch className="w-5 h-5" />
      {searchQuery && (
        <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
          {filteredProducts.length ? (
            filteredProducts.map((item) => (
              <div
                // onClick={() => {
                //   navigate(`/product/${item.productName.toLowerCase().split(' ').join('')}`, {
                //     state: { item },
                //   });
                //   setShowSearchBar(true);
                //   setSearchQuery('');
                // }}
                key={item.id}
                className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
              >
                <img className="w-24" src={item.images[0]} alt="product" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-xs">{item.description}</p>
                  <p className="text-sm">
                    Price:{' '}
                    <span className="text-primeColor font-semibold">${item.priceInKobo}</span>
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
