"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import useAccountStore from "store/account/useAccountStore";
import { useAuthStore } from "store/auth/useAuthStore";

type Profile = {
  username: string;
  email: string;
  phone: string;
  avatar: string;
};

export const ProfileCard = () => {
  const authUser = useAuthStore((state) => state.authUser);
  console.log('authuser from profile card', authUser)
  const userId = authUser?.id ?? null;

  const [profile, setProfile] = useState<Profile>({
    username: authUser?.username || "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
    avatar: "",
  });

  const [pendingEmail, setPendingEmail] = useState(profile.email);
  const [pendingPhone, setPendingPhone] = useState(profile.phone);

  const { updateName, updateEmail, updatePhone } = useAccountStore();
  const [feedback, setFeedback] = useState({ username: "", email: "", phone: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const phoneRegex = /^[0-9()+-\s]{7,20}$/;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const handleSave = async () => {
    if (!userId) return toast.error("User ID not found. Please log in.");
    setIsUpdating(true);
    setFeedback({ username: "", email: "", phone: "" });

    // --- Username ---
    if (profile.username !== authUser?.username) {
      if (!usernameRegex.test(profile.username)) {
        setFeedback((f) => ({
          ...f,
          username: "Username must be 3–20 characters long and contain only letters, numbers, or underscores.",
        }));
        setIsUpdating(false);
        return;
      }
      try {
        await updateName(userId, profile.username);
        toast.success("Username updated successfully!");
        setFeedback((f) => ({ ...f, username: "Username updated successfully." }));
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        toast.error(error.response?.data?.error || "Failed to update username");
        setFeedback((f) => ({ ...f, username: "Failed to update username." }));
      }
    }

    // --- Email ---
    if (authUser?.authProvider === "google") {
      // Skip email update entirely for Google users
      setFeedback((f) => ({
        ...f,
        email: "Email is managed by Google login and cannot be changed.",
      }));
    } else if (pendingEmail !== authUser?.email) {
      if (!gmailRegex.test(pendingEmail)) {
        setFeedback((f) => ({ ...f, email: "Invalid email format. Please enter a valid Gmail address." }));
        setIsUpdating(false);
        return;
      }
      try {
        const response = await updateEmail(userId, pendingEmail);
        toast.success(response.message || "Email updated successfully!");
        setFeedback((f) => ({ ...f, email: "Email updated successfully." }));
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        toast.error(error.response?.data?.error || "Email update failed");
        setFeedback((f) => ({ ...f, email: "Failed to update email." }));
      }
    }


    // --- Phone ---
    if (pendingPhone !== profile.phone) {
      if (!phoneRegex.test(pendingPhone)) {
        setFeedback((f) => ({ ...f, phone: "Invalid phone number format." }));
        setIsUpdating(false);
        return;
      }
      try {
        const response = await updatePhone(userId, pendingPhone);
        toast.success(response.message || "Phone number updated successfully!");
        setFeedback((f) => ({ ...f, phone: "Phone number updated successfully." }));
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        toast.error(error.response?.data?.error || "Failed to update phone number");
        setFeedback((f) => ({ ...f, phone: "Failed to update phone number." }));
      }
    }

    setIsUpdating(false);
  };

  useEffect(() => {
    if (authUser) {
      setProfile({
        ...profile,
        username: authUser.username,
        email: authUser.email,
        phone: authUser?.phone || "",
      });
      setPendingEmail(authUser.email ?? "");
      setPendingPhone(authUser.phone ?? "");

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const renderFeedback = (text: string) => {
    if (!text) return null;
    const isError = text.toLowerCase().includes("failed") || text.toLowerCase().includes("invalid");
    return (
      <p
        className={`text-sm mt-1 ${
          isError ? "text-red-500" : "text-green-600"
        } font-medium transition-all duration-200`}
      >
        {text}
      </p>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
      <div className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-green-600 mb-2">Username</label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            className="w-full pl-4 pr-4 py-4 border border-green-300 rounded-xl bg-green-100 
            focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 text-gray-900 transition-all"
          />
          {renderFeedback(feedback.username)}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-green-600 mb-2">Email Address</label>
          <input
            type="email"
            value={pendingEmail}
            onChange={(e) => setPendingEmail(e.target.value)}
            disabled={authUser?.authProvider === "google"} // disable if Google user
            className={`w-full pl-4 pr-4 py-4 border border-green-300 rounded-xl bg-green-100 
              focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 text-gray-900 transition-all
              ${authUser?.authProvider === "google" ? "opacity-50 cursor-not-allowed" : ""}`}
            placeholder="Enter new email"
          />
          {authUser?.authProvider === "google" && (
            <p className="text-sm text-gray-500 mt-1">Email is managed by Google login.</p>
          )}

          {renderFeedback(feedback.email)}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-green-600 mb-2">Phone Number</label>
          <input
            type="tel"
            value={pendingPhone}
            onChange={(e) => setPendingPhone(e.target.value)}
            className="w-full pl-4 pr-4 py-4 border border-green-300 rounded-xl bg-green-100 
            focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 text-gray-900 transition-all"
            placeholder="Enter new phone number"
          />
          {renderFeedback(feedback.phone)}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="mt-4 w-full md:w-auto inline-flex items-center justify-center gap-2 
          bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl 
          font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};




