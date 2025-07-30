"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import ThemeToggle from "@/app/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: '/sign-in'
      });
      // Clear client-side cache and redirect
      router.push('/sign-in');
      router.refresh(); // Ensure client cache is cleared
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white/50 dark:bg-gray-900 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/DALL·E 2024-12-04 15.58.24 - A modern and professional logo design for 'New Light Public School'. The logo features a glowing sun rising over an open book, symbolizing knowledge a.webp" 
            className="w-15 h-15 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
            alt="School Logo"
          />
          <p className="ml-3 text-gray-800 dark:text-gray-200 font-medium">New Light</p>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-2">
        <Link
          href="/Admin/add-teacher"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Add Teacher
        </Link>
        <Link
          href="/Admin/add-topper"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Add Topper
        </Link>
        <Link
          href="/Admin/add-alumni"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Add Alumni
        </Link>
        <Link
          href="/Admin/add-headline"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Add Tags
        </Link>
        <Link
          href="/Admin/add-events"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Add Events
        </Link>
        <Link
          href="/Admin/add-result"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Add Result
        </Link>
        <Link
          href="/Admin/add-notice"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Add Notice
        </Link>
        <Link
          href="/Admin"
          className="px-3 py-2 rounded-md text-sm font-medium  bg-gray-800 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-200  text-white dark:text-gray-900"
        >
          Admin
        </Link>
        <Button 
          onClick={handleLogout}
          className=" bg-gray-800 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-200  text-white dark:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Sign Out
        </Button>
        <ThemeToggle/>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle/>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile menu */}
  <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm pb-2`}>
    <div className="px-2 pt-2 pb-3 space-y-1">
      <Link
        href="/Admin/add-teacher"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Add Teacher
      </Link>
      <Link
        href="/Admin/add-topper"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Add Topper
      </Link>
      <Link
        href="/Admin/add-alumni"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Add Alumni
      </Link>
      <Link
        href="/Admin/add-headline"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Add Tags
      </Link>
      <Link
        href="/Admin/add-events"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Add Events
      </Link>
      <Link
        href="/Admin/add-result"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Add Result
      </Link>
      <Link
        href="/Admin/add-notice"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Add Notice
      </Link>
      <Link
        href="/Admin"
        className="block w-full px-3 py-2 rounded-md text-base font-medium bg-gray-800 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors text-gray-100 dark:text-black"
        onClick={() => setIsOpen(false)}
      >
        Admin
      </Link>
      <button 
        className="block w-full px-3 py-2 rounded-md text-base font-medium bg-gray-800 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors text-gray-100 dark:text-black"
        onClick={handleLogout}
      >
        Sign Out
      </button>
      
    </div>
  </div>
</nav>
  );
};

export default Navbar;