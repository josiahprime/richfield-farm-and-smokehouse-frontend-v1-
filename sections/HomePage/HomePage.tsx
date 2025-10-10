'use client'
import { useDealCountdown } from "../../src/utils/useCountdownToMidnight";
import { useProductStore } from "store/product/useProductStore";
import FlashDealCard from "app/dashboard/components/FlashDealCard/FlashDealCard";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {Truck, Shield, Award, ArrowRight, Clock, Zap, Leaf, Tractor } from "lucide-react";
import Link from "next/link";
import Button from "../../src/app/components/Button/Button";
import PopularProductCard from "../../src/app/components/PopularProductCard/PopularProductCard";
import PopularProductsCarousel from "app/components/PopularProductsCarousel";

function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}


const HomePage = () => {
  const router = useRouter()
  const hasFetchedRef = useRef(false);
  const [hasFetched, setHasFetched] = useState(false);
  const countdown = useDealCountdown();
  // const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const fetchDailyDeals = useProductStore((state)=>(state.fetchDailyDeals))
  const fetchPopularProducts = useProductStore((state)=>(state.fetchPopularProducts))
  const DailyDeals = useProductStore((state)=>(state.dailyDeals))
  const popularProducts = useProductStore((state)=>(state.popularProducts))
  // console.log('popular products from homepage', popularProducts)
  // console.log('dailyDeals', DailyDeals)
  // console.log(countdown)
  
  // useEffect(() => {
  //   if (countdown === 0 && !hasFetchedRef.current) {
  //     console.log('Countdown hit 0. Refetching daily deals...');
  //     fetchDailyDeals();
  //     hasFetchedRef.current = true;

  //     // Reset after a second or two so it can refetch again the next day
  //     setTimeout(() => {
  //       hasFetchedRef.current = false;
  //     }, 2000); // Prevent rapid repeated calls
  //   }
  // }, [countdown]);
  useEffect(()=>{
    fetchPopularProducts()

  }, [])
  useEffect(() => {
    if (!hasFetched) {
      // 🔄 Fetch immediately on first load
      fetchDailyDeals();
      setHasFetched(true);
    }

    if (countdown === 0 && !hasFetchedRef.current) {
      console.log('Countdown hit 0. Refetching daily deals...');
      fetchDailyDeals();
      hasFetchedRef.current = true;

      // Allow refetch again the next day
      setTimeout(() => {
        hasFetchedRef.current = false;
      }, 2000);
    }
  }, [countdown, fetchDailyDeals, hasFetched]);





  const bannerDeals = [
    {
      title: "Fresh Harvest",
      subtitle: "Up to 50% OFF",
      description: "Organic vegetables & fruits",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Farm Fresh",
      subtitle: "Daily Delivery",
      description: "Straight from our farm",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80",
      color: "from-orange-500 to-yellow-600"
    }
  ];

  

  const categories = [
    { name: "Vegetables", icon: "🥬", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=80" },
    { name: "Fruits", icon: "🍎", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&q=80" },
    { name: "Dairy", icon: "🥛", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=80" },
    { name: "Grains", icon: "🌾", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&q=80" },
    { name: "Meat", icon: "🥩", image: "https://images.unsplash.com/photo-1588347818631-c7c4e05b8d2b?w=200&q=80" },
    { name: "Herbs", icon: "🌿", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=80" },
    { name: "Eggs", icon: "🥚", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&q=80" },
    { name: "Honey", icon: "🍯", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80" }
  ];

  // const popularProducts = [
  //   {
  //     id: "5",
  //     name: "Organic Carrots",
  //     price: 700,
  //     originalPrice: 1000,
  //     image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80",
  //     rating: 4.8,
  //     reviews: 156,
  //     badge: "Organic",
  //     weight: "1kg",
  //     farm: "Green Valley Farm",
  //     freshness: "2 days fresh",
  //     description: "Sweet, crunchy organic carrots perfect for cooking or snacking"
  //   },
  //   {
  //     id: "6",
  //     name: "Fresh Lettuce",
  //     price: 450,
  //     originalPrice: 650,
  //     image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&q=80",
  //     rating: 4.6,
  //     reviews: 89,
  //     badge: "Fresh",
  //     weight: "1 head",
  //     farm: "Sunrise Farm",
  //     freshness: "Harvested today",
  //     description: "Crisp, fresh lettuce leaves ideal for salads and sandwiches"
  //   },
  //   {
  //     id: "7",
  //     name: "Farm Milk",
  //     price: 1200,
  //     originalPrice: 1500,
  //     image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80",
  //     rating: 4.9,
  //     reviews: 234,
  //     badge: "Premium",
  //     weight: "1 liter",
  //     farm: "Dairy Hills",
  //     freshness: "Morning milk",
  //     description: "Pure, fresh milk from grass-fed cows, rich in nutrients"
  //   },
  //   {
  //     id: "8",
  //     name: "Red Apples",
  //     price: 1800,
  //     originalPrice: 2200,
  //     image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&q=80",
  //     rating: 4.7,
  //     reviews: 178,
  //     badge: "Sweet",
  //     weight: "1kg",
  //     farm: "Apple Orchard Co.",
  //     freshness: "Tree fresh",
  //     description: "Sweet, juicy red apples perfect for eating fresh or baking"
  //   },
  //   {
  //     id: "9",
  //     name: "Red Apples",
  //     price: 1800,
  //     originalPrice: 2200,
  //     image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&q=80",
  //     rating: 4.7,
  //     reviews: 178,
  //     badge: "Sweet",
  //     weight: "1kg",
  //     farm: "Apple Orchard Co.",
  //     freshness: "Tree fresh",
  //     description: "Sweet, juicy red apples perfect for eating fresh or baking"
  //   },
  //   {
  //     id: "10",
  //     name: "Red Apples",
  //     price: 1800,
  //     originalPrice: 2200,
  //     image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&q=80",
  //     rating: 4.7,
  //     reviews: 178,
  //     badge: "Sweet",
  //     weight: "1kg",
  //     farm: "Apple Orchard Co.",
  //     freshness: "Tree fresh",
  //     description: "Sweet, juicy red apples perfect for eating fresh or baking"
  //   },
  //   {
  //     id: "11",
  //     name: "Red Apples",
  //     price: 1800,
  //     originalPrice: 2200,
  //     image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&q=80",
  //     rating: 4.7,
  //     reviews: 178,
  //     badge: "Sweet",
  //     weight: "1kg",
  //     farm: "Apple Orchard Co.",
  //     freshness: "Tree fresh",
  //     description: "Sweet, juicy red apples perfect for eating fresh or baking"
  //   },
  //   {
  //     id: "12",
  //     name: "Farm Milk",
  //     price: 1200,
  //     originalPrice: 1500,
  //     image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80",
  //     rating: 4.9,
  //     reviews: 234,
  //     badge: "Premium",
  //     weight: "1 liter",
  //     farm: "Dairy Hills",
  //     freshness: "Morning milk",
  //     description: "Pure, fresh milk from grass-fed cows, rich in nutrients"
  //   },
  //   {
  //     id: "13",
  //     name: "Farm Milk",
  //     price: 1200,
  //     originalPrice: 1500,
  //     image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80",
  //     rating: 4.9,
  //     reviews: 234,
  //     badge: "Premium",
  //     weight: "1 liter",
  //     farm: "Dairy Hills",
  //     freshness: "Morning milk",
  //     description: "Pure, fresh milk from grass-fed cows, rich in nutrients"
  //   },
  //   {
  //     id: "14",
  //     name: "Farm Milk",
  //     price: 1200,
  //     originalPrice: 1500,
  //     image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80",
  //     rating: 4.9,
  //     reviews: 234,
  //     badge: "Premium",
  //     weight: "1 liter",
  //     farm: "Dairy Hills",
  //     freshness: "Morning milk",
  //     description: "Pure, fresh milk from grass-fed cows, rich in nutrients"
  //   },
  // ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Banner */}
            <div className="lg:col-span-2">
              <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Tractor className="w-8 h-8" />
                    <span className="text-sm font-medium">RichField Farms</span>
                  </div>
                  <h1 className="text-3xl font-bold mb-4">Fresh from Farm to Table</h1>
                  <p className="text-l mb-6 opacity-90">Premium organic produce delivered fresh daily</p>
                  <Button onClick={() => router.push('/products')} className="bg-gradient-to-r from-green-600 to-emerald-700 shadow text-white hover:bg-gray-100 w-fit">
                    Shop Fresh Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"
                  alt="Fresh vegetables"
                  className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
                />
              </div>
            </div>

            {/* Side Banners */}
            <div className="space-y-6">
              {bannerDeals.map((deal, index) => (
                <div key={index} className={`relative h-36 rounded-xl overflow-hidden bg-gradient-to-r ${deal.color} relative`}>
                  <img className="absolute w-full h-full" src={deal.image} alt="" />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 p-4 h-full flex flex-col justify-center text-white">
                    <h3 className="text-lg font-bold">{deal.title}</h3>
                    <p className="text-sm opacity-90 font-medium">{deal.subtitle}</p>
                    <p className="text-xs opacity-75">{deal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href="/products" className="group">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-green-500 transition-colors">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm text-gray-700 group-hover:text-green-600 font-medium">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <Zap className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Daily Fresh Deals</h2>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{countdown !== null ? formatCountdown(countdown) : 'Loading...'}</span>
              </div>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              View All Deals
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DailyDeals.slice(0, 4).map((deal) => (
              <FlashDealCard
                key={deal.id}
                product={{
                  id: deal.product.id,
                  name: deal.product.productName,
                  price: deal.product.priceInKobo * (1 - deal.discountPercentage / 100),
                  originalPrice: (deal.product.priceInKobo), // 20% markup
                  image: deal.product.images[0].url || "/placeholder.jpg",
                  discount: 20,
                  sold: 12,
                  weight: "1kg",
                  freshness: "Fresh",
                  organic: deal.product.tags?.includes("Organic") || false,
                }}
              />
            ))}


          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Farm Fresh Delivery", desc: "Direct from farm to your door", color: "text-green-600" },
              { icon: Shield, title: "Quality Guarantee", desc: "100% fresh or money back", color: "text-blue-600" },
              { icon: Leaf, title: "Organic Certified", desc: "Pesticide-free produce", color: "text-emerald-600" },
              { icon: Award, title: "Local Farmers", desc: "Supporting local agriculture", color: "text-orange-600" }
            ].map((service, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Farm Products</h2>
            <Link href="/products">
              <Button variant="outline">View All <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </div>

          
          <div>
            
            {/* <ProductSlider
              products={popularProducts.map((product) => ({
                id: product.id,
                name: product.productName,
                price: product.priceInKobo,
                originalPrice: product.priceInKobo + 300, // fake markup
                image: product.images?.[0]?.url || 'nothing modafokas',
                rating: 4.9,
                reviews: 234, // dummy
                badge: "Premium", // constant
                weight: "1kg", // constant
                farm: "Dairy Hills", // dummy
                freshness: "Morning milk", // constant
                description: product.description || "No description",
                organic: product.tags?.includes("Organic") || false,
              }))}
            /> */}

          </div>
        </div>
        <PopularProductsCarousel products={popularProducts}/>
      </section>

      {/* Popular Products Section */}
      <section className="bg-white py-10 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Products</h2>

          {popularProducts && popularProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <PopularProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No popular products available right now.</p>
          )}
        </div>
      </section>


      {/* Newsletter */}
      <section className="bg-gradient-to-r from-green-800 to-emerald-900 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tractor className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold text-white">Stay Updated with Farm Fresh Deals</h2>
          </div>
          <p className="text-green-100 mb-8">Get the freshest produce delivered to your doorstep</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <Button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;





