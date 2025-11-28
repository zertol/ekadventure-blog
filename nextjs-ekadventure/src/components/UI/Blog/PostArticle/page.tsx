'use-client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import PostCategories from "@/components/UI/Categories/PostCategory/PostCategories";
import { PortableText } from "next-sanity";
import { generateBlockComponents } from "@/components/Data/BlockComponents";
interface Category {
  name: string;
  slug: string;
}

interface PostArticleProps {
  title: string;
  date: string;
  categories: Category[];
  slug: string;
  imageUrl: string;
  excerpt?: any;
}

const PostArticle: React.FC<PostArticleProps> = ({
  title,
  date,
  categories,
  slug,
  imageUrl,
  excerpt,
}) => {
  return (
    <article className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Title */}
        <Link href={`/${slug}`}>
          <h3 className="font-bold mb-1 hover:text-gray-500 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Categories and Date */}
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

        {/* Excerpt */}
        {excerpt && (
          <PortableText value={excerpt} components={{
            block: {
              normal: ({ children }: any) => {
                return <p className="text-sm mb-3 leading-5">{children}</p>;
            }
          }
          }}/>
        )}

        {/* Read More Link */}
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
