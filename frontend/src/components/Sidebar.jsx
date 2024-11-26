import React, { useState } from 'react';
import {
  MdHomeFilled,
  MdVideoSettings,
  MdSubscriptions,
  MdHistory,
  MdOutlineWatchLater,
} from 'react-icons/md';
import { SiYoutubeshorts } from 'react-icons/si';
import { LuThumbsUp } from 'react-icons/lu';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-xl" />,
      name: 'Home',
    },
    {
      icon: <SiYoutubeshorts className="text-xl" />,
      name: 'Shorts',
    },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: 'Subscriptions',
    },
  ];

  const otherLinks = [
    {
      icon: <MdVideoSettings className="text-xl" />,
      name: 'Your Videos',
    },
    {
      icon: <MdHistory className="text-xl" />,
      name: 'History',
    },
    {
      icon: <MdOutlineWatchLater className="text-xl" />,
      name: 'Watch Later',
    },
    {
      icon: <LuThumbsUp className="text-xl" />,
      name: 'Liked Videos',
    },
  ];

  return (
    <div
      className={`fixed top-14 left-0 h-screen bg-[#000000] text-white overflow-y-auto transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 z-40 w-64`}
    >
     
      <ul className="flex flex-col border-b-2 border-gray-700 p-4">
        {mainLinks.map(({ icon, name }) => (
          <li
            key={name}
            className="pl-4 py-3 hover:bg-zinc-700 rounded-xl flex items-center gap-5"
          >
            {icon}
            <span>{name}</span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col p-4">
        {otherLinks.map(({ icon, name }) => (
          <li
            key={name}
            className="pl-4 py-3 hover:bg-zinc-700 rounded-xl flex items-center gap-5"
          >
            {icon}
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
