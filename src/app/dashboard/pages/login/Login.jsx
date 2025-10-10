import React from "react";
import loginPageImg from '/assets/loginPageImg1.jpg'
import googleIcon from '/assets/googleIcon.png'
const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${loginPageImg})` }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
          <p className="text-lg">Start for free and get attractive offers from the community</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
          <div className="uppercase text-2xl font-bold mb-4">
            Rich<span className='text-green-500'>Field</span>
          </div>
          <h3 className="text-xl mb-4">Login</h3>
          <p className="mb-6 text-gray-600">Welcome Back! Please enter your details.</p>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
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
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me for 30 days
              </label>
              <a href="#" className="text-blue-500">Forgot Password?</a>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-md font-semibold">
              Log in
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-t flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t flex-grow"></div>
          </div>

          <button className="w-full border py-3 rounded-md font-semibold flex items-center justify-center">
            <img src={googleIcon} alt="Google logo" className="mr-2" />
            Sign in with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account? <a href="#" className="text-blue-500">Sign up for free</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
