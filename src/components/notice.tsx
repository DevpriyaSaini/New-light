"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FiX, FiEdit, FiTrash2, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { toast } from 'sonner';

interface Notice {
  _id: string;
  notice: string;
  Adminname: string;
  createdAt?: string;
}

interface ManagerInfo {
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: string;
  about: string;
}

const NoticePage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<string | null>(null);
  const {data}=useSession();
  const [managerInfo] = useState<ManagerInfo>({
    name: 'Mr. Lalit Dhiman ',
    position: 'Manager',
    email: 'principal@schoolexample.edu',
    phone: '+1 (555) 123-4567',
    photo: '/principal.jpg',
    about: 'Mr Lalit has over 15 years of experience in education leadership. She holds a PhD in Educational Administration and is committed to creating an inclusive learning environment for all students.'
  });
  const [principal] = useState<ManagerInfo>({
    name: 'Mr. Mukesh Saharma ',
    position: 'Principal',
    email: 'principal@schoolexample.edu',
    phone: '+1 (555) 123-4567',
    photo: '/principal.jpg',
    about: 'Mr Mukesh has over 15 years of experience in education leadership. She holds a PhD in Educational Administration and is committed to creating an inclusive learning environment for all students.'
  });

  async function fetchNotices() {
    try {
      const res = await fetch("/api/notice");
      if (!res.ok) throw new Error('Failed to fetch notices');
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      toast.error('Failed to fetch notices');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDeleteNotice = async (id: string) => {
    if (!isAdmin) {
      toast.error('Only admin can delete notices');
      return;
    }
    
    try {
      const response = await axios.delete(`/api/notice?id=${id}`);
      if (response.status === 200) {
        toast.success('Notice deleted successfully');
        setNotices(notices.filter(notice => notice._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete notice');
      console.error(error);
    } finally {
      setNoticeToDelete(null);
    }
  };

  

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
   <div className="container mx-auto px-4 py-8 bg-white/80 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

    <h1 className="text-3xl flex justify-center mb-2 font-bold text-gray-800 dark:text-white">School Notices</h1>
   
  

  {/* Manager/Principal Info Section */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4 flex justify-center">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
          {managerInfo.photo ? (
            <img 
              src={managerInfo.photo} 
              alt={managerInfo.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <FiUser className="text-gray-400 dark:text-gray-300 text-4xl" />
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{managerInfo.name}</h2>
        <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">{managerInfo.position}</p>
        
        <div className="flex items-center gap-2 mb-2">
          <FiMail className="text-gray-600 dark:text-gray-400" />
          <a 
            href={`mailto:${managerInfo.email}`} 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {managerInfo.email}
          </a>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <FiPhone className="text-gray-600 dark:text-gray-400" />
          <a 
            href={`tel:${managerInfo.phone.replace(/\D/g, '')}`} 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {managerInfo.phone}
          </a>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-300">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">About {managerInfo.name}</h3>
          <p className="text-gray-700 dark:text-gray-300">{managerInfo.about}</p>
        </div>
      </div>
    </div>
  </div>
  {/* principal section */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4 flex justify-center">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
          {principal.photo ? (
            <img 
              src={principal.photo} 
              alt={principal.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <FiUser className="text-gray-400 dark:text-gray-300 text-4xl" />
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{principal.name}</h2>
        <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">{principal.position}</p>
        
        <div className="flex items-center gap-2 mb-2">
          <FiMail className="text-gray-600 dark:text-gray-400" />
          <a 
            href={`mailto:${principal.email}`} 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {principal.email}
          </a>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <FiPhone className="text-gray-600 dark:text-gray-400" />
          <a 
            href={`tel:${principal.phone.replace(/\D/g, '')}`} 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {principal.phone}
          </a>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-300">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">About {principal.name}</h3>
          <p className="text-gray-700 dark:text-gray-300">{principal.about}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Notices Section */}
  <div className="grid gap-6">
    {notices.length === 0 ? (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400">No notices available</p>
      </div>
    ) : (
      notices.map(notice => (
        <div 
          key={notice._id} 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative transition-colors duration-300 hover:shadow-lg dark:hover:shadow-gray-700/50"
        >
          {data && (
            <div className="absolute top-1 right-2 mr-4 gap-2">
              
              <button 
                className="p-1 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
                onClick={() => setNoticeToDelete(notice._id)}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{notice.notice}</h2>
              {notice.createdAt && (
                <span className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <p className="text-gray-700 dark:text-gray-300">Posted by: {notice.Adminname}</p>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Delete Confirmation Modal */}
  {noticeToDelete && (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Confirm Deletion</h3>
          <button 
            onClick={() => setNoticeToDelete(null)} 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <FiX size={20} />
          </button>
        </div>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this notice?</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setNoticeToDelete(null)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={() => handleDeleteNotice(noticeToDelete)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default NoticePage;