"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { CheckCircle, Star } from "lucide-react"; // ✅ make sure you have `lucide-react` installed

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/products");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h2>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <p className="text-gray-600 mb-6">
            If you have any questions, email{" "}
            <span className="text-red-500">RichFieldFarmsAndSmokeHouse@gmail.com</span>
          </p>

          <div className="flex items-center justify-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <Link
            href="/products"
            className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-500 text-center">
        © 2025 RichFieldFarmAndSmokeHouse. All rights reserved.
      </footer>
    </div>
  );
}


// "use client"
// import React from "react";
// import Link from "next/link";
// import confetti from "canvas-confetti";
// import { useEffect } from "react";
// import { BiShoppingBag } from "react-icons/bi";
// import { useRouter } from "next/navigation";

// export default function PaymentSuccess() {
//     const router = useRouter();
//     // Run confetti and schedule redirect
//     useEffect(() => {
//         // Fire confetti
//         confetti({
//             particleCount: 100,
//             spread: 70,
//             origin: { y: 0.6 },
//         });

//         // Redirect after 5 seconds
//         const timer = setTimeout(() => {
//             router.push("/products");
//         }, 5000);

//         return () => clearTimeout(timer);
//     }, [router]);

    

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
//             <div className="bg-gray-100 p-8 rounded-xl shadow-md max-w-md w-full">
//                 <BiShoppingBag className="text-green-600 text-5xl mb-4"/>
//                 <h1 className="text-2xl font-bold mb-2">Thank You For Your Purchase</h1>
//                 <p className="text-gray-600 mb-2">Check your email inbox for the receipt.</p>
//                 <p className="text-gray-600 mb-4">If you have any questions, email <span className="text-red-500">RichFieldFarmsAndSmokeHouse@gmail.com</span></p>
//                 <Link href="/products" className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition shadow">
//                     CONTINUE SHOPPING
//                 </Link>
//             </div>
//             <footer className="mt-8 text-sm text-gray-500">
//                 © 2025 RichFieldFarmAndSmokeHouse. All rights reserved.
//             </footer>
//         </div>
//     );
// }
