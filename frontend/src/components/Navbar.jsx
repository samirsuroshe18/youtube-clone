import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMicrophone } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { MdVideoCall } from "react-icons/md";

import ytLogo from "../assets/images/youtube.png";

const Navbar = () => {
  return (
    <div className="flex justify-between px-10 h-14 items-center sticky bg-black">
      <div className="flex gap-8 items-center text-2xl text-white">
        <div>
          <GiHamburgerMenu />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <img src={ytLogo} width={45} alt="youtube logo" />
          <span>Youtube</span>
        </div>
      </div>
      <div>
        <div className="w-20 "></div>
      </div>
      <div className="text-xl p-3 bg-zinc-900 rounded-full">
        <FaMicrophone />
      </div>
      <div className="flex gap-7 text-xl items-center">
        <MdVideoCall />
      </div>
    </div>
  );
};

export default Navbar;
