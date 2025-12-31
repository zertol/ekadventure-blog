"use client";

import React, { useState } from "react";
import PostArticle from "./page";
import YouTubeVideo from "./page";

const YouTubeVideos: React.FC<YouTubePlaylistType> = (ytPlaylist) => {
  const [visiblePosts, setVisiblePosts] = useState(3);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 items-start">
        {ytPlaylist.items.slice(0, visiblePosts).map((video: YouTubePlayListItems) => (
          <YouTubeVideo key={video.snippet.resourceId.videoId} {...video.snippet} />
        ))}
      </div>

      {visiblePosts < ytPlaylist.items.length && (
        <div className="text-center">
          <button onClick={handleLoadMore} className="primary-button px-6 py-2">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default YouTubeVideos;
