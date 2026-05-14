"use client";

import React from "react";
import HorizontalAd from "../Ads/Google/HorizontalAd";
import YouTubeVideos from "../UI/YouTube/YouTubeVideo/YouTubeVideos";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";

interface VideosProps {
  ytPlaylist: YouTubePlaylistType;
}

const Videos: React.FC<VideosProps> = ({ ytPlaylist }) => {

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-[768px]">
          <ClientAdWrapper
            headerText="Google"
            className="mt-3"
            isCollapsible={false}
          >
            <HorizontalAd adSlot="5553437940" />
          </ClientAdWrapper>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 my-c-60">
        <YouTubeVideos ytPlaylist={ytPlaylist} showLoadMore={true} />
      </div>
    </div>
  );
};

export default Videos;
