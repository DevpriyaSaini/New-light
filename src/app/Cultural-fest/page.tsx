"use client";
import { NavbarDemo } from '@/components/navbar';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CultureEvent {
  id: string;
  fest: string;
  description: string;
  image: string;
}

function Events() {
  const [events, setEvents] = useState<CultureEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data.culturalFests ||  []); // More flexible data handling
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch events');
      toast.error('Failed to fetch events data');
    } finally {
      setLoading(false);
    }
  }
  
  

  useEffect(() => {
    fetchEvents();
   
  }, []);

   console.log(events);
  
if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading teachers...</p>
      </div>
    );
  }
  return (
   
   <div className="container mx-auto px-4 py-8">
 <div className="fixed w-full top-0 z-50 -left-2 ">
   <NavbarDemo />
 </div>

  <h1 className="mt-10 text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
    Cultural Events
  </h1>

  <hr />

  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {events.map((event) => (
      <div
        key={event.id}
        className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition-all hover:shadow-xl hover:-translate-y-1"
      >
        <div className="relative aspect-square">
          <CldImage
            src={event.image}
            alt={event.fest}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={events.indexOf(event) < 3}
          />
          <div className="">
            <h3 className="text-x2l font-semibold text-black">{event.fest}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {event.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default Events;