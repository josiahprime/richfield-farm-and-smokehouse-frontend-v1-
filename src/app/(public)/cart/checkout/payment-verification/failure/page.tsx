"use client"
import React from "react";
import Link from "next/link";

export default function PaymentFailure() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <div className="bg-gray-100 p-8 rounded-xl shadow-md max-w-md w-full">
                <div className="text-red-600 text-5xl mb-4">❌</div>
                <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
                <p className="text-gray-600 mb-2">Something went wrong during your payment process.</p>
                <p className="text-gray-600 mb-4">If this keeps happening, contact <span className="text-red-500">RichFieldFarmsAndSmokeHouseSupport@gmail.com</span></p>
                <Link href="/cart" className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition shadow">
                    TRY AGAIN
                </Link>
            </div>
            <footer className="mt-8 text-sm text-gray-500">
                © 2025 RichFieldFarmsAndSmokeHouse. All rights reserved.
            </footer>
        </div>
    );
}
