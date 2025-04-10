import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
   <nav className="bg-[#0a0f24] py-4 px-6 shadow-sm w-full">
      <div className="flex justify-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-semibold ${
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `text-sm font-semibold ${
              isActive
                ? "text-blue-500"
                : "text-gray-400 hover:text-blue-400"
            }`
          }
        >
          Paste
        </NavLink>
      </div>
    </nav>
  );
};

export default Home;
