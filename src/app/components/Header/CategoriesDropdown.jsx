import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const categories = [
  {
    name: 'Dairy Products',
    subcategories: ['Milk', 'Cheese', 'Yogurt', 'Butter'],
  },
  {
    name: 'Fruits',
    subcategories: ['Bananas', 'Oranges', 'Apples', 'Avocados'],
  },
  {
    name: 'Vegetables',
    subcategories: ['Tomatoes', 'Carrots', 'Spinach', 'Cabbage'],
  },
  {
    name: 'Animal Feed',
    subcategories: ['Chicken Feed', 'Goat Feed', 'Cow Feed'],
  },
  {
    name: 'Farm Tools',
    subcategories: ['Cutlass', 'Hoe', 'Wheelbarrow', 'Sprayers'],
  },
  {
    name: 'Others',
    subcategories: ['Fertilizers', 'Manure', 'Compost'],
  },
];

const CategoriesDropdown = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="relative group font-sans z-50">
      <div className="absolute left-[12px] -top-1  w-5 h-5 rotate-[40deg] bg-white "></div>
      

      <div className="absolute top-full left-2 bg-white rounded-lg shadow-xl w-[260px] hidden group-hover:block transition-all duration-200">
        <button className="absolute flex items-center gap-2 font-semibold px-5 py-3 bg-white rounded-t-lg hover:bg-gray-100 transition duration-200">
          <FaBars className="text-gray-600" />
          <span className=" w-[200px] font-bold">All Categories</span>
        </button>
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group/item hover:bg-gray-100 rounded-md px-4 py-2 cursor-pointer top-10"
            onMouseEnter={() => setActiveCategory(index)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="text-gray-800 font-semibold">{category.name}</div>

            {activeCategory === index && (
              <div className="absolute top-0 left-full ml-3 w-[220px] bg-white rounded-lg shadow-lg py-2 z-50">
                {/* Triangle */}
                <div className="absolute left-[-6px] top-4 w-3 h-3 bg-white rotate-45 shadow-md"></div>

                {category.subcategories.map((sub, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesDropdown;
