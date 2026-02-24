"use client";

import React from "react";
import PrimaryLink from "@/components/UI/Common/PrimaryLink/page";
import SocialIcons from "@/components/UI/Common/SocialIcons/page";
import LatestArticles from "@/components/UI/Common/LatestArticle/LatestArticles";
import VerticalAd from "@/components/Ads/VerticalAd";
import { ClientAdWrapper } from "@/components/Ads/ClientAdWrapper";
import { useTranslations } from "next-intl";

interface SideBarProps {
  sideImage: ImageType;
  relatedPosts: PostType[];
}

const Sidebar: React.FC<SideBarProps> = ({ sideImage, relatedPosts }) => {
  const tUI = useTranslations("UI");
  const tSidebar = useTranslations("Sidebar");
  const tCommon = useTranslations("Common");
  
  return (
    <aside className="w-full bg-transparent">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="font-ps text-[32px] text-center font-bold mb-4">
          {tSidebar("aboutMeTitle")}
        </h1>
        <div className="relative w-full mb-4 flex-center-row">
          <img
            src={sideImage.url}
            alt={sideImage.alt || "Adventure portrait"}
            className="box-shadow-quote"
          />
        </div>
        <p className="text-gray-700 mb-6">
          {tSidebar("aboutMeTopText")}
        </p>
        <p className="text-gray-700 mb-6">
          {tSidebar.rich("aboutMeBottomText",{
            brand: (chunks) => <span className="font-bold">{chunks}</span>
          })}
        </p>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-2 justify-center">
          <PrimaryLink
            href="/about"
            text={tUI("readMore")}
            className="font-ps py-0 font-bold text-[16px]"
          />
          <PrimaryLink
            href="/contact"
            text={tUI("workWithMe")}
            className="font-ps py-0 font-bold text-[16px]"
          />
        </div>

        <div className="mb-2 flex-center-row">
          <span className="block w-20 h-[2px] bg-black"></span>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mb-10">
          <SocialIcons className="text-white" isSidebar />
        </div>

        {/* Featured Adventures */}
        <div className="flex-center-col mb-1">
          <div className="text-center bg-background-green-accent mb-4">
            <div className="py-2 px-6">
              <h3 className="featured-adventure-title">{tCommon("featuredAdventuresTitle")}</h3>
            </div>
          </div>

          {relatedPosts && <LatestArticles posts={relatedPosts} isLinkOnly />}
        </div>
        <ClientAdWrapper
          headerText="Google"
          className="mt-10"
          isCollapsible={false}
        >
          <div className="w-full flex justify-center">
            <div className="w-[768px]">
              <VerticalAd adSlot="8013946644" />
            </div>
          </div>
        </ClientAdWrapper>
      </div>
    </aside>
  );
};

export default Sidebar;
