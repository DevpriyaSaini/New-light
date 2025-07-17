"use client"
import { NavbarDemo } from '@/components/navbar';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from "sonner"

function page() {
    const [email,setEmail]=useState("");
        const [password,setPassword]=useState("");
        const router=useRouter();



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast(result.error)
      console.log(result.error);
    } else {
      toast("sign-in sucessfully")
      router.push("/Admin");
    }
  };
  return (
     
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
       <div className="fixed w-full top-0 z-50 dark">
            <NavbarDemo />
            </div>
  <div className="w-full max-w-md">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white">Login here</h1>
    </div>
    
    <form 
      onSubmit={handleSubmit}
      className="bg-gray-800 shadow-xl rounded-lg p-8 space-y-6"
    >
      <div className="space-y-4">
        <div>
          <input 
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
        
        <div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        Login
      </button>
    </form>
    <div className="mt-4 ">
  
  <p className="mt-6 text-center text-gray-400">
      Don't have an account?{' '}
      <Link 
        href="/sign-up" 
        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
      >
        Register here
      </Link>
    </p>
</div>
  </div>
  
</div>
  )
}

export default page