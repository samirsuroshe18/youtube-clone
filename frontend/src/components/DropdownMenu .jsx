import React, { useState } from "react";

const DropdownMenu = () => {
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle item click
  const handleItemClick = (action) => {
    console.log(`${action} clicked`);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left z-500">
      {/* The icon that will trigger the dropdown */}
      <button
        onClick={toggleDropdown}
        type="button"
        className="text-white bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg z-500">
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
    </div>
  );
};

export default DropdownMenu;
