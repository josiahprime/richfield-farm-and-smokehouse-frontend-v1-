"use client";
import React from "react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "Are your fruits and vegetables organic?",
    a: "Yes! Most of our produce is organically grown without synthetic fertilizers or pesticides. Each product page clearly indicates whether it’s organic or conventionally grown.",
  },
  {
    q: "How fresh is the produce when delivered?",
    a: "We harvest your order only after it’s placed. All items are packed and delivered within 24–48 hours to ensure maximum freshness and nutrition.",
  },
  {
    q: "Do you deliver to my location?",
    a: "We currently deliver to most major cities and surrounding areas. Enter your ZIP or area code at checkout to confirm availability before placing your order.",
  },
  {
    q: "What happens if an item is out of stock?",
    a: "If an item goes out of stock after your order is placed, we’ll notify you immediately and offer a replacement or a full refund for that item.",
  },
  {
    q: "Can I schedule a recurring order?",
    a: "Yes — you can subscribe for weekly or biweekly deliveries of selected items like fruits, vegetables, or dairy products. Manage your subscription easily from your account dashboard.",
  },
  {
    q: "How do you ensure food safety during delivery?",
    a: "Our produce is carefully packed in insulated, food-safe boxes with cooling packs when necessary. We maintain proper hygiene and temperature control during transport.",
  },
  {
    q: "What’s your return or refund policy for perishables?",
    a: "If any item arrives damaged, spoiled, or not as described, please contact us within 24 hours of delivery. We’ll arrange a replacement or issue a full refund.",
  },
];

const ProductFAQs = () => {
  return (
    <div className="py-8">
      <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors"
          >
            <summary className="cursor-pointer font-medium">
              {f.q}
            </summary>
            <div className="mt-2 text-black/60">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default ProductFAQs;
