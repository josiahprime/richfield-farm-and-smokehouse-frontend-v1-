// src/components/PaymentVerificationClient.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCheckoutStore } from "store/checkout/useCheckoutStore";
import { motion } from "framer-motion";

export default function PaymentVerificationClient() {
    const verifyPayment = useCheckoutStore((state) => state.verifyPayment);
    const status = useCheckoutStore((state) => state.status);
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");
    const router = useRouter();

    useEffect(() => {
        if (reference) {
            verifyPayment(reference);
        }
    }, [reference, verifyPayment]);

    useEffect(() => {
        if (status === "success") {
            router.push("/cart/checkout/payment-verification/success");
        } else if (status === "error") {
            router.push("/cart/checkout/payment-verification/failure");
        }
    }, [status, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
            <motion.div 
                className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-lg font-medium text-gray-700 animate-pulse">Verifying payment...</p>
            </motion.div>
        </div>
    );
}
