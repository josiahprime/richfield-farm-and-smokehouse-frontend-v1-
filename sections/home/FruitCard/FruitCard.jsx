"use client"

import { useEffect, useState, useRef } from "react";

const FruitCard = () => {
  const [cards, setCards] = useState([]);
  const scrollRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false); 

  useEffect(() => {
    setCards([
      { image: '/assets/carrot.svg', name: 'Carrot', className: 'bg-orange-200' },
      { image: '/assets/strawberry2.svg', name: 'Strawberry', className: 'bg-red-200' },
      { image: '/assets/eggplant.svg', name: 'Eggplant', className: 'bg-purple-200' },
      { image: '/assets/cabbage.svg', name: 'Cabbage', className: 'bg-green-200' },
      { image: '/assets/food-grape.svg', name: 'Blue Grape', className: 'bg-green-300' },
      { image: '/assets/tomatoes.svg', name: 'Tomatoes', className: 'bg-red-300' },
      { image: '/assets/lettuce.svg', name: 'Lettuce', className: 'bg-lime-200' },
    ]);
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
      setIsStart(scrollLeft === 0);
      setIsEnd(scrollLeft + offsetWidth >= scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white px-6 md:px-10 md:mx-3 py-12 mt-2 font-sans">
      <div className="max-w-6xl mx-auto overflow-hidden relative flex items-center">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          disabled={isStart} 
          className={`absolute left-0 bg-teal-800 p-2 rounded-sm 
            ${isStart ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img src="/assets/left-arrow.svg" alt="left arrow" className="w-5"/>
        </button>
        <div
          ref={scrollRef}
          onScroll={checkScroll} 
          className="flex gap-5 overflow-x-auto scroll-smooth mx-12"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide Scrollbar */}
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.className} flex flex-col items-center text-center rounded-xl px-7 py-7 hover:bg-green-400 transition ease-linear duration-300 cursor-pointer min-w-full lg:min-w-[20%]`}
              
            >
              <img src={card.image} alt={card.name} className="w-20" />
              <p className="text-gray-800 text-base font-semibold mb-1 mt-3">
                {card.name}
              </p>
            </div>
          ))}
        </div>
        {/* Right Button */}
        <button
          onClick={scrollRight}
          disabled={isEnd}
          className={`absolute right-0 bg-teal-800 p-2 rounded-sm 
            ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
           <img src="/assets/right-arrow.svg" alt="right arrow" className="w-5"/>
        </button>
      </div>
    </div>
  );
};

export default FruitCard;
