// "use client"

// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { useCheckoutStore } from "store/checkout/useCheckoutStore";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export default function PaymentVerification() {
//     const verifyPayment = useCheckoutStore((state)=>(state.verifyPayment))
//     const status = useCheckoutStore((state)=>(state.status))
//     const searchParams = useSearchParams();
//     const reference = searchParams.get("reference");
//     const router = useRouter();
    


//     // Trigger verification on load
//     useEffect(() => {
//         if (reference) {
//             verifyPayment(reference);
//         }
//     }, [reference, verifyPayment]);

//     // Redirect after verification
//     useEffect(() => {
//         if (status === "success") {
//             router.push("/cart/checkout/payment-verification/success");
//         } else if (status === "error") {
//             router.push("/cart/checkout/payment-verification/failure");
//         }
//     }, [status, router]);

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
//             <motion.div 
//                 className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm"
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <p className="text-lg font-medium text-gray-700 animate-pulse">Verifying payment...</p>
//             </motion.div>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AxiosInstance } from "axios";
import { axiosInstance } from "lib/axios";

export default function PaymentVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reference) return;

    const pollStatus = async () => {
      try {
        const res = await axiosInstance.get(`/pay/paystack/verify/${reference}`);
        const orderStatus = res.data.status;

        setStatus(orderStatus);

        if (orderStatus === "paid" || orderStatus === "failed") {
          // Delay slightly for better UX
          setTimeout(() => {
            router.push(
              orderStatus === "paid"
                ? "/cart/checkout/payment-verification/success"
                : "/cart/checkout/payment-verification/failure"
            );
          }, 1000);
        } else {
          // Still pending, check again in 3s
          setTimeout(pollStatus, 3000);
        }
      } catch (err) {
        console.error("Polling failed:", err);
        setError("Unable to verify payment at the moment.");
      }
    };

    pollStatus();
  }, [reference, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {error ? (
          <p className="text-red-500 font-semibold">{error}</p>
        ) : (
          <>
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              {status === "pending" ? "Verifying payment..." : "Redirecting..."}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}




