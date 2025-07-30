// components/AlumniForm.tsx
'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { toast } from 'sonner';

export default function AlumniForm() {
  const [formData, setFormData] = useState({
    notice: '',
    Adminname: ''
  });
  const [errors, setErrors] = useState({
    notice: '',
    Adminname: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      notice: '',
    Adminname: ''
    };

    
    if (!formData.notice.trim()) {
      newErrors.notice = 'notice is required';
      isValid = false;
    }

    if (!formData.Adminname) {
      newErrors.Adminname= 'Image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Reset form on success
      setFormData({
        notice: '',
    Adminname: ''
      });
      setErrors({
        notice: '',
    Adminname: ''
      });
      toast('Submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <div className="bg-white dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <form
    onSubmit={handleSubmit}
    className="space-y-6 max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  >
   

   

    <div>
      <label className="block mb-1 text-gray-800 dark:text-gray-100">Notice *</label>
      <h1 className='dark:text-white text-3xl flex justify-center ml-auto'>Add Notice</h1>
      <textarea
        value={formData.notice}
        onChange={(e) =>
          setFormData({ ...formData, notice: e.target.value })
        }
        className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
          errors.notice? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
        rows={4}
      />
      {errors.notice && (
        <p className="text-sm text-red-500">{errors.notice}</p>
      )}
    </div>
    <div>
      <label className="block mb-1 text-gray-800 dark:text-gray-100">Admin-Name *</label>
      <input
        value={formData.Adminname}
        onChange={(e) =>
          setFormData({ ...formData, Adminname: e.target.value })
        }
        className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
          errors.Adminname? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
        
      />
      {errors.notice && (
        <p className="text-sm text-red-500">{errors.Adminname}</p>
      )}
    </div>

   

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  </form>
</div>

  );
}