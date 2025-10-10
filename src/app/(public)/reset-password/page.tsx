'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuthStore } from 'store/auth/useAuthStore';
import toast from 'react-hot-toast';


const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const resetPassword = useAuthStore((state) => state.resetPassword);
  const isResettingPassword = useAuthStore((state) => state.isResettingPassword);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // ✅ Redirect users if no token is present
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      return toast.error('Passwords must match and all fields must be filled.');
    }
    if (!token) {
      throw new Error("Reset token is missing in URL");
    }

    const success = await resetPassword({ token, newPassword });
    if (success) {
      router.push('/login'); // ✅ navigation happens here
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/login.jpg')` }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
          <p className="text-lg">Enter your new password below.</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
          <div className="uppercase text-2xl font-bold mb-4">
            Rich<span className="text-green-500">Field</span>
          </div>
          <h3 className="text-xl mb-4">Reset Password</h3>
          <p className="mb-6 text-gray-600">Please enter your new password.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="New Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                onClick={handlePasswordToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            <div>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold disabled:opacity-50"
              disabled={isResettingPassword}
            >
              {isResettingPassword ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

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

export default ResetPassword;
