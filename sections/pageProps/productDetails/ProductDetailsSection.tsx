"use client";
import React from "react";

interface ProductDetailsProps {
  productInfo: {
    id: string;
    productName: string;
    description: string;
    priceInKobo: number;
    stock: number;
    unitType: string;
    category: string;
    tags?: string[];
  };
}

const ProductDetailsSection: React.FC<ProductDetailsProps> = ({ productInfo }) => {
  const { productName, description, category, unitType, stock, tags } = productInfo;

  // 🧠 Generate category-based info
  const getCategoryDetails = () => {
    switch (category) {
      case "meat-poultry":
        return {
          sectionTitle: "Storage & Cooking Tips",
          info: [
            "Keep refrigerated at 0–4°C and consume within 2–3 days of delivery.",
            "Cook thoroughly to an internal temperature of at least 75°C.",
            "Can be frozen for up to 3 months in airtight packaging.",
          ],
          benefits: [
            "Excellent source of high-quality protein.",
            "Rich in essential vitamins like B6 and niacin.",
            "Perfect for grilling, roasting, frying, or stewing.",
          ],
        };

      case "fruits":
        return {
          sectionTitle: "Handling & Storage",
          info: [
            "Store in a cool, dry place or refrigerate for longer freshness.",
            "Wash thoroughly before eating or juicing.",
            "Consume ripe fruits within 3–5 days for best flavor.",
          ],
          benefits: [
            "Rich in antioxidants and vitamins.",
            "Supports hydration and digestion.",
            "Naturally sweet and free from preservatives.",
          ],
        };

      case "vegetables":
        return {
          sectionTitle: "Storage & Preparation",
          info: [
            "Refrigerate immediately after delivery to maintain crispness.",
            "Wash and chop only before cooking or serving.",
            "Avoid soaking leafy greens to retain nutrients.",
          ],
          benefits: [
            "High in dietary fiber and essential minerals.",
            "Supports heart health and immunity.",
            "Perfect for salads, soups, and stir-fries.",
          ],
        };

      case "grains":
        return {
          sectionTitle: "Storage & Cooking Info",
          info: [
            "Store in an airtight container in a cool, dry place.",
            "Rinse before cooking to remove excess starch.",
            "Cook with a 2:1 water-to-grain ratio for best texture.",
          ],
          benefits: [
            "Packed with slow-releasing carbohydrates.",
            "Provides long-lasting energy and essential minerals.",
            "Ideal for meal prepping and healthy diets.",
          ],
        };

      case "dairy":
        return {
          sectionTitle: "Storage & Usage Tips",
          info: [
            "Keep refrigerated below 4°C at all times.",
            "Consume within 3–5 days of opening.",
            "Shake well before use if applicable (e.g. milk, yogurt).",
          ],
          benefits: [
            "Excellent source of calcium and protein.",
            "Supports bone and muscle strength.",
            "Ideal for smoothies, baking, or direct consumption.",
          ],
        };

      default:
        return {
          sectionTitle: "Storage & Usage",
          info: [
            "Store in a cool, dry place away from sunlight.",
            "Keep sealed to maintain freshness.",
          ],
          benefits: [
            "Farm-fresh and naturally sourced.",
            "Free from artificial additives.",
            "Supports local farmers and sustainable agriculture.",
          ],
        };
    }
  };

  const { sectionTitle, info, benefits } = getCategoryDetails();

  return (
    <div className="py-8">
      <h3 className="text-xl font-semibold mb-4">Product Details</h3>

      {/* Description */}
      <p className="text-black/70 mb-6 leading-relaxed">{description}</p>

      {/* Storage / Info Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium mb-2">{sectionTitle}</h4>
          <ul className="text-black/60 list-disc pl-5 space-y-1">
            {info.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Product Facts</h4>
          <table className="w-full text-sm text-black/60 border border-gray-100">
            <tbody>
              <tr>
                <td className="p-2 font-medium">Category</td>
                <td className="p-2 capitalize">{category.replace("-", " ")}</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Unit</td>
                <td className="p-2">{unitType}</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Available Stock</td>
                <td className="p-2">{stock}</td>
              </tr>
              {tags && tags.length > 0 && (
                <tr>
                  <td className="p-2 font-medium">Tags</td>
                  <td className="p-2">{tags.join(", ")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benefits */}
      <h4 className="font-medium mb-2">Why You'll Love It</h4>
      <ul className="text-black/60 list-disc pl-5 space-y-1">
        {benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetailsSection;
