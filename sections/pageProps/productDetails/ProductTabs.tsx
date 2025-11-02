import ProductReviews from "./ProductReviews";

interface ProductTabsProps {
  activeTab: "details" | "reviews" | "faqs";
  setActiveTab: (tab: "details" | "reviews" | "faqs") => void;
  reviews?: any[]; // or the correct type if you know it
}

export default function ProductTabs({ activeTab, setActiveTab, reviews }: ProductTabsProps) {
  return (
    <div className="mt-16">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-12">
            {["details", "reviews", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "details" | "reviews" | "faqs")}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === tab
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {tab === "details"
                  ? "Product Details"
                  : tab === "reviews"
                  ? "Rating & Reviews"
                  : "FAQs"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* {activeTab === "reviews" && <ProductReviews reviews={reviews} />} */}
    </div>
  );
}
