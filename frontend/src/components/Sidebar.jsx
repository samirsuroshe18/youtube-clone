// import React, { useState } from 'react';
// import {
//   MdHomeFilled,
//   MdVideoSettings,
//   MdSubscriptions,
//   MdHistory,
//   MdOutlineWatchLater,
// } from 'react-icons/md';
// import { SiYoutubeshorts } from 'react-icons/si';
// import { LuThumbsUp } from 'react-icons/lu';

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const mainLinks = [
//     {
//       icon: <MdHomeFilled className="text-xl" />,
//       name: 'Home',
//     },
//     {
//       icon: <SiYoutubeshorts className="text-xl" />,
//       name: 'Shorts',
//     },
//     {
//       icon: <MdSubscriptions className="text-xl" />,
//       name: 'Subscriptions',
//     },
//   ];

//   const otherLinks = [
//     {
//       icon: <MdVideoSettings className="text-xl" />,
//       name: 'Your Videos',
//     },
//     {
//       icon: <MdHistory className="text-xl" />,
//       name: 'History',
//     },
//     {
//       icon: <MdOutlineWatchLater className="text-xl" />,
//       name: 'Watch Later',
//     },
//     {
//       icon: <LuThumbsUp className="text-xl" />,
//       name: 'Liked Videos',
//     },
//   ];

//   return (
//     <div
//       className={`fixed top-14 left-0 h-screen bg-[#000000] text-white overflow-y-auto transform ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } transition-transform duration-300 z-40 w-64`}
//     >

//       <ul className="flex flex-col border-b-2 border-gray-700 p-4">
//         {mainLinks.map(({ icon, name }) => (
//           <li
//             key={name}
//             className="pl-4 py-3 hover:bg-zinc-700 rounded-xl flex items-center gap-5"
//           >
//             {icon}
//             <span>{name}</span>
//           </li>
//         ))}
//       </ul>

//       <ul className="flex flex-col p-4">
//         {otherLinks.map(({ icon, name }) => (
//           <li
//             key={name}
//             className="pl-4 py-3 hover:bg-zinc-700 rounded-xl flex items-center gap-5"
//           >
//             {icon}
//             <span>{name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React from "react";
import { sidebarLinks } from "../constants";
import {
  Home,
  Video,
  TvMinimal,
  UserRound,
  History,
  Clock4,
  Flame,
  Music,
  Gamepad2,
  Trophy,
  TvMinimalPlay,
  ListMusic,
  Tv,
  Settings,
  Flag,
  CircleHelp,
  MessageSquareWarning,
} from "lucide-react";
import { HeaderLeftSection } from "./Navbar";

// Mapping icon names to Lucide React components
const iconComponents = {
  Home,
  Video,
  TvMinimal,
  UserRound,
  History,
  Clock4,
  Flame,
  Music,
  Gamepad2,
  Trophy,
  TvMinimalPlay,
  ListMusic,
  Tv,
  Settings,
  Flag,
  CircleHelp,
  MessageSquareWarning,
};

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <aside
      className={`${
        isSidebarOpen
          ? "max-md:left-0 w-[280px] px-3"
          : "max-md:left-[-100%] w-0 px-0"
      } max-md:absolute max-md:h-screen max-md:top-0 bg-white overflow-hidden z-30 dark:bg-neutral-900 max-md:transition-all max-md:duration-200`}
    >
      {/* Header section for mobile */}
      <div className="md:hidden pb-5 pt-2 px-1 sticky top-0 bg-white dark:bg-neutral-900">
        <HeaderLeftSection toggleSidebar={toggleSidebar} />
      </div>

      <div className="overflow-y-auto h-[calc(100vh-70px)] custom_scrollbar pb-6">
        {/* Mapping through sidebarLinks to render categories and links */}
        {sidebarLinks.map((category, catIndex) => (
          <div key={catIndex}>
            {/* Render category title if exists */}
            {category.categoryTitle && (
              <h4 className="text-[15px] font-semibold mb-2 ml-2 mt-4 dark:text-neutral-300">
                {category.categoryTitle}
              </h4>
            )}

            {/* Mapping through links within each category */}
            {category.links.map((link, index) => {
              const IconComponent = iconComponents[link.icon];
              return (
                <React.Fragment key={`${catIndex}-${index}`}>
                  <Link link={link} IconComponent={IconComponent} />

                  {/* Render divider line if not last link in category */}
                  {index === category.links.length - 1 &&
                    catIndex !== sidebarLinks.length - 1 && (
                      <div className="h-[1px] my-2.5 bg-neutral-200 dark:bg-neutral-700"></div>
                    )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};

// Link component within the sidebar
export const Link = ({ link, IconComponent }) => {
  return (
    <a
      href={link.url}
      className={`flex text-[15px] items-center py-2.5 px-3 rounded-lg hover:bg-neutral-200 mb-1 whitespace-nowrap dark:text-neutral-300 dark:hover:bg-neutral-500`}
    >
      {IconComponent && <IconComponent className="mr-2.5 h-5 w-5" />}
      {link.title}
    </a>
  );
};

export default Sidebar;
