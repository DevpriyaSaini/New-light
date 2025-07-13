"use client"
import React, { FormEvent, useState } from 'react';
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

  // Form validation
  const isFormValid = user.username.length > 0 && 
                     user.email.includes('@') && 
                     user.password.length >= 5 &&
                     secret.length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await axios.post("/api/sign-up", {
        ...user,
        adminSecret: secret
      });
      
      if (response.data.success) {
        toast.success("Admin registered successfully!");
        router.push("/sign-in");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-white mb-4">
        {isLoading ? "Processing..." : "Admin Registration"}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value.trim()})}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value.trim()})}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
            Password (min 5 characters)
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            minLength={5}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            required
          />
        </div>

        {/* Admin Secret */}
        <div>
          <label htmlFor="secret" className="block text-sm font-medium text-white mb-1">
            Admin Secret Key
          </label>
          <input
            type="password"
            id="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            !isFormValid || isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="text-center mt-4">
        <Link href="/sign-in" className="text-blue-400 hover:text-blue-300 text-sm">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}