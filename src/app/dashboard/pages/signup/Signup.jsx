import React from "react";
import signupPageImg from '../../../../assets/images/loginPageImg2.jpg'; // Replace with the actual signup image
import googleIcon from '../../../../assets/images/googleIcon.png';

const Signup = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
            <div className="uppercase text-2xl font-bold mb-4">
            Rich<span className='text-green-500'>Field</span>
            </div>
          <h3 className="text-xl mb-4">Sign Up</h3>
          <p className="mb-6 text-gray-600">Create your account to get started.</p>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-black text-white py-3 rounded-md font-semibold">
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-t flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t flex-grow"></div>
          </div>

          <button className="w-full border py-3 rounded-md font-semibold flex items-center justify-center">
            <img src={googleIcon} alt="Google logo" className="mr-2" />
            Sign up with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Already have an account? <a href="#" className="text-blue-500">Log in</a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${signupPageImg})` }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
          <p className="text-lg">Start for free and get attractive offers from the community</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
