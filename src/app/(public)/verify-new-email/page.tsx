"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "lib/axios";
import { CheckCircle, XCircle, Mail } from "lucide-react";

const VerifyNewEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  console.log('token from verify new email', token)

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification link.");
      return;
    }

    const verifyEmailToken = async () => {
      setStatus("loading");
      try {
        const res = await axiosInstance.post("/account/verify-new-email", { token });
        setStatus("success");
        const msg = res.data.message || "Your email has been verified successfully!";
        setMessage(msg);
        toast.success(msg);
      } catch (err: any) {
        setStatus("error");
        const msg = err.response?.data?.error || "Failed to verify email. Please try again.";
        setMessage(msg);
        toast.error(msg);
      }
    };

    verifyEmailToken();
  }, [token]);

  const renderIcon = () => {
    if (status === "success") return <CheckCircle className="w-20 h-20 text-green-600" />;
    if (status === "error") return <XCircle className="w-20 h-20 text-red-600" />;
    return <Mail className="w-20 h-20 text-blue-500 animate-bounce" />;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-blue-50 via-white to-green-50 px-4">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6">
        {renderIcon()}
        <h1 className="text-3xl font-bold text-gray-800">
          {status === "loading"
            ? "Verifying your email..."
            : status === "success"
            ? "Email Verified!"
            : "Verification Failed"}
        </h1>
        <p className="text-gray-600">{message || "Please wait..."}</p>

        {status === "success" && (
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
          >
            Proceed to Login
          </button>
        )}

        {status === "error" && (
          <div className="space-y-2">
            <button
              onClick={() => router.push("/")}
              className="mt-4 w-full bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Return Home
            </button>
            <button
              onClick={() => router.reload()}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Retry Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyNewEmailPage;
