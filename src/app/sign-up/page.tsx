"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import Link from 'next/link';
import { toast } from "sonner"
import { NavbarDemo } from '@/components/navbar';

interface UserData {
  username: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData>({
    username: "",
    email: "",
    password: ""
  });
  const [secret, setSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = user.username && user.email && user.password.length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      setIsLoading(true);
      
      if (secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
        toast("Admin-secret key is wrong")
        throw new Error("Invalid admin secret");
      }

      const response = await axios.post("/api/sign-up", user);
      
      if (response.data.success) {
        toast("Admin registered successfully")
        router.replace("/sign-in")
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
  <div className="fixed w-full top-0 z-50">
    <NavbarDemo />
  </div>
  
  <div className="w-full max-w-md">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        {isLoading ? "Processing..." : "Admin Registration"}
      </h1>
    </div>
    
    <form 
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-8 space-y-6 transition-colors duration-300"
    >
      <div className="space-y-4">
        {/* Username Field */}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value.trim()})}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value.trim()})}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            placeholder="Password (min 5 characters)"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            minLength={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>

        {/* Admin Secret */}
        <div>
          <input
            type="password"
            placeholder="Admin Secret Key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 ${
          !isFormValid || isLoading 
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
            : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
        }`}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>

    <div className="mt-6 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <Link 
        href="/sign-in" 
        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-300"
      >
        Already have an account? Sign in
      </Link>
    </div>
  </div>
</div>
  );
}