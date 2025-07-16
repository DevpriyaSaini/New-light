'use client';

import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Teacher = {
  _id: string;
  teachername: string;
  image: string;
};

type Topper = {
  _id: string;
  studentname: string;
  image: string;
};

type Alumni = {
  _id: string;
  studentname: string;
  image: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'teacher' | 'toppers' | 'alumni'>('teacher');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const endpoint = activeTab === 'toppers' 
        ? '/api/toppers' 
        : `/api/${activeTab}`;
      
      const response = await axios.get(endpoint);
      
      switch(activeTab) {
        case 'teacher':
          setTeachers(response.data);
          break;
        case 'toppers':
          setToppers(response.data);
          break;
        case 'alumni':
          setAlumni(response.data);
          break;
      }
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab} data`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      const endpoint = activeTab === 'toppers' 
        ? '/api/toppers' 
        : `/api/${activeTab}`;
      
      await axios.delete(endpoint, { data: { id: deleteId } });
      toast.success(`Item deleted successfully`);
      fetchData();
    } catch (error) {
      toast.error(`Failed to delete item`);
      console.error(error);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const currentData = () => {
    switch(activeTab) {
      case 'teacher': return teachers;
      case 'toppers': return toppers;
      case 'alumni': return alumni;
    }
  };

  const getName = (item: Teacher | Topper | Alumni) => {
    return 'teachername' in item ? item.teachername : item.studentname;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'teacher' ? 
              'text-purple-500 border-b-2 border-purple-500' : 
              'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('teacher')}
          >
            Teachers
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'toppers' ? 
              'text-purple-500 border-b-2 border-purple-500' : 
              'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('toppers')}
          >
            Toppers
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'alumni' ? 
              'text-purple-500 border-b-2 border-purple-500' : 
              'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('alumni')}
          >
            Alumni
          </button>
        </div>

        {/* Data Grid */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4">Loading data...</p>
          </div>
        ) : currentData().length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No data found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentData().map((item) => (
              <div key={item._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 flex flex-col items-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src={item.image || '/default-profile.png'}
                      alt={getName(item)}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold text-center">
                    {getName(item)}
                  </h3>
                </div>
                <div className="bg-gray-700 px-4 py-3 flex justify-center">
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="text-red-500 hover:text-red-400 font-medium px-4 py-1 rounded hover:bg-gray-600 transition"
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
          <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                This action cannot be undone. This will permanently delete the {activeTab.slice(0, -1)}'s data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700 border-gray-600 hover:bg-gray-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}