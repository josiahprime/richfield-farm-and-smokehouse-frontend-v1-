"use client";

import { motion } from "framer-motion";
import { MapPin, Home, Plus } from "lucide-react";
import DemoNotice from "app/components/DemoNotice";

type AddressType = {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  isDefault?: boolean;
};

export default function Address() {
  // realistic fake addresses for demo
  const addresses: AddressType[] = [
    {
      id: 1,
      name: "Home — Josiah Prime",
      street: "12b Olu Street",
      city: "Lekki",
      state: "Lagos",
      phone: "+234 803 555 0123",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work — Office",
      street: "45 Commerce Ave",
      city: "Victoria Island",
      state: "Lagos",
      phone: "+234 802 444 9988",
    },
    {
      id: 3,
      name: "Parents",
      street: "32 Old Town Rd",
      city: "Ibadan",
      state: "Oyo",
      phone: "+234 809 111 2233",
    },
  ];

  return (
    <div className="relative min-h-screen rounded-none md:rounded-md shadow p-6">
      {/* Reusable demo notice (dismissible inside component) */}
      <DemoNotice/>

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <MapPin className="text-emerald-600" />
          Address Book
        </h1>

        {addresses.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl shadow p-10 text-center border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Home className="mx-auto mb-3 w-12 h-12 text-emerald-500" />
            <p className="text-gray-700 text-lg mb-4">
              You haven’t added any addresses yet.
            </p>
            <button
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition"
              onClick={() => alert("Demo Mode — Add address flow not enabled.")}
            >
              <Plus className="inline mr-2 w-4 h-4" />
              Add New Address
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <motion.div
                key={address.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {address.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {address.street}, {address.city}, {address.state}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{address.phone}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {address.isDefault && (
                      <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                    <div className="flex gap-2">
                      <button
                        className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                        onClick={() => alert("Demo Mode — Edit address not enabled.")}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                        onClick={() => alert("Demo Mode — Delete address not enabled.")}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Address card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center rounded-2xl border-dashed border-2 border-gray-200 bg-white p-6 cursor-pointer hover:shadow-md transition"
              onClick={() => alert("Demo Mode — Add address flow not enabled.")}
            >
              <div className="text-center">
                <Plus className="mx-auto mb-2 w-6 h-6 text-emerald-600" />
                <p className="text-sm text-gray-600 font-medium">Add New Address</p>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
