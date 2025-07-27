"use client";

import { Carousel } from "./ui/carousel";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Heading {
  description: string;
  button: string;
  image: string;
  id?: string; // Optional id field if needed
}

export function CarouselDemo() {
  const [headline, setHeadline] = useState<Heading[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  async function fetchheadline() {
    try {
      const res = await fetch("/api/headline");
      const data = await res.json();
      setHeadline(data);
    } catch (error) {
      toast.error('Failed to fetch Headline data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchheadline();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading Headline...</p>
      </div>
    );
  }

  const slideData = headline.map(item => ({
    title: item.description,
    button: item.button,
    src: item.image, // Fixed typo from 'scr' to 'src'
    id: item.id || Math.random().toString(36).substring(2, 9) // Fallback ID if not provided
  }));

  return (
   <div className="relative overflow-hidden w-full min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Carousel */}
    <div className="mb-16 rounded-xl  dark:border-gray-700">
      <Carousel slides={slideData} />
    </div>

    {/* School bio */}
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-lg border dark:border-gray-700">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        <span className="text-blue-600 dark:text-blue-400">New Light</span> Public School
      </h2>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        <p className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-4 before:w-4 before:bg-blue-500 before:rounded-full before:opacity-30">
          Established in <span className="font-semibold text-blue-600 dark:text-blue-400">2000</span> in <span className="font-medium text-gray-800 dark:text-gray-100">Dholamazra, Nakur (S.R.E.), Uttar Pradesh</span>
        </p>
        
        <p className="border-l-4 border-blue-200 dark:border-blue-900 pl-4 italic bg-gray-100 dark:bg-gray-700/50 p-4 rounded-r-lg text-blue-700 dark:text-blue-200">
          "We provide quality education..."
        </p>
        
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
  {[
    "UP-board affiliated curriculum",
    "Modern infrastructure",
    "Experienced faculty",
    "Sports & extracurricular focus"
  ].map((feature, index) => (
    <div key={index} className="flex items-start space-x-3 group">
      <svg 
        className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {feature}
      </span>
    </div>
  ))}
</div>
          </div>
      
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/30">
          Explore Our Campus
          <svg className="w-4 h-4 ml-2 inline-block">
            {/* SVG path */}
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-200/30 dark:bg-blue-900/10 blur-3xl"></div>
  <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-200/30 dark:bg-blue-800/10 blur-3xl"></div>
</div>
  );
}