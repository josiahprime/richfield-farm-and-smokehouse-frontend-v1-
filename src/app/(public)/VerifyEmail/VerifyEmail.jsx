'use client'

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("emailToken") || searchParams.get("token");

  // Fix cases where Gmail wraps the URL
  const emailToken = token?.includes("http") ? new URL(token).searchParams.get("emailToken") : token;
  console.log("Fixed Extracted Token:", emailToken);

  // const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const [status, setStatus] = useState("verifying");

  console.log("Extracted emailToken:", token);
  
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        console.log('verifying e-mail...')
        const success = await verifyEmail({ emailToken: emailToken });

        if (success) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [token, navigate, verifyEmail]);

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
        style={{ backgroundImage: "url(https://res.cloudinary.com/djmnjen6v/image/upload/v1762427208/ivan-sabayuki-2WmVYrCwEKg-unsplash_nxnys6.jpg)" }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">You're Almost There!</h1>
          <p className="text-lg">
            Secure your account and unlock a world of opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
