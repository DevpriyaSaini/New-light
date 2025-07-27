'use client';

import axios from 'axios';
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
import { CldImage } from 'next-cloudinary';

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

type Event = {
  _id: string;
  fest: string;
  description: string;
  image: string;
  ftype: 'academic' | 'cultural';
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'teacher' | 'toppers' | 'alumni' | 'academic' | 'cultural'>('teacher');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let endpoint = '';
      let response;
      
      if (activeTab === 'academic' || activeTab === 'cultural') {
        endpoint = '/api/events';
        response = await axios.get(endpoint);
        setEvents(response.data.filter((event: Event) => event.ftype === activeTab));
      } else {
        endpoint = activeTab === 'toppers' ? '/api/toppers' : `/api/${activeTab}`;
        response = await axios.get(endpoint);
        
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
      let endpoint = '';
      
      if (activeTab === 'academic' || activeTab === 'cultural') {
        endpoint = '/api/events';
      } else {
        endpoint = activeTab === 'toppers' ? '/api/toppers' : `/api/${activeTab}`;
      }
      
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
      case 'academic': 
      case 'cultural': 
        return events.filter(event => event.ftype === activeTab);
    }
  };

  const getName = (item: Teacher | Topper | Alumni | Event) => {
    if ('teachername' in item) return item.teachername;
    if ('studentname' in item) return item.studentname;
    return item.fest;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6 overflow-x-auto">
          {['teacher', 'toppers', 'alumni', 'academic', 'cultural'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === tab
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Data Grid */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Loading data...</p>
          </div>
        ) : currentData().length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No data found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentData().map((item) => (
              <div 
                key={item._id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-4 flex flex-col items-center">
                   <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                     <CldImage
                      src={item.image}
                      alt={getName(item)}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold text-center text-gray-900 dark:text-white">
                    {getName(item)}
                  </h3>
                  {'description' in item && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex justify-center">
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium px-4 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
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
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                This action cannot be undone. This will permanently delete the {activeTab.slice(0, -1)}'s data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
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