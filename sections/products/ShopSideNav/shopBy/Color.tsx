'use client';
import React, { useState, useEffect } from 'react';
import {
  Drumstick,
  Fish,
  Egg,
  Wheat,
  Tags as TagsIcon,
  Cookie,
  ChevronDown,
  ChevronUp,
  Grid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

const brands = [
  { _id: 0, title: 'All Products', slug: '', icon: <Grid size={18} /> },
  { _id: 9006, title: 'Meat & Poultry', slug: 'meat-poultry', icon: <Drumstick size={18} /> },
  { _id: 9009, title: 'Fresh Produce', slug: 'fresh-produce', icon: <Wheat size={18} /> },
  { _id: 9010, title: 'Fish & Seafoods', slug: 'fish-seafoods', icon: <Fish size={18} /> },
  { _id: 9011, title: 'Dairy & Eggs', slug: 'dairy-eggs', icon: <Egg size={18} /> },
  { _id: 9012, title: 'Animal Feeds & Supplements', slug: 'animal-feeds-supplements', icon: <Wheat size={18} /> },
  { _id: 9013, title: 'Pantry & Sweeteners', slug: 'pantry-sweeteners', icon: <Cookie size={18} /> },
];

const ProductTagSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  // Load active tag from URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    setActiveTag(categoryFromUrl || ''); // ✅ resets to '' when there's no category
  }, [searchParams]);

  const handleFilter = (category: string) => {
    setActiveTag(category);

    if (category) {
      router.push(`/products?category=${category}`);
    } else {
      // ✅ go back to all products (no category in URL)
      router.push('/products');
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <div
        className="flex items-center justify-between mb-4 text-primeColor cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <TagsIcon size={20} />
          <h2 className="text-lg font-semibold">Livestock & Animal Products</h2>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {brands.map((item) => (
              <motion.li
                key={item._id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => handleFilter(item.slug)}
                className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg duration-300
                  ${
                    activeTag === item.slug
                      ? 'bg-primeColor text-gray-600 bg-gray-200'
                      : 'hover:bg-gray-100 hover:text-primeColor text-gray-800'
                  }`}
              >
                {item.icon}
                <span className="text-lg">{item.title}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductTagSidebar;
