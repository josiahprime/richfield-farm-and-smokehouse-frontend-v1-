"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Wallet, Plus, Trash2, CheckCircle2 } from "lucide-react";
import DemoNotice from "app/components/DemoNotice";

interface PaymentMethod {
  id: number;
  type: "Visa" | "Mastercard" | "PayPal" | "Bank Transfer";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export default function PaymentSettingsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    // Simulate fetching dummy payment methods
    const dummy = [
      {
        id: 1,
        type: "Visa" as const,
        last4: "4321",
        expiry: "12/27",
        isDefault: true,
      },
      {
        id: 2,
        type: "Mastercard" as const,
        last4: "8765",
        expiry: "08/26",
        isDefault: false,
      },
      {
        id: 3,
        type: "PayPal" as const,
        last4: "johndoe@gmail.com",
        expiry: "-",
        isDefault: false,
      },
    ];
    setMethods(dummy);
  }, []);

  const handleDelete = (id: number) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <DemoNotice/>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          Payment Settings
        </h1>

        <div className="space-y-5">
          {methods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-emerald-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between flex-wrap md:flex-nowrap gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  {method.type === "Visa" || method.type === "Mastercard" ? (
                    <CreditCard className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Wallet className="w-6 h-6 text-emerald-600" />
                  )}
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    {method.type}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {method.type === "PayPal"
                      ? method.last4
                      : `•••• ${method.last4}`}
                  </p>
                  {method.expiry !== "-" && (
                    <p className="text-xs text-gray-400">
                      Exp: {method.expiry}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {method.isDefault ? (
                  <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Default
                  </span>
                ) : (
                  <button
                    className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition"
                    onClick={() =>
                      setMethods((prev) =>
                        prev.map((m) =>
                          m.id === method.id
                            ? { ...m, isDefault: true }
                            : { ...m, isDefault: false }
                        )
                      )
                    }
                  >
                    Set as Default
                  </button>
                )}

                <button
                  onClick={() => handleDelete(method.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Add New Payment Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow hover:bg-emerald-700 transition"
            onClick={() =>
              alert("Demo Mode — Adding new payment methods is disabled.")
            }
          >
            <Plus className="w-5 h-5" />
            Add Payment Method
          </motion.button>
        </div>
      </div>
    </div>
  );
}
