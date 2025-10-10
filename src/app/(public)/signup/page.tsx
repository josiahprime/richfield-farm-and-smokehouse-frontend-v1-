"use client"
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation'; // ✅ correct in app directory
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuthStore } from "store/auth/useAuthStore";

// site key: 

// secret key: 
const Signup = () => {
  const recaptchaRef = useRef(null);
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('login button clicked')
    e.preventDefault();

    let token = '';
    if (recaptchaRef.current) {
      console.log("✅ Executing reCAPTCHA...");
      token = await recaptchaRef.current.executeAsync();
      console.log("🎯 reCAPTCHA Token:", token);
      recaptchaRef.current.reset();
    } else {
      console.warn("⚠️ recaptchaRef is null");
    }




    // const token = await recaptchaRef.current.executeAsync();
    // recaptchaRef.current.reset()

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    const result = await signup({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      recaptchaToken: token, 
    });
    

    if (result?.success) {
      toast.success("Verification email sent! Please check your inbox.");
      router.push("/login");
    } else {
      toast.error(result?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
          <div className="uppercase text-2xl font-bold mb-4">
            Rich<span className="text-green-500">Field</span>
          </div>

          <h3 className="text-xl mb-4 mt-2 text-black">Sign Up</h3>
          <p className="mb-6 text-gray-600">Create your account to get started.</p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Form */}
          <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className={`w-full bg-black text-white py-3 rounded-md font-semibold ${
                  isSigningUp ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSigningUp ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {/* Hidden reCAPTCHA */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_FRONTEND_KEY || ''}
              size="invisible"
            />
          </div>

          <div className="flex items-center my-4">
            <div className="border-t flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t flex-grow"></div>
          </div>

          <button className="w-full border py-3 rounded-md font-semibold flex items-center justify-center">
            <Image src="/images/googleIcon.png" alt="Google logo" width={24} height={24} className="mr-2" />
            Sign up with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => router.push("/login")}
            >
              Log in
            </button>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url(/images/logout.jpg)" }}>
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
          <p className="text-lg">Start for free and get attractive offers from the community</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
