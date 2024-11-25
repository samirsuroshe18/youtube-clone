import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdVideoCall } from "react-icons/md";

import ytLogo from "../assets/images/youtube.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-14 h-14 bg-black opacity-95 sticky top-0 z-50">
      <div className="flex gap-8 items-center text-2xl">
        <div className="text-white left-0">
          <GiHamburgerMenu />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <BsYoutube className="text-3xl text-red-600" />
          <span className="text-2xl text-white font-roboto">Youtube <sup className="text-xs">IN</sup></span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();            
          }}
        >
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl">
            <div className="flex gap-5 items-center pr-5 text-white">
              <input
                type="text"
                placeholder="Search"
                className="w-96 bg-zinc-900 focus:outline-none border-none text-white"
                
              />
            </div>
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl">
              <AiOutlineSearch className="text-xl text-gray-600" />
            </button>
          </div>
        </form>

        <div className="text-xl p-2.5 bg-zinc-900 rounded-full text-white">
          <FaMicrophone />
        </div>
      </div>
      <div className="flex gap-8 items-center text-white text-xl">
        <RiVideoAddLine />
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            {" "}
            9+{" "}
          </span>
        </div>
        <span >
        <FaRegUserCircle className="w-6 h-6 rounded-full"/>
        </span>
        {/* <img
          src={}
          alt="profile logo"
          className="w-9 h-9 rounded-full"
        /> */}
      </div>
    </div>
  );
};

export default Navbar;
