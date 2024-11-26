import React from 'react'
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    const handleShare = () => {
      alert("Share button clicked!");
      // Add share functionality here
    };
  
    const handleWatchLater = () => {
      alert("Added to Watch Later!");
      // Add Watch Later functionality here
    };
  
    return (
      <div className="relative bg-zinc-900 rounded-lg shadow-md p-4 ml-19 w-full sm:w-96 lg:w-80 mx-auto">
        {/* Video Player */}
        <div className="rounded-lg overflow-hidden">
          <ReactPlayer
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" // Replace with your video URL
            width="100%"
            height="200px"
            controls={true}
          />
        </div>
  
        
  
        {/* Video Details */}
        <div className="mt-3 text-white">
          <h3 className="font-semibold text-base line-clamp-2">
            Video Title Goes Here
          </h3>
          <p className="text-sm text-gray-400 mt-1">Channel Name</p>
          <p className="text-sm text-gray-400 mt-1">1.2M views • 2 days ago</p>
        </div>
      </div>
    );
  };

export default VideoPlayer;