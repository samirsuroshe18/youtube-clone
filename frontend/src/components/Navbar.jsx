import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMicrophone } from 'react-icons/fa';
import { RiVideoAddLine } from 'react-icons/ri';
import { BsBell } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';

import Sidebar from './Sidebar'; // Import the Sidebar component

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex justify-between items-center px-4 h-14 bg-black opacity-95 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu */}
        <button className="text-white text-2xl" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </button>

        <div className="flex items-center gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
            alt="YouTube Logo"
            className="h-6"
          />
          <span className="text-xl text-white font-roboto">YouTube</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex bg-zinc-900 items-center rounded-3xl"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none text-white w-40 sm:w-64 px-4 focus:outline-none"
          />
          <button className="p-2">
            <AiOutlineSearch className="text-white" />
          </button>
        </form>
        <FaMicrophone className="text-white text-xl bg-zinc-600 rounded-full hidden sm:block" />
      </div>

      <div className="flex items-center gap-4">
        <RiVideoAddLine className="text-white text-xl" />
        <BsBell className="text-white text-xl relative" />
        <FaRegUserCircle className="text-white text-xl" />
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
