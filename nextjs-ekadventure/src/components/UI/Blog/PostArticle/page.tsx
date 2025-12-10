"use-client";

import React from "react";
import Link from "next/link";
import PostCategories from "@/components/UI/Categories/PostCategory/PostCategories";
import { PortableText } from "next-sanity";

interface PostArticleProps {
  title: string;
  date: string;
  categories: CategoryType[];
  slug: string;
  featuredMedia: ImageType;
  excerpt?: any;
}

const PostArticle: React.FC<PostArticleProps> = ({
  title,
  date,
  categories,
  slug,
  featuredMedia,
  excerpt,
}) => {
  return (
    <article className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Link href={`/${slug}`}>
          <img
            src={featuredMedia?.url}
            alt={featuredMedia?.alt || "Post Featured Image"}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-bold mb-1">{title}</h3>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex-1 flex flex-row flex-wrap">
            <span className="text-[12px] mr-1 text-gray-500 whitespace-nowrap">
              {date}
            </span>
            <span className="text-[12px] mr-1 text-gray-500 whitespace-nowrap">
              /
            </span>
            <span className="text-[12px] text-gray-500 whitespace-nowrap">
              No Comments
            </span>
          </div>
          <div className="gap-2">
            <PostCategories categories={categories} />
          </div>
        </div>

        {excerpt && (
          <PortableText
            value={excerpt}
            components={{
              block: {
                normal: ({ children }: any) => {
                  return <p className="text-sm mb-3 leading-5">{children}</p>;
                },
              },
            }}
          />
        )}

        <div className="mt-auto pt-4 justify-end flex">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center font-semibold text-background-blue-accent hover:underline hover:text-background-green-accent"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostArticle;
