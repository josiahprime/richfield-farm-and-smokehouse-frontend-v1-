"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useAuthStore } from "store/auth/useAuthStore";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) toast.error(decodeURIComponent(error as string));
  }, [error]);

  const handlePasswordToggle = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill out all fields");

    try {
      const result = await login({ email, password }); // <- capture result
      if (result) {                                   // <- only redirect if truthy
        router.push("/"); 
      } else {
        toast.error("Invalid email or password");    // <- show error if login failed
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Login failed");
    }
  };


  const handleGoogleLogin = () => {
    // window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };


  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side (hidden on mobile) */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('https://res.cloudinary.com/djmnjen6v/image/upload/v1762093790/loginPageImg1_woqvmm.jpg')` }}
      >
        <div className="flex flex-col justify-center h-full w-full text-white p-12 bg-black/50">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Turn Your Ideas into Reality
          </h1>
          <p className="text-lg">
            Start for free and get attractive offers from the community
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="uppercase text-2xl font-bold mb-4 text-center md:text-left">
            Rich<span className="text-green-500">Field</span>
          </div>

          <h3 className="text-xl mb-2 text-center md:text-left">Login</h3>
          <p className="mb-6 text-gray-600 text-center md:text-left">
            Welcome Back! Please enter your details.
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={handlePasswordToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me for 30 days
              </label>
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 rounded-md font-semibold transition ${
                isLoggingIn
                  ? "bg-gray-400 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isLoggingIn ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="border-t flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t flex-grow"></div>
          </div>

          {/* Google Button */}
          <button
            className="w-full border py-3 rounded-md font-semibold flex items-center justify-center hover:bg-gray-100"
            onClick={handleGoogleLogin}
          >
            <Image
              src="https://res.cloudinary.com/djmnjen6v/image/upload/v1762093061/googleIcon_ycpzgf.png"
              alt="Google logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign in with Google
          </button>

          {/* Signup */}
          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => router.push("/signup")}
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
