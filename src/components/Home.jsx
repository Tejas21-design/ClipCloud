import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Redux/pasteSlice';
import { useEffect } from 'react';
import { Plus,Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => (state.pastes));

    // For Edit
    useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((t)=>t._id === pasteId);
        setTitle(paste.title)
        setValue(paste.content)
      }
    }, [pasteId]);

    function createPaste(){
        const paste = {
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }
        if(paste.title == "" || paste.content == undefined){
            toast.error("Please fill all the fields");
            return;
        }
        if(pasteId){
            dispatch(updateToPastes(paste));
        }else{
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({})
    }
  
    return (
        <div className="min-h-screen bg-[#f9fafb] flex items-start justify-center pt-16 px-4">
          <div className="w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full sm:w-4/4 p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
      
              <button
                onClick={createPaste}
                className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                {/* {pasteId ? "Update My Paste" : "Create My Paste"} */}
                {pasteId ? <Save size={18} /> : <Plus size={18} />}
              </button>
            </div>
      
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter content here"
              rows={15}
              className="w-full rounded-2xl p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg resize-y"
            />
          </div>
        </div>
      );
}

export default Home;
