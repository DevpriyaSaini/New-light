'use client';


import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner"

function VerifyAccount() {
 const router = useRouter();
  const params = useParams<{ username: string }>();
  const[verifycode,setVerifycode]=useState("");

  const onSubmit = async () => {
    try {
        const response = await axios.post(`/api/verify-email`, {
        username: params.username,
        code:verifycode,

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
          <form onSubmit={onSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label htmlFor="verifycode" className="block text-sm font-medium text-gray-700 mb-1">
            Verify-code
          </label>
          <input
            type="text"
            id="username"
            value={verifycode}
            onChange={(e) => setVerifycode( e.target.value.trim)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

         <button
          type="submit"
          
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          Verify
        </button>
        </form>
        
      </div>
    </div>
  )
}

export default VerifyAccount