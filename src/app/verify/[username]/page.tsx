'use client';

import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner"

function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [verifycode, setVerifycode] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/verify-email`, {
        username: params.username,
        code: verifycode,
      });
      toast(response.data.message);
      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as any;
      toast(axiosError.response?.data.message ??
        'An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Verify Your Account
          </h1>
          <p className="mt-2 text-gray-400">
            Enter the verification code sent to your email
          </p>
        </div>
        
        <form 
          onSubmit={onSubmit}
          className="bg-gray-800 shadow-xl rounded-lg p-8 space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Verification Code"
              value={verifycode}
              onChange={(e) => setVerifycode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Verify Account
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-400">
          <p>
            Didn't receive a code?{' '}
            <button 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              onClick={() => toast('Resend functionality would go here')}
            >
              Resend code
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount