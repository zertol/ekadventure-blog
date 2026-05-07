"use client";
import React from "react";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import Image from "next/image";
import PrimaryLink from "@/components/UI/Common/PrimaryLink/page";
import { HeroText } from "../UI/Home/HeroText/page";
import { CategoryArticles } from "../UI/Categories/CategoryArticle/CategoryArticles";
import PostArticles from "../UI/Blog/PostArticle/PostArticles";
import YouTubeVideos from "../UI/YouTube/YouTubeVideo/YouTubeVideos";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";
import { useTranslations } from "next-intl";
import HorizontalAd from "../Ads/Google/HorizontalAd";
import { FeaturedSection } from "../UI/Home/FeaturedSection/page";

interface HomeProps {
  categories: CategoryType[];
  latestPosts: PostType[];
  videos: YouTubePlaylistType | null;
}

const Home: React.FC<HomeProps> = ({ categories, latestPosts, videos }) => {
  const tHome = useTranslations("Home");
  const tUI = useTranslations("UI");
  const tCommon = useTranslations("Common");

  return (
    <div className="home-page">
      <HeaderImage
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              {tHome("homeHeaderCaptionFirstPart")}{" "}
              <span className="font-ps text-[28px]">
                {tHome("homeHeaderCaptionSecondPart")}
              </span>
            </h2>
          </div>
        }
      />
      <section className={`mt-c-30 mb-c-30`}>
        <HeroText />
      </section>

      <div className="flex justify-center">
        <div className="w-full md:w-[768px]">
          <ClientAdWrapper
            headerText="Google"
            isCollapsible={false}
            className="mb-c-30"
          >
            <HorizontalAd adSlot="9510559826" />
          </ClientAdWrapper>
        </div>
      </div>

      <FeaturedSection
        title={tCommon("featuredAdventuresTitle")}
        canViewAll={{ page: { url: "/blog" }, text: tUI("viewAll") }}
      >
        <PostArticles posts={latestPosts} />
      </FeaturedSection>

      <FeaturedSection
        title={tCommon("featuredVideosTitle")}
        canViewAll={{ page: { url: "/videos" }, text: tUI("viewAll") }}
        className="mb-c-30"
      >
        {videos && videos.items.length > 0 && (
          <YouTubeVideos ytPlaylist={videos} />
        )}
      </FeaturedSection>

      <div className="flex justify-center">
        <div className="w-full md:w-[768px]">
          <ClientAdWrapper
            headerText="Google"
            isCollapsible={false}
            className="mb-c-30"
          >
            <HorizontalAd adSlot="2079251461" />
          </ClientAdWrapper>
        </div>
      </div>

      <FeaturedSection title={tCommon("featuredTopicsTitle")}>
        <CategoryArticles categories={categories} />
      </FeaturedSection>

      <section className="relative h-[400px] flex-center-row mb-c-60">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/adventure-header.jpg"
            alt="Mountain landscape"
            fill
            className="object-cover brightness-75"
          />
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-[30px] md:text-[40px] font-bold mb-6 italic">
            {tHome("buildABlogLikeThisTitle")}
          </h1>
          <PrimaryLink
            text={tHome("shareYourExperienceButtonText")}
            href="/contact"
            className="px-[24px] py-[12px] text-[16px]"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;