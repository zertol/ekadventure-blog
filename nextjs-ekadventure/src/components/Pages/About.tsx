"use client";

import React from "react";
import AboutBrief from "@/components/UI/About/AboutBrief";
import AboutImage from "@/components/UI/About/AboutImage";
import AccordionItems from "@/components/UI/About/AccordionItems";
import LatestArticles from "@/components/UI/Common/LatestArticle/LatestArticles";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { generateBlockComponents } from "@/components/Data/BlockComponents";
import { usePages } from "@/store/PagesContext";
import { AboutType } from "@/types/about-type";
import { PageType } from "@/types/page-type";
import { useTranslations } from "next-intl";

interface AboutProps {
  about: AboutType | null;
  latestPosts: PostType[];
}

interface AccordionItem {
  question: string;
  answer: string;
}

const About: React.FC<AboutProps> = ({ about, latestPosts }) => {
  const { pages } = usePages();
  const aboutPage: PageType | null =
    pages.find((page: PageType) => page.slug === "about") ?? null;

  const tAbout = useTranslations("About");
  const tCommon = useTranslations("Common");

  const accordionItems: AccordionItem[] = tAbout.raw("accordionItems") as AccordionItem[];

  return (
    <div className="about-page px-c-25 lg:px-[60px]">
      <section className="mt-28 mb-c-90">
        <div className="container max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <AboutBrief />
          <AboutImage featuredMedia={aboutPage?.featuredMedia} quote={tAbout("aboutBriefQuote")} />
        </div>
      </section>

      <section className="container max-w-[1280px] mx-auto mb-6">
        <h1 className="font-ps text-[42px] font-semibold">
          {tAbout("helloTitle")}
        </h1>
      </section>
      {/* New Content Section */}
      <section className="container max-w-[1280px] mx-auto mb-c-90">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Sanity Content */}
          <div className="about-content max-w-none leading-relaxed pl-2">
            <PortableText
              value={about?.content || []}
              components={generateBlockComponents()}
            />
          </div>

          {/* Right Column */}
          <div className="p-0 lg:pl-[100px] lg:pr-[50px]">
            {/* Profile Image */}
            <div className="space-y-2 mb-c-90">
              <div className="relative flex-center-col w-full">
                <Image
                  src="/images/profile-avatar.webp"
                  alt="Profile"
                  className="object-cover rounded-full"
                  height={100}
                  width={100}
                />
                <h3 className="font-bold font-ps text-[22px]">
                  {tAbout("accordionTitle")}
                </h3>
              </div>

              {/* Accordion */}
              <AccordionItems items={accordionItems} />
            </div>
            <div className="flex-center-col">
              <div className="text-center bg-background-green-accent mb-4">
                <div className="py-2 px-6">
                  <h3 className="featured-adventure-title">
                    {tCommon("featuredAdventuresTitle")}
                  </h3>
                </div>
              </div>
              {/* Latest Posts */}
              <LatestArticles posts={latestPosts} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
