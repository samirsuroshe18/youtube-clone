// import React, { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaMicrophone } from "react-icons/fa";
// import { RiVideoAddLine } from "react-icons/ri";
// import { BsBell } from "react-icons/bs";
// import { FaRegUserCircle } from "react-icons/fa";
// import { uploadFile } from "../api/userApi";

// import Sidebar from "./Sidebar"; // Import the Sidebar component
// import { handleAxiosError } from "../utils/handleAxiosError";

// const Navbar = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [video, setVideo] = useState(null); // Store the selected video
//   const [loading, setLoading] = useState(false); // To show loading state
//   const [videoUrl, setVideoUrl] = useState(null); // To store Cloudinary URL after upload

//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (file && file.type.startsWith("video/")) {
//     setVideo(file);
//   } else {
//     alert("Please select a valid video file");
//   }
// };

// const handleUpload = async () => {
//   if (!video) {
//     alert("Please select a video first");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("video", video); // Append the video file to the form data

//   try {
//     setLoading(true);
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/api/v1/video/upload-video`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data", // Telling Axios we are sending form data
//         },
//         withCredentials: true, // Include credentials (cookies) with the request
//       }
//     );

//     setVideoUrl(response.data.videoUrl);
//     alert("Video uploaded successfully!");
//   } catch (error) {
//     const errorMessage = handleAxiosError(error);
//     setError(errorMessage);
//     alert("Error uploading video");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="flex justify-between items-center px-4 h-14 bg-black opacity-95 sticky top-0 z-50">
//       <div className="flex items-center gap-4">
//         {/* Hamburger Menu */}
//         <button className="text-white text-2xl" onClick={toggleSidebar}>
//           <GiHamburgerMenu />
//         </button>

//         <div className="flex items-center gap-1">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
//             alt="YouTube Logo"
//             className="h-6"
//           />
//           <span className="text-xl text-white font-roboto">YouTube</span>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="flex bg-zinc-900 items-center rounded-3xl"
//         >
//           <input
//             type="text"
//             placeholder="Search"
//             className="bg-transparent border-none text-white w-[300px] px-4 focus:outline-none"
//           />
//           <button className="p-2">
//             <AiOutlineSearch className="text-white text-2xl" />
//           </button>
//         </form>
//         <FaMicrophone
//           onClick={handleUpload}
//           className="text-white text-4xl bg-zinc-900 rounded-3xl hidden p-2 sm:block"
//         />
//       </div>

//       <div className="flex items-center gap-6 mr-8">
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//         <button>
//           <RiVideoAddLine className="text-white text-2xl" />
//         </button>

//         <BsBell className="text-white text-2xl relative" />
//         <FaRegUserCircle className="text-white text-3xl" />
//       </div>

//       {/* Sidebar Component */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//     </div>
//   );
// };

// export default Navbar;

import { Menu, Mic, MoonStar, Search, Sun } from "lucide-react";
import Logo from "../assets/youtube.png";
import UserImg from "../assets/user.jpg";
import { RiVideoAddLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { handleAxiosError } from "../utils/handleAxiosError";
import DropdownMenu from "./DropdownMenu ";
import axios from "axios";

const Navbar = ({ toggleSidebar }) => {
  // Initialize dark mode state based on localStorage value
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
    } else {
      alert("Please select a valid video file");
    }
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video first");
      return;
    }

    const formData = new FormData();
    formData.append("video", video); // Append the video file to the form data

    try {
      // setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/video/upload-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Telling Axios we are sending form data
          },
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );

      alert("Video uploaded successfully!");
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      alert(errorMessage);
    } finally {
      // setLoading(false);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle item click
  const handleItemClick = (action) => {
    console.log(`${action} clicked`);
    setIsOpen(false); // Close dropdown after selection
  };

  // Effect to update body class and localStorage when dark mode state changes
  useEffect(() => {
    document.body.classList[isDarkMode ? "add" : "remove"]("dark");
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Function to toggle dark mode state
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="sticky top-0 z-11 bg-white dark:bg-neutral-900">
      <nav className="flex items-center justify-between py-2 pb-5 px-4">
        {/* Rendering left section of the navbar */}
        <HeaderLeftSection toggleSidebar={toggleSidebar} />

        {/* Search input and mic section */}
        <div className="h-10 flex gap-3 w-[600px] max-lg:w-[500px] max-md:hidden">
          <form action="#" className="flex w-full">
            <input
              className="border border-neutral-300 w-full h-full rounded-l-full px-4 outline-none focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-500 dark:focus:border-blue-500 dark:text-neutral-300"
              type="search"
              placeholder="Search"
              required
            />
            <button className="border border-neutral-300 px-5 border-l-0 rounded-r-full hover:bg-neutral-100 dark:border-neutral-500 hover:dark:bg-neutral-700">
              <Search className="dark:text-neutral-400" />
            </button>
          </form>
          <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700">
            <Mic className="dark:text-neutral-400" />
          </button>
        </div>

        {/* User and dark mode toggle section */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full md:hidden hover:bg-neutral-200 hover:dark:bg-neutral-700">
            <Search className="dark:text-neutral-400" />
          </button>
          <button
            onClick={handleUpload}
            className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
          >
            <RiVideoAddLine className="text-white text-2xl" />
          </button>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          {/* Dropdown Menu */}
          {isOpen && (
            <div className="fixed right-2 top-10 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg z-50000">
              <div
                onClick={() => handleItemClick("Upload video")}
                className="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Upload video
              </div>
              <div
                onClick={() => handleItemClick("Go live")}
                className="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Go live
              </div>
              <div
                onClick={() => handleItemClick("Create post")}
                className="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Create post
              </div>
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
          >
            {isDarkMode ? (
              <Sun className="dark:text-neutral-400" />
            ) : (
              <MoonStar className="dark:text-neutral-400" />
            )}
          </button>
          <img
            className="w-8 h-8 rounded-full cursor-pointer"
            src={UserImg}
            alt="User Image"
          />
        </div>
      </nav>
    </header>
  );
};

// Component for the left section of the navbar
export const HeaderLeftSection = ({ toggleSidebar }) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
      >
        <Menu className="dark:text-neutral-400" />
      </button>
      <a className="flex items-center gap-2" href="#">
        <img src={Logo} width={32} alt="Logo" />
        <h2 className="text-xl font-bold dark:text-neutral-300">YouTube</h2>
      </a>
    </div>
  );
};

export default Navbar;
