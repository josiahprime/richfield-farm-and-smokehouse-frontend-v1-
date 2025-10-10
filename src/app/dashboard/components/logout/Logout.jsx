import React from "react";
import logoutPageImg from '/assets/loginPageImg1.jpg'; // Replace with the appropriate logout image

const Logout = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${logoutPageImg})` }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">You’ve Logged Out</h1>
          <p className="text-lg">
            Thank you for managing the dashboard. If you need to log back in, use the button on the right.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
          <h2 className="text-2xl font-semibold mb-6">Goodbye, Admin!</h2>
          <p className="mb-6 text-gray-600">
            You’ve successfully logged out. We hope to see you again soon!
          </p>

          <button
            onClick={() => (window.location.href = "/admin/login")} // Redirect to admin login page
            className="w-full bg-black text-white py-3 rounded-md font-semibold"
          >
            Log Back In
          </button>

          <div className="flex items-center my-6">
            <div className="border-t flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t flex-grow"></div>
          </div>

          <button
            onClick={() => alert("You have exited the admin panel.")}
            className="w-full border py-3 rounded-md font-semibold"
          >
            Exit Dashboard
          </button>

          <p className="text-center text-gray-600 mt-6">
            Need help? <a href="#" className="text-blue-500">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
