"use client"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { CldImage } from 'next-cloudinary'
import { NavbarDemo } from '@/components/navbar'

export interface Student {
    _id: string;
    studentname: string;
    studentId: string;
    class: string;
    position: string;
    image: string;
   
}

function Reportcardpage() {
    const [studentId, setStudentId] = useState("")
    const [loading, setLoading] = useState(false)
    const [reportcard, setReportcard] = useState<Student | null>(null)
    const [error, setError] = useState("")

    async function fetchReportcard() {
       
         
        if (!studentId.trim()) {
            setError("Please enter a student ID")
            return
        }

        setLoading(true)
        setError("")
        setReportcard(null)

        try {
            const response = await axios.get(`/api/reportcard?studentId=${studentId}`)
            
            if (response.data) {
                setReportcard(response.data)
                toast("Report card fetched successfully")
            } else {
                setError("No report card found for this student ID")
            }
        } catch (err) {
            console.error("Error fetching report card:", err)
            setError("Failed to fetch report card. Please try again.")
            toast.error("Failed to fetch report card")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetchReportcard()
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="fixed w-full top-0 z-50 dark -ml-5">
              <NavbarDemo />
            </div>
            <div className="max-w-4xl mx-auto mt-15">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    Student Report Card
                </h1>

                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter Student ID"
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    {error && <p className="mt-2 text-red-500 dark:text-red-400">{error}</p>}
                </form>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-purple-500"></div>
                    </div>
                )}

                {reportcard && (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-6">
        {/* Enhanced Image Container */}
        <div className="relative w-full md:w-72 h-96 rounded-xl overflow-hidden border-4 border-blue-100 dark:border-purple-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
          <CldImage
            src={reportcard.image}
            alt={reportcard.studentname}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority
          />
        </div>

        {/* Student Info */}
        <div className="text-center md:text-left space-y-3 flex-1">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {reportcard.studentname}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">ID:</span> {reportcard.studentId}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">Class:</span> {reportcard.class}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">Position:</span> {reportcard.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
            </div>
        </div>
    )
}

export default Reportcardpage