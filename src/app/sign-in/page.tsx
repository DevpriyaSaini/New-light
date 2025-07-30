"use client"
import { NavbarDemo } from '@/components/navbar';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from "sonner"

function Loginpage() {
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
     
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
  <div className="fixed w-full top-0 z-50">
    <NavbarDemo />
  </div>
  
  <div className="w-full max-w-md">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Login here</h1>
    </div>
    
    <form 
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-8 space-y-6 transition-colors duration-300"
    >
      <div className="space-y-4">
        <div>
          <input 
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
          />
        </div>
        
        <div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
      >
        Login
      </button>
    </form>
    
    <div className="mt-4">
      <p className="mt-6 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
        Don't have an account?{' '}
        <Link 
          href="/sign-up" 
          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-300"
        >
          Register here
        </Link>
      </p>
    </div>
  </div>
</div>
  )
}

export default Loginpage