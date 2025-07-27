"use client"
import React, { useState, useEffect } from 'react'
import { HoverEffect } from "./ui/card-hover-effect";
import { toast } from 'sonner';

interface Alumni {
  id: string;
  studentname: string;
  post: string;
  description: string;
  image: string;
  // Add any additional fields you might have
}

function Alumnircard() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAlumni() {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/alumni");
      const data = await response.json();
      setAlumni(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch alumni data');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlumni();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading alumni...</p>
      </div>
    );
  }

  return (
    <div id='Alumni' className="py-12 bg-gray-50 dark:bg-black/90">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <p className="text-3xl text-gray-900 dark:text-white leading-8 font-extrabold tracking-tight sm:text-4xl">
        Stay Connected. Stay Inspired!
      </p>
      <h2 className="mt-2 text-base text-teal-600 dark:text-teal-400 font-semibold tracking-wide uppercase">
        Our Alumni Network
      </h2>
      <hr className="mt-4 border-black dark:border-white mx-auto " />
    </div>

    <div className="mt-10">
      {alumni.length > 0 ? (
        <HoverEffect 
          items={alumni.map(alumnus => ({
            studentname: alumnus.studentname,
            description: alumnus.description,
            image: alumnus.image,
            post: alumnus.post,
            // Map any additional fields needed by HoverEffect
          }))} 
        />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No alumni records found
        </p>
      )}
    </div>
  </div>
</div>
  );
}

export default Alumnircard;