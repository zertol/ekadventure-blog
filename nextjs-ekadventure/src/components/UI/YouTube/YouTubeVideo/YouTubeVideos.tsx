"use client";

import React, { useState } from "react";
import YouTubeVideo from "./page";
import { getYouTubeVideosByRoute } from "@/api/controllers/youtube";
import { YouTubePlaylistParamsType } from "@/types/youtube-playlist-params-type";
import { useTranslations } from "next-intl";

interface YouTubeVideosProps {
  ytPlaylist: YouTubePlaylistType;
  showLoadMore?: boolean;
  maxResults?: number;
}

const YouTubeVideos: React.FC<YouTubeVideosProps> = ({
  ytPlaylist,
  showLoadMore,
  maxResults,
}) => {
  const [visibleVideos, setVisibleVideos] = useState(ytPlaylist.items);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(ytPlaylist.nextPageToken);

  const tUI = useTranslations("UI");

  const handleLoadMoreVideos = async () => {
    setIsLoading(true);
    try {
      const params: YouTubePlaylistParamsType = {
        pageToken: nextPageToken,
        maxResults: maxResults,
      };
      const response = await getYouTubeVideosByRoute(params);
      setNextPageToken(response.Result?.nextPageToken || "");
      setVisibleVideos((prev) => {
        return [...prev, ...(response.Result?.items || [])];
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12 items-start">
        {visibleVideos
          .slice(0, visibleVideos.length)
          .map((video: PlayListItem) => (
            <YouTubeVideo
              key={video.snippet.resourceId.videoId}
              {...video.snippet}
            />
          ))}
      </div>

      {visibleVideos.length < ytPlaylist.pageInfo.totalResults &&
        showLoadMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMoreVideos}
              disabled={isLoading}
              className="relative primary-button px-6 py-2"
            >
              {tUI("loadMore")}
              {isLoading && (
                <div className="absolute flex items-center justify-center inset-0">
                  <div className="w-6 h-6 border-4 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>
        )}
    </>
  );
};

export default YouTubeVideos;
