import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage({ error }) {
  const navigate = useNavigate();

  // Handle reload by navigating to the home page or any other page
  const handleReload = () => {
    // You can navigate to the home page or any specific page
    navigate("/");
  };

  // Handle go back
  const handleGoBack = () => {
    navigate(-1); // This will take the user to the previous page in the history stack
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 space-y-6">
        <div className="flex justify-center items-center mb-4">
          <svg
            className="w-16 h-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
            ></path>
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Oops! Something went wrong.
        </h2>
        <p className="text-lg text-center text-gray-600">{error}</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Reload
          </button>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
