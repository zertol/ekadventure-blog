"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SocialIcons from "../SocialIcons/page";
import { usePages } from "@/store/PagesContext";

interface HeaderImageProps {
  text: ReactNode;
  backgroundImage?: ImageType;
  roundedImage?: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
  text,
  backgroundImage,
  roundedImage = "/images/profile-avatar.webp",
}) => {
  const pathname = usePathname();
  const { pages } = usePages();

  // Get current page slug from pathname (remove leading slash)
  const currentSlug = pathname === "/" ? "home" : pathname.slice(1);

  // Find the current page data
  const currentPage = pages.find((page) => page.slug === currentSlug);

  // Use the page's imageUrl or fall back to the provided backgroundImage or default
  const headerImage =
    currentPage?.featuredMedia.url || backgroundImage?.url || "/images/adventure-header.jpg";

  return (
    <div
      className="relative h-[600px] w-full"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 100%), url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 flex-center-col justify-end pb-10">
        {/* Text container */}
        <div className="text-center text-white mb-[10px] max-w-3xl px-4">
          {text}
        </div>

        {/* Rounded image */}
        <div
          className="w-20 h-20 rounded-full mb-c-30 shadow-lg"
          style={{
            backgroundImage: `url(${roundedImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Social media links */}
        <div>
          <SocialIcons className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default HeaderImage;
