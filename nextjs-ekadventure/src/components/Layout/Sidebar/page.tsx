import React from "react";
import Image from "next/image";
import { PostType } from "@/types/post-type";
import PrimaryButton from "@/components/UI/Common/PrimaryButton/page";
import SocialIcons from "@/components/UI/Common/SocialIcons/page";
import LatestArticles from "@/components/UI/Common/LatestArticle/LatestArticles";

interface SideBarProps {
  sideImage: string;
  relatedPosts: PostType[];
}

const Sidebar: React.FC<SideBarProps> = ({ sideImage, relatedPosts }) => {
  return (
    <aside className="w-full bg-transparent">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="font-ps text-[32px] text-center font-bold mb-4">
          Hey there!
        </h1>
        <div className="relative w-full mb-4 flex-center-row">
          <Image
            src={sideImage}
            alt="Adventure portrait"
            height={500}
            width={500}
            className="box-shadow-quote"
            priority
          />
        </div>
        <p className="text-gray-700 mb-6">
          I&apos;m Elie, and a big part of what I love about the mountains is
          the peace I find even in all types of territories, and the adrenaline
          of every challenging climb, distance and various difficulties.
        </p>
        <p className="text-gray-700 mb-6">
          I created <span className="font-bold">EKADVENTURE</span> as a way to
          pursue my dreams, and to hopefully inspire you through my experiences,
          by sharing what I love to do the most.
        </p>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-2 justify-center">
          <PrimaryButton
            href="/about"
            text="Read More"
            className="font-ps py-0 font-bold text-[16px]"
          />
          <PrimaryButton
            href="/contact"
            text="Work with me"
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
        <div className="flex-center-col">
          <div className="text-center bg-background-green-accent mb-4">
            <div className="py-2 px-6">
              <h3 className="featured-adventure-title">Featured adventures</h3>
            </div>
          </div>

          {relatedPosts && <LatestArticles posts={relatedPosts} isLinkOnly />}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
