"use client"
import { useState } from 'react';

export default function UploadForm() {
  const [form, setForm] = useState({
    studentname: '',
    position: '',
    description: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('studentname', form.studentname);
    formData.append('position', form.position);
    formData.append('description', form.description);
    formData.append('image', file);

    try {
      const res = await fetch('/api/toppers', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      alert('Upload successful!');
      // Reset form
      setForm({ studentname: '', position: '', description: '' });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="mt-20 max-w-md mx-auto">
   <h1 className='ml-8 text-4xl mb-4'>Add Toppers here</h1>
  <form 
    onSubmit={handleSubmit} 
    className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300"
  >
    <div className="space-y-2">
      <label 
        htmlFor="studentname" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Student Name
      </label>
      <input
        type="text"
        id="studentname"
        placeholder="Enter student name"
        value={form.studentname}
        onChange={(e) => setForm({...form, studentname: e.target.value})}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />
    </div>

    <div className="space-y-2">
      <label 
        htmlFor="position" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Position
      </label>
      <input
        type="text"
        id="position"
        placeholder="Enter position"
        value={form.position}
        onChange={(e) => setForm({...form, position: e.target.value})}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />
    </div>

    <div className="space-y-2">
      <label 
        htmlFor="description" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Description
      </label>
      <textarea
        id="description"
        placeholder="Enter description"
        value={form.description}
        onChange={(e) => setForm({...form, description: e.target.value})}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />
    </div>

    <div className="space-y-2">
      <label 
        htmlFor="image" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Profile Image
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {file ? file.name : "PNG, JPG, JPEG (MAX. 5MB)"}
            </p>
          </div>
          <input 
            id="image" 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden" 
            required
          />
        </label>
      </div>
    </div>

    <button
      type="submit"
      disabled={loading}
      className={`w-full px-4 py-3 rounded-md font-medium transition-colors duration-300 ${
        loading 
          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white'
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Uploading...
        </span>
      ) : 'Upload'}
    </button>
  </form>
</div>
    
  );
}