"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import Link from 'next/link';
import { toast } from "sonner"

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
        router.replace(`/verify/${user.username}`)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {isLoading ? "Processing..." : "Admin Registration"}
          </h1>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-800 shadow-xl rounded-lg p-8 space-y-6"
        >
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value.trim()})}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              !isFormValid || isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          <Link 
            href="/sign-in" 
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}