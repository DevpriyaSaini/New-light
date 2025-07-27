"use client"
import React, { useState, useEffect } from 'react'
import { HoverEffect } from "./ui/card-hover-effect";
import { toast } from 'sonner';
import { topper } from '@/model/topper';

interface Alumni {
  id: string;
  studentname: string;
  position: string;
  description: string;
  image: string;
  // Add any additional fields you might have
}

function Toppercard() {
  const [topper, setTopper] = useState<topper[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopper() {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/toppers");
      const data = await response.json();
      setTopper(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch topper data');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopper();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading  topper...</p>
      </div>
    );
  }

  return (
    <div  id="Toppers"className="bg-white/40 dark:bg-black  py-12 bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
           <p className=" text-3xl leading-8 font-extrabold tracking-tight dark:text-white sm:text-4xl">
            Meet to our toppers
          </p>
          <h1 className=" mt-2 text-base text-teal-600 font-semibold tracking-wide uppercase">
            Bright future
          </h1>
          <hr className="mt-4 border-black dark:border-white mx-auto "/>
         
        </div>

        <div className="mt-10">
          {topper.length > 0 ? (
            <HoverEffect 
              items={topper.map(alumnus => ({
                studentname: alumnus.studentname,
                description: alumnus.description,
                image: alumnus.image,
                position: alumnus.position,
                // Map any additional fields needed by HoverEffect
              }))} 
            />
          ) : (
            <p className="text-center text-gray-400">No alumni records found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Toppercard;