'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from 'store/auth/useAuthStore';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  // const { requestPasswordReset, isRequestingReset } = useAuthStore();
  const requestPasswordReset = useAuthStore((state)=>(state.requestPasswordReset))
  const isRequestingReset = useAuthStore((state)=>(state.isRequestingReset))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestPasswordReset(email);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/login.jpg')` }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
          <p className="text-lg">Enter your email to receive a password reset link.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
          <div className="uppercase text-2xl font-bold mb-4">
            Rich<span className="text-green-500">Field</span>
          </div>
          <h3 className="text-xl mb-4">Request Password Reset</h3>
          <p className="mb-6 text-gray-600">Please enter your email to receive a reset link.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isRequestingReset}
              className={`w-full ${
                isRequestingReset ? 'bg-gray-500' : 'bg-black'
              } text-white py-3 rounded-md font-semibold`}
            >
              {isRequestingReset ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-t flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t flex-grow"></div>
          </div>

          <button className="w-full border py-3 rounded-md font-semibold flex items-center justify-center">
            <Image
              src="/images/googleIcon.png"
              alt="Google logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Reset with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Remembered your password?{' '}
            <a href="/login" className="text-blue-500">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
