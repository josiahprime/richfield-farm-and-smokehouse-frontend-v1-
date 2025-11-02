"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { Mail, MapPin, Loader, User } from "lucide-react";
import { statesWithLGAs } from "utils/nigeriaRegions";
import useAccountStore from "store/account/useAccountStore";
import { useAuthStore } from "store/auth/useAuthStore";
import type { AddressData } from "store/account/accountTypes";

export const AddressCard = () => {
  const [loading, setLoading] = useState(false);
  const userId = useAuthStore((state)=>state.authUser?.id)

  // Zustand store
  const {
    fullName,
    email,
    state,
    city,
    address: streetAddress,
    landmark,
    postalCode,
    updateAddress,
    fetchAddress, // 👈 add fetchAddress from your store
  } = useAccountStore();

  // Form data state
  const [formData, setFormData] = useState<AddressData>({
    userId: userId || "",
    fullName: "",
    email: "",
    state: "",
    city: "",
    address: "",
    landmark: "",
    postalCode: "",
  });

  // Select dropdown state
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedLGA, setSelectedLGA] = useState<any>(null);

  // Fetch address on mount
  useEffect(() => {
    const loadAddress = async () => {
      try {
        await fetchAddress();
      } catch (err) {
        toast.error("Failed to load address");
      }
    };
    loadAddress();
  }, [fetchAddress]);

  // Sync formData and selects with Zustand when store values change
  useEffect(() => {
    setFormData({
      fullName: fullName || "",
      email: email || "",
      state: state || "",
      city: city || "",
      address: streetAddress || "",
      landmark: landmark || "",
      postalCode: postalCode || "",
      userId: userId || ''
    });


    const stateOption = statesWithLGAs.find((s) => s.value === state) || null;
    setSelectedState(stateOption);
    const lgaOption = stateOption?.lgas?.find((l) => l.value === city) || null;
    setSelectedLGA(lgaOption);
  }, [fullName, email, state, city, streetAddress, landmark, postalCode]);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // State select handler
  const handleStateChange = (option: any) => {
    setSelectedState(option);
    setSelectedLGA(null);
    setFormData({ ...formData, state: option?.value || "", city: "" });
  };

  // LGA select handler
  const handleLGAChange = (option: any) => {
    setSelectedLGA(option);
    setFormData({ ...formData, city: option?.value || "" });
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, state, city, address } = formData;
    if (!fullName || !state || !city || !address) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await updateAddress(formData);
      toast.success("Address updated successfully");
    } catch (error) {
      toast.error("Failed to update address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Address Information</h2>
          <p className="text-gray-600">Manage your saved delivery address</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          {[{ name: "fullName", label: "Full Name", icon: User }, { name: "email", label: "Email Address", icon: Mail }].map(
            (field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-green-600 mb-2">{field.label}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <field.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={field.name === "email" ? "email" : "text"}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.name !== "email"}
                    className="w-full pl-12 pr-4 py-4 border border-green-300 rounded-xl bg-green-100
                              focus:outline-none focus:ring-2 focus:border-green-600 focus:ring-green-100"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                </div>
              </div>
            )
          )}
        </div>

        {/* State & City */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-green-600 mb-2">State</label>
            <Select
              isSearchable={false}
              options={statesWithLGAs}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Select State"
              className="text-left"
              classNames={{ control: () => "rounded-xl border-green-300 bg-green-100 py-2 px-2" }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-600 mb-2">City / LGA</label>
            <Select
              isSearchable={false}
              options={selectedState?.lgas || []}
              value={selectedLGA}
              onChange={handleLGAChange}
              placeholder={selectedState ? "Select City / LGA" : "Select a state first"}
              isDisabled={!selectedState}
              className="text-left"
              classNames={{ control: () => "rounded-xl border-green-300 bg-green-100 py-2 px-2" }}
            />
          </div>
        </div>

        {/* Street Address & Landmark */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-green-600 mb-2">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full py-4 px-4 border border-green-300 rounded-xl bg-green-100
                        focus:outline-none focus:ring-2 focus:border-green-600 focus:ring-green-100"
              placeholder="e.g. No 10, Alaba Street"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-600 mb-2">Landmark (optional)</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full py-4 px-4 border border-green-300 rounded-xl bg-green-100
                        focus:outline-none focus:ring-2 focus:border-green-600 focus:ring-green-100"
              placeholder="e.g. Opposite GTBank, near market"
            />
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-semibold text-green-600 mb-2">Postal Code (optional)</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full py-4 px-4 border border-green-300 rounded-xl bg-green-100
                      focus:outline-none focus:ring-2 focus:border-green-600 focus:ring-green-100"
            placeholder="e.g. 900108"
          />
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg transform hover:scale-[1.02]"} 
              transition-all duration-200 flex items-center justify-center space-x-2`}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Address</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
