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
    pages.find((page: PageType) => page.slug === "about" || page.slug === "a-propos") ?? null;

  const accordionItems: AccordionItem[] = [
    {
      question: "What is your favorite adventure activity?",
      answer:
        "My favorite outdoor activity is backpacking. I can't even describe how satisfying it is to hike 15-20 Kms a day, set up camp when you arrive, wake up and do it again! ",
    },
    {
      question: "Why the outdoors?",
      answer:
        "Don't get me wrong, there are a lot of times where I need to just stay at home and do absolutely nothing! However, the outdoors always seem to have a way of keeping my energy levels high.",
    },
    {
      question: "What's your biggest accomplishment?",
      answer:
        "In 2020, I was able to hike Mount Hermon Lebanon's second highest peak! 20 km back and forth with an altitude of 2,814 m.",
    },
  ];

  return (
    <div className="about-page px-c-25 lg:px-[60px]">
      <section className="mt-28 mb-c-90">
        <div className="container max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <AboutBrief />
          <AboutImage featuredMedia={aboutPage?.featuredMedia} />
        </div>
      </section>

      <section className="container max-w-[1280px] mx-auto mb-6">
        <h1 className="font-ps text-[42px] font-semibold">
          Hey there! I&apos;m Elie
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
                  Get to know me a bit more
                </h3>
              </div>

              {/* Accordion */}
              <AccordionItems items={accordionItems} />
            </div>
            <div className="flex-center-col">
              <div className="text-center bg-background-green-accent mb-4">
                <div className="py-2 px-6">
                  <h3 className="featured-adventure-title">
                    My Latest Adventures
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
