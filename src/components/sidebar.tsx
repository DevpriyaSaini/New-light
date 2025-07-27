"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";

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
    <nav className="bg-gray-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
             <img src="https://imgs.search.brave.com/lkIuRGzrNmt9JVgk4KscDk0Yt62nUkoSOOziXEO9fVs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3Ivc2Nob29sLWxv/Z28tZGVzaWduLXRl/bXBsYXRlLWN1c3Rv/bWl6YWJsZS1lZHVj/YXRpb24tbG9nby1p/ZGVhc183MzExMzYt/MTUwLmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDA" className="w-13 rounded-full" />
            </Link>
             <Link href="/">
            <p className="ml-1.5">New-light</p>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/Admin/add-teacher"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Teacher
            </Link>
            <Link
              href="/Admin/add-topper"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Topper
            </Link>
            <Link
              href="/Admin/add-alumni"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Alumni
            </Link>
            <Link
              href="/Admin/add-headline"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Tags
            </Link>
            <Link
              href="/Admin/add-events"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Events
            </Link>
            <Link
              href="/Admin"
              className="px-3 py-2 rounded-md text-sm font-medium bg-white/80 hover:bg-white/80 transition-colors text-black"
            >
              Admin
            </Link>
            <Button onClick={handleLogout}>Signout</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
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
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/Admin/add-teacher"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Add Teacher
          </Link>
          <Link
            href="/Admin/add-topper"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Add Topper
          </Link>
          <Link
            href="/Admin/add-alumni"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Add Alumni
          </Link>
          <Link
            href="/Admin/add-headline"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Add Tags
          </Link>
          <Link
            href="/Admin/add-events"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Add events
          </Link>
          
          <Link
            href="/Admin"
            className="block w-full px-3 py-2 rounded-md text-base font-medium bg-white/80 text-black"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
           <button className=" w-full block px-3 py-2 rounded-md text-base font-medium bg-white/80 text-black" onClick={handleLogout}>Signout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;