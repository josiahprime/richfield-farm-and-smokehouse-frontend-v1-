'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from "store/auth/useAuthStore";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const [status, setStatus] = useState("verifying");

  const rawToken = searchParams.get("emailToken") || searchParams.get("token");

  // Fix Gmail-wrapped URL format
  const emailToken = rawToken?.includes("http")
    ? new URL(rawToken).searchParams.get("emailToken")
    : rawToken;

  useEffect(() => {
    const verify = async () => {
      if (!emailToken) {
        setStatus("error");
        return;
      }

      try {
        console.log('🔄 Verifying email...');
        const success = await verifyEmail({ emailToken : emailToken });

        if (success) {
          setStatus("success");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };

    verify();
  }, [emailToken, verifyEmail, router]);

  // Now safe to conditionally return after hooks are declared
  if (!rawToken) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600 font-semibold">
          ❌ No verification token found in the URL.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Side (Verification Box) */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
          <div className="uppercase text-2xl font-bold mb-4">
            Rich<span className="text-green-500">Field</span>
          </div>

          <h3 className="text-xl mb-4 mt-2 text-black">Verify Your Email</h3>
          <p className="mb-6 text-gray-600">
            Please wait while we verify your email. You will be redirected shortly.
          </p>

          <div className="text-center">
            {status === "verifying" && (
              <p className="text-gray-600">🔄 Verifying your email...</p>
            )}
            {status === "success" && (
              <p className="text-green-600 font-semibold">
                ✅ Email verified successfully! Redirecting...
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-semibold">
                ❌ Verification failed. The link may be invalid or expired.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Side (Background Image + Motivation Text) */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/logout.jpg)" }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">You&apos;re Almost There!</h1>
          <p className="text-lg">
            Secure your account and unlock a world of opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
