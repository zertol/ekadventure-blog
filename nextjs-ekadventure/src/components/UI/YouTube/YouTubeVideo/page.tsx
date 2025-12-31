"use-client";

import React from "react";
import Link from "next/link";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const YouTubeVideo: React.FC<ItemSnippet> = (ytPlaylistItem) => {
  return (
    <article className="relative group rounded-lg hover:cursor-pointer transition-shadow duration-300 flex flex-col flex-1">
      <Link href={`/videos/${ytPlaylistItem.resourceId.videoId}`}>
        <div className="absolute -inset-3 rounded-lg bg-background-green-accent/20 opacity-40 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

        <div className="relative aspect-video w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform z-20">
              <svg
                className="w-8 h-8 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <img
            src={ytPlaylistItem.thumbnails.maxres.url}
            alt={`${ytPlaylistItem.title} Thumbnail Image`}
            className="object-cover transition-transform duration-300 group-hover:scale-[101%] h-full w-full rounded-lg"
          />
        </div>

        <div className="mt-3 flex flex-col flex-grow">
          <h4 className="font-bold mb-1 leading-5">{ytPlaylistItem.title}</h4>

          <div className="flex flex-wrap items-center justify-between gap-2 mb-0">
            <div className="flex-1 flex flex-row flex-wrap">
              <span className="text-[12px] mr-1 text-gray-500 whitespace-nowrap">
                {formatDate(ytPlaylistItem.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default YouTubeVideo;
