"use client";

import React, { useRef } from "react";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import HorizontalAd from "../Ads/HorizontalAd";
import YouTubeVideos from "../UI/YouTube/YouTubeVideo/YouTubeVideos";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";
import { useTranslations } from "next-intl";

interface VideosProps {
  ytPlaylist: YouTubePlaylistType;
}

const Videos: React.FC<VideosProps> = ({ ytPlaylist }) => {
  const tVideos = useTranslations("Videos");

  return (
    <div>
      <HeaderImage
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              {tVideos("videosHeaderCaptionFirstPart")}
              <br />
              <span className="font-ps text-[28px]">{tVideos("videosHeaderCaptionSecondPart")}</span>
            </h2>
          </div>
        }
      />

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
