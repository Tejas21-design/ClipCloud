import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';
import { NavLink } from 'react-router-dom';
import { Edit, Eye, Trash2, Copy, Share2, Calendar } from "lucide-react";
import toast from 'react-hot-toast';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import ShareModal from './ShareModal';

const Paste = () => {

  const pastes = useSelector((state) => state.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  const [selectedPasteId, setSelectedPasteId] = useState(null);

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="flex flex-col items-center w-full px-4 py-8 bg-gray-50 min-h-screen">
      {/* Search Input */}
      <input
        className="w-full max-w-3xl p-3 rounded-2xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="search"
        placeholder="Search Data"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste Cards */}
      <div className="flex flex-col gap-6 mt-8 w-full max-w-4xl">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              key={paste?._id}
            >
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {paste.title}
              </h2>

              {/* Content */}
              <p className="text-sm text-gray-600 mb-4">{paste.content}</p>

              {/* Button Actions */}
              <div className="flex flex-wrap gap-3 justify-between items-center mb-3">
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                  <NavLink to={`/?pasteId=${paste?._id}`}><Edit size={16} /></NavLink>
                </button>

                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                  <NavLink to={`/pastes/${paste?._id}`}><Eye size={16} /></NavLink>
                </button>

                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => handleDelete(paste?._id)}
                >
                  <Trash2 size={16} />
                </button>

                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to Clipboard Successfully!");
                  }}
                >
                  <Copy size={16} />
                </button>

                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => setSelectedPasteId(paste._id)}
                >
                  <Share2 size={16} />
                </button>

                {selectedPasteId && (
                  <ShareModal
                    isOpen={true}
                    onClose={() => setSelectedPasteId(null)}
                    pasteId={selectedPasteId}
                  />
                )}
              </div>

              {/* Created Date */}
              <div className='flex gap-2'>
                <Calendar size={14} className='' />
                <p className="text-xs text-gray-400">
                  {new Date(paste.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}

                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );


}

export default Paste;
