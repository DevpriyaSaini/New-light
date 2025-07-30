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
import Link from 'next/link';

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
  title: string;
  description: string;
  image: string;
};

type Headline = {
  _id: string;
  image: string;
  description: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'teacher' | 'toppers' | 'alumni' | 'headline' | 'Academic' | 'Cultural'>('teacher');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'Academic' || activeTab === 'Cultural') {
        const response = await axios.get('/api/events');
        const eventsData = (activeTab === 'Academic' 
          ? response.data?.academicFests 
          : response.data?.culturalFests) || [];
        setEvents(eventsData);
      } else {
        const endpoint = activeTab === 'toppers' ? '/api/toppers' : 
                        activeTab === 'headline' ? '/api/headline' : 
                        `/api/${activeTab}`;
        const response = await axios.get(endpoint);
        
        const data = Array.isArray(response.data) ? response.data : [];
        
        switch(activeTab) {
          case 'teacher': setTeachers(data); break;
          case 'toppers': setToppers(data); break;
          case 'alumni': setAlumni(data); break;
          case 'headline': setHeadlines(data); break;
        }
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab} data:`, error);
      toast.error(`Failed to fetch ${activeTab} data. Please try again.`);
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
      let entityType = '';
      
      if (activeTab === 'Academic' || activeTab === 'Cultural') {
        endpoint = '/api/events';
        entityType = 'fest';
        await axios.delete(endpoint, { 
          data: { 
            id: deleteId,
            festType: activeTab.toLowerCase()
          } 
        });
      } else {
        endpoint = activeTab === 'toppers' ? '/api/toppers' : 
                  activeTab === 'headline' ? '/api/headline' : 
                  `/api/${activeTab}`;
        entityType = activeTab === 'headline' ? 'headline' : activeTab.slice(0, -1);
        await axios.delete(endpoint, { data: { id: deleteId } });
      }
      
      toast.success(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} deleted successfully`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${activeTab} item:`, error);
      toast.error(`Failed to delete ${activeTab === 'Academic' || activeTab === 'Cultural' ? 'fest' : 
                 activeTab === 'headline' ? 'headline' : activeTab.slice(0, -1)}`);
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
      case 'headline': return headlines;
      case 'Academic': 
      case 'Cultural': 
        return events;
      default:
        return [];
    }
  };

  const getName = (item: Teacher | Topper | Alumni | Event | Headline) => {
    if ('teachername' in item) return item.teachername;
    if ('studentname' in item) return item.studentname;
    if ('title' in item) return item.title;
    return 'Headline'; // Default name for headlines
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className='flex justify-between'>
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>
        <Link
  href="/Admin/result"
  className="
     flex items-center h-10 border-2 rounded-2xl
    bg-gray-900 text-white
    dark:bg-white/90 dark:text-gray-900
    px-4 py-2 mb-8
    hover:bg-black/80 dark:hover:bg-white/80
    transition-colors duration-200 mr-10
  "
>
  Result
</Link>

        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6 overflow-x-auto">
          {['teacher', 'toppers', 'alumni', 'headline', 'Academic', 'Cultural'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === tab
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab === 'Academic' ? 'Academic Fests' : 
               tab === 'Cultural' ? 'Cultural Fests' : 
               tab.charAt(0).toUpperCase() + tab.slice(1)}
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
            No {activeTab === 'Academic' ? 'Academic Fests' : 
                activeTab === 'Cultural' ? 'Cultural Fests' : 
                activeTab} found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentData().map((item) => (
              <div 
                key={item._id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="relative h-50 w-full rounded-lg overflow-hidden mb-4">
                    <CldImage
                      src={item.image}
                      alt={getName(item)}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
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
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                This action cannot be undone. This will permanently delete this{' '}
                {activeTab === 'Academic' ? 'Academic Fest' : 
                 activeTab === 'Cultural' ? 'Cultural Fest' : 
                 activeTab === 'headline' ? 'headline' : 
                 activeTab.slice(0, -1)}'s data.
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