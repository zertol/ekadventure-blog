"use client";
import React, { useEffect, useRef, useState } from "react";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import Image from "next/image";
import PrimaryButton from "@/components/UI/Common/PrimaryButton/page";
import HorizontalAd from "../Ads/HorizontalAd";
import { HeroText } from "../UI/Home/HeroText/page";
import { CategoryArticles } from "../UI/Categories/CategoryArticle/CategoryArticles";
import PostArticles from "../UI/Blog/PostArticle/PostArticles";

interface HomeProps {
  categories: CategoryType[];
  latestPosts: PostType[];
}

const Home: React.FC<HomeProps> = ({ categories, latestPosts }) => {
  const [adVisible, setAdVisible] = useState({ isVisible: false, height: 0 });
  const adRef = useRef<HTMLModElement>(null!);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    setAdVisible({ isVisible: true, height: ad.offsetHeight });
  }, [adRef.current?.offsetHeight]);

  return (
    <div className="home-page">
      <HeaderImage
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              Where Every Day Is An{" "}
              <span className="font-ps text-[28px]">Adventure</span>
            </h2>
          </div>
        }
      />
      <section className={`mt-c-60 mb-c-90`}>
        <HeroText />
      </section>

      <div className="w-full flex justify-center">
        <div className="w-[768px]">
          <HorizontalAd adSlot="9510559826" ref={adRef} />
        </div>
      </div>

      <section className={`mb-c-90 ${adVisible.isVisible ? "mt-c-60" : ""}`}>
        <div className="mx-auto container-px-25 md:container-px-60 container-max-w-1280">
          <div className="mb-6 flex-center-col relative">
            <h2 className="font-bold text-center mb-4 uppercase">
              Latest Adventures
            </h2>
            <span className="block w-24 h-1 bg-black"></span>
            <div className="flex-center-col absolute right-0 top-0">
              <PrimaryButton
                href="/blog"
                text="View All"
                className="py-1 px-4 font-semibold text-[14px]"
              />
            </div>
          </div>
          <PostArticles posts={latestPosts} />
        </div>
      </section>

      <section className={`mb-c-90`}>
        <div className="mx-auto container-px-25 md:container-px-60 container-max-w-1280">
          <div className="mb-6 flex-center-col relative">
            <h2 className="font-bold text-center mb-4 uppercase">
              Latest Videos
            </h2>
            <span className="block w-24 h-1 bg-black"></span>
            <div className="flex-center-col absolute right-0 top-0">
              <PrimaryButton
                href="/blog"
                text="View All"
                className="py-1 px-4 font-semibold text-[14px]"
              />
            </div>
          </div>
          <PostArticles posts={latestPosts} />
        </div>
      </section>

      <section className={`mb-c-90`}>
        <div className="mx-auto container-px-25 md:container-px-60 container-max-w-1280">
          <div className="mb-12 flex-center-col">
            <h2 className="font-bold text-center mb-4 uppercase">
              Featured Topics
            </h2>
            <span className="block w-24 h-1 bg-black"></span>
          </div>
          <CategoryArticles categories={categories} />
        </div>
      </section>

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
            Want to build a Blog like this?
          </h1>
          <PrimaryButton
            text="Start sharing your experience"
            href="/contact"
            className="px-[24px] py-[12px] text-[16px]"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
