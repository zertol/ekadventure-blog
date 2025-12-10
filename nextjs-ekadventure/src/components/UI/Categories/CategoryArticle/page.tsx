'use client';

import React from "react";
import Link from "next/link";

interface CategoryArticleProps {
  title: string;
  slug: string;
  featuredMedia: ImageType;
}

const CategoryArticle: React.FC<CategoryArticleProps> = ({
  title,
  slug,
  featuredMedia,
}) => {
  return (
    <Link href={`/category/${slug}`}>
      <article className="relative h-[450px] overflow-hidden group cursor-pointer shadow-md rounded-md">
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 w-full h-full transition-transform duration-700  ease-in-out group-hover:scale-110">
          <img
            src={featuredMedia?.url || "/images/adventure-header.jpg"}
            alt={featuredMedia?.alt || title}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300" />

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white z-10">
          <h3 className="font-bold text-center relative">
            {title}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default CategoryArticle;
