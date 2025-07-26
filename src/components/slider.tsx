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
    <div className="relative overflow-hidden w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Carousel with dark mode styling */}
        <div className="mb-16 rounded-xl border-gray-700">
          <Carousel slides={slideData} />
        </div>

        {/* School bio with dark mode typography */}
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
            <span className="text-blue-400">New Light</span> Public School
          </h2>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-4 before:w-4 before:bg-blue-500 before:rounded-full before:opacity-30">
              Established in <span className="font-semibold text-blue-400">2000</span> in <span className="font-medium text-gray-100">Dholamazra, Nakur (S.R.E.), Uttar Pradesh</span>, our school is committed to academic excellence and holistic development.
            </p>
            
            <p className="border-l-4 border-blue-900 pl-4 italic bg-gray-700/50 p-4 rounded-r-lg text-blue-200">
              "We provide quality education from primary to senior secondary levels, nurturing young minds to become responsible global citizens."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                "UP-board affiliated curriculum",
                "Modern infrastructure",
                "Experienced faculty",
                "Sports & extracurricular focus"
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <svg className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0 group-hover:text-blue-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 focus:ring-4 focus:ring-blue-500/30">
              Explore Our Campus
              <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-900/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-800/10 blur-3xl"></div>
    </div>
  );
}