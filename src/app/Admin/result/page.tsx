'use client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { CldImage } from 'next-cloudinary'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const classOrder = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

type StudentResult = {
  _id: string
  studentname: string
  studentId: string
  position: number
  image: string
  class: string
}

export default function ResultsDashboard() {
  const [activeClass, setActiveClass] = useState(classOrder[0])
  const [allResults, setAllResults] = useState<StudentResult[]>([])
  const [filteredResults, setFilteredResults] = useState<StudentResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Fetch all results on initial load
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/result')
        
        if (!response.ok) throw new Error('Failed to fetch results')
        
        const data = await response.json()
        setAllResults(data)
        // Filter for initial class
        setFilteredResults(data.filter((result: StudentResult) => result.class === classOrder[0]))
      } catch (err: any) {
        setError(err.message)
        toast('Failed to load results')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  // Filter results when active class changes
  useEffect(() => {
    if (allResults.length > 0) {
      setFilteredResults(allResults.filter(result => result.class === activeClass))
    }
  }, [activeClass, allResults])

  const handleDelete = async () => {
    if (!deleteId) return
    
    try {
      const response = await fetch(`/api/result?id=${deleteId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete')
      
      // Update both allResults and filteredResults
      setAllResults(allResults.filter(result => result._id !== deleteId))
      setFilteredResults(filteredResults.filter(result => result._id !== deleteId))
      
      toast('Result deleted successfully')
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete result')
    } finally {
      setIsDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          School Results Dashboard
        </h1>

        {/* Class Tabs */}
        <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6 overflow-x-auto">
          {classOrder.map(className => (
            <button
              key={className}
              onClick={() => setActiveClass(className)}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeClass === className
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {className === 'LKG' ? 'LKG' : 
               className === 'UKG' ? 'UKG' : 
               `Class ${className}`}
            </button>
          ))}
        </div>

        {/* Results Display */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No results found for {activeClass === 'LKG' ? 'LKG' : activeClass === 'UKG' ? 'UKG' : `Class ${activeClass}`}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResults.map((student) => (
              <div 
                key={student._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105"
              >
                {/* ... (rest of your card content remains the same) ... */}
                <div className="p-4 flex flex-col items-center">
                  <div className="relative h-60 w-50 rounded-2xl overflow-hidden mb-4 border-2 border-purple-300 dark:border-purple-800">
                    <CldImage
                      src={student.image}
                      alt={student.studentname}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {student.studentname}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      ID: {student.studentId}
                    </p>
                    <div className="mt-2 px-3 py-1 bg-purple-300 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full inline-block">
                      Position: {student.position}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex justify-center">
                  <button
                    onClick={() => {
                      setDeleteId(student._id)
                      setIsDeleteDialogOpen(true)
                    }}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium px-4 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-white">
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                Are you sure you want to delete this result? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}