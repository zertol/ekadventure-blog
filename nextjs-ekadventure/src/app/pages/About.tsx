"use client";

import React, { useEffect, useState } from "react";
import AboutBrief from "../components/About/AboutBrief";
import AboutImage from "../components/About/AboutImage";
import AccordionItems from "../components/About/AccordionItems";
import LatestArticles from "../components/LatestArticle/LatestArticles";
import { client } from "../sanity/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { usePages } from "../store/PagesContext";

interface AccordionItem {
  question: string;
  answer: string;
}

const About: React.FC = () => {
  const [pageContent, setPageContent] = useState<{
    content?: string;
  }>({});
  const [latestPosts, setLatestPosts] = useState<SanityDocument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { pages } = usePages();

  // Find the About page data from PagesContext
  const aboutPage = pages.find((page) => page.slug === "about");

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

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [page, posts] = await Promise.all([
          client.fetch(`*[_type == "page" && title == "About"][0]{
            "content": content[0].children[0].text
          }`),
          client.fetch(`*[_type == "post"] | order(date desc)[0...3]{
            _id,
            "publishedAt": date,
            title,
            slug,
            "imageUrl": featuredMedia.asset->url,
            "categories": *[_type == "category" && _id in ^.categories[]._ref]{
              name,
              "slug": slug.current
            }
          }`),
        ]);

        // Parse the content from Sanity
        setPageContent(page);
        setLatestPosts(posts);
      } catch (err) {
        setError("Failed to load content. Please try again later.");
      }
    };

    fetchContent();
  }, []);

  if (!pageContent.content || !aboutPage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-page px-c-25 lg:px-[60px]">
      <section className="mt-28 mb-c-90">
        <div className="container max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <AboutBrief />
          <AboutImage
            imageUrl={aboutPage.imageUrl || "/images/adventure-header.jpg"}
          />
        </div>
      </section>

      <section className="container max-w-[1280px] mx-auto mb-6">
        <h1 className="font-ps text-[42px] font-semibold">
          Hey there! I'm Elie
        </h1>
      </section>
      {/* New Content Section */}
      <section className="container max-w-[1280px] mx-auto mb-c-90">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Sanity Content */}

          <div
            className="about-content max-w-none leading-relaxed pl-2"
            dangerouslySetInnerHTML={{
              __html: pageContent.content || "",
            }}
          />

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
            {/* Latest Posts */}
            <LatestArticles posts={latestPosts} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
