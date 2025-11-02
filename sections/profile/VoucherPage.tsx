"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Ticket, Copy, CheckCircle2} from "lucide-react";
import { toast } from "react-hot-toast";
import DemoNotice from "app/components/DemoNotice";

interface Voucher {
  id: number;
  code: string;
  discount: number;
  expiry: string;
  status: "active" | "expired" | "used";
}

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    // Generate dummy vouchers for demo mode
    const dummy = Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      code: `SHOP${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      discount: Math.floor(Math.random() * 30) + 5,
      expiry: new Date(
        Date.now() + Math.random() * 10000000000
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: ["active", "expired", "used"][
        Math.floor(Math.random() * 3)
      ] as "active" | "expired" | "used",
    }));

    setVouchers(dummy);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Voucher code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <DemoNotice/>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          Available Vouchers
        </h1>

        {vouchers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vouchers.map((voucher) => (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border p-5 shadow-sm bg-white hover:shadow-md transition relative overflow-hidden ${
                  voucher.status === "expired"
                    ? "border-gray-200 opacity-60"
                    : voucher.status === "used"
                    ? "border-yellow-200 opacity-80"
                    : "border-emerald-100"
                }`}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                        {voucher.discount}% OFF
                      </h2>
                      {voucher.status === "active" && (
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                          Active
                        </span>
                      )}
                      {voucher.status === "used" && (
                        <span className="text-xs font-medium text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full">
                          Used
                        </span>
                      )}
                      {voucher.status === "expired" && (
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          Expired
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                      Expires on {voucher.expiry}
                    </p>

                    <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-100 px-3 py-2">
                      <span className="font-mono text-sm text-gray-700">
                        {voucher.code}
                      </span>
                      <button
                        onClick={() => handleCopy(voucher.code)}
                        className="flex items-center gap-1 text-sm text-emerald-600 font-medium hover:text-emerald-700"
                      >
                        {copiedCode === voucher.code ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      disabled={voucher.status !== "active"}
                      className={`px-4 py-2 text-sm rounded-full font-medium transition shadow ${
                        voucher.status === "active"
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Apply Voucher
                    </button>

                    <Gift
                      className={`w-6 h-6 ${
                        voucher.status === "active"
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-10 shadow-sm border border-emerald-100 mt-16"
          >
            <Gift className="w-12 h-12 text-emerald-600 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">
              No Vouchers Available
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              You currently don’t have any vouchers. Check back later for
              exclusive discounts!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
