"use client"
import React, { useState, useEffect } from 'react'
import { HoverEffect } from "./ui/card-hover-effect";
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

interface Teacher {
  id: string;
  teachername: string;
  education: string;
  description: string;
  experience: string;
  image: string;
}

function Teachercard() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTeachers() {
    try {
      const response = await axios.get("/api/teacher");
      setTeachers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch teachers');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading teachers...</p>
      </div>
    );
  }

  return (
    <div className="-mt-5 py-18 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Top Educators</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Let's make dreams true with!</p>
        </div>

        <div className="mt-10">
          {teachers.length > 0 ? (
            <HoverEffect items={teachers.map(teacher => ({
              teachername: teacher.teachername,
              description: teacher.description,
              image: teacher.image,
              education: teacher.education,
              experience: teacher.experience
            }))} />
          ) : (
            <p className="text-center text-gray-400">No teachers found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teachercard;