"use client";

import React, { useRef } from "react";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import HorizontalAd from "../Ads/HorizontalAd";
import YouTubeVideos from "../UI/YouTube/YouTubeVideo/YouTubeVideos";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";

interface VideosProps {
  ytPlaylist: YouTubePlaylistType;
}

const Videos: React.FC<VideosProps> = ({ ytPlaylist }) => {
  const adRef = useRef<HTMLModElement>(null!);

  return (
    <div>
      <HeaderImage
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              Where Adventures Come Alive
              <br />
              <span className="font-ps text-[28px]">Welcome!</span>
            </h2>
          </div>
        }
      />

      <div className="w-full flex justify-center">
        <div className="w-[768px]">
          <ClientAdWrapper
            headerText="Google"
            className="mt-3"
            isCollapsible={false}
          >
            <HorizontalAd adSlot="5553437940" ref={adRef} />
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
