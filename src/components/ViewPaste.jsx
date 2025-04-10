import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';


const ViewPaste = () => {
  const {id} = useParams();
  const allPaste = useSelector((state)=>state.pastes);
  const paste = allPaste.filter((p)=>p._id === id)[0];

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter title here"
            value={paste.title}
            disabled
            className="w-full sm:w-4/4 p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
  
        </div>
  
        <textarea
          value={paste.content}
          placeholder="Enter content here"
          rows={15}
          disabled
          className="w-full rounded-2xl p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg resize-y"
        />
      </div>
    </div>
  );
  
}

export default ViewPaste;
