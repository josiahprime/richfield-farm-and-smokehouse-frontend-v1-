'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Drumstick,
  Fish,
  Egg,
  Wheat,
  Cookie,
} from 'lucide-react';

const categories = [
  {
    _id: 9006,
    title: 'Meat & Poultry',
    slug: 'meat-poultry',
    icon: <Drumstick size={18} />,
    image: 'https://res.cloudinary.com/djmnjen6v/image/upload/v1760529709/pngwing.com_42_y3txg3.png', // 🖼️ replace with your Cloudinary image later
  },
  {
    _id: 9009,
    title: 'Fresh Produce',
    slug: 'fresh-produce',
    icon: <Wheat size={18} />,
    image: 'https://res.cloudinary.com/djmnjen6v/image/upload/v1760529709/pngwing.com_43_hvcoso.png',
  },
  {
    _id: 9010,
    title: 'Fish & Seafoods',
    slug: 'fish-seafoods',
    icon: <Fish size={18} />,
    image: 'https://res.cloudinary.com/djmnjen6v/image/upload/v1760529708/pngwing.com_44_g9imuj.png',
  },
  {
    _id: 9011,
    title: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    icon: <Egg size={18} />,
    image: 'https://res.cloudinary.com/djmnjen6v/image/upload/v1760529708/pngwing.com_45_velsvk.png',
  },
  {
    _id: 9012,
    title: 'Animal Feeds & Supplements',
    slug: 'animal-feeds-supplements',
    icon: <Wheat size={18} />,
    image: 'https://res.cloudinary.com/djmnjen6v/image/upload/v1760529709/pngwing.com_46_h4tdvl.png',
  },
  {
    _id: 9013,
    title: 'Pantry & Sweeteners',
    slug: 'pantry-sweeteners',
    icon: <Cookie size={18} />,
    image: 'https://res.cloudinary.com/djmnjen6v/image/upload/v1760529708/pngwing.com_51_iy1x6x.png',
  },
];

const CategorySection: React.FC = () => {
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    // Navigate to products page with filter query
    router.push(`/products?category=${slug}`);
  };

  return (
    <section className="bg-white py-8 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category.slug)}
              className="group text-center cursor-pointer"
            >
              <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-green-500 transition-colors">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px" // optional optimization hint
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-3xl">
                    {category.icon}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-700 group-hover:text-green-600 font-medium">
                {category.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
