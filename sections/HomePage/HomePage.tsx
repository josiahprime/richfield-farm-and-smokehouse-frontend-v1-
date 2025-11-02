'use client'
import { useDealCountdown } from "../../src/utils/useCountdownToMidnight";
import { useProductStore } from "store/product/useProductStore";
import FlashDealCard from "app/dashboard/components/FlashDealCard/FlashDealCard";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {Truck, Shield, Award, ArrowRight, Clock, Zap, Leaf, Tractor } from "lucide-react";
import Link from "next/link";
import Button from "../../src/app/components/Button/Button";
import PopularProductsCarousel from "app/components/PopularProductsCarousel";
import HomeSkeleton from "app/components/ui/HomeSkeleton";
import { useAuthStore } from "store/auth/useAuthStore";


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
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  
  
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

  if (isCheckingAuth) {
    return <HomeSkeleton />;
  }





  const bannerDeals = [
    {
      title: "Fresh Harvest",
      subtitle: "Up to 50% OFF",
      description: "Organic vegetables & fruits",
      image: "https://res.cloudinary.com/djmnjen6v/image/upload/v1760550956/photo-1542838132-92c53300491e_wzy3c2.jpg",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Farm Fresh",
      subtitle: "Daily Delivery",
      description: "Straight from our farm",
      image: "https://res.cloudinary.com/djmnjen6v/image/upload/v1760550955/photo-1500595046743-cd271d694d30_ffcvyk.jpg",
      color: "from-orange-500 to-yellow-600"
    }
  ];

  


  

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
                  src="https://res.cloudinary.com/djmnjen6v/image/upload/v1760550956/photo-1542838132-92c53300491e_wzy3c2.jpg"
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


      {/* Flash Deals Section */}
      {DailyDeals && DailyDeals.length > 0 && (
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
                  <span className="font-mono font-bold">
                    {countdown !== null
                      ? formatCountdown(countdown)
                      : "Loading..."}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                View All Deals
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DailyDeals.slice(0, 4).map((deal) => (
                <FlashDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </section>
      )}

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
            

          </div>
        </div>
        <PopularProductsCarousel products={popularProducts}/>
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





