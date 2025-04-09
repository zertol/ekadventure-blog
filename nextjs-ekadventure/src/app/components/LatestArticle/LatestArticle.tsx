import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
}

interface LatestArticleProps {
  title: string;
  slug: string;
  imageUrl: string;
  date: string;
  categories: Category[];
  excerpt: string;
}

const LatestArticle: React.FC<LatestArticleProps> = ({
  title,
  date,
  categories,
  slug,
  imageUrl,
  excerpt,
}) => {
  return (
    <article className="overflow-hidden mb-6">
      {/* Image Container */}
      <div className="flex-start-row space-x-3">
        <div
          className="w-[35%] h-28"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex-start-col text-wrap mb-2 w-[65%]">
          <Link href={`/blog/${slug}`}>
            <h4 className="text-[16px] font-bold mb-1 hover:text-gray-500 transition-colors">
              {title}
            </h4>
          </Link>
          <div className="flex-1 flex flex-row flex-wrap">
            <span className="text-[12px] mr-1 text-gray-500 whitespace-nowrap">
              {date}
            </span>
          </div>
          <div className="gap-2">
            {categories.map((category, index) => (
              <Link
                key={`${category.slug}-${index}`}
                href={`/category/${category.slug}`}
                className={`text-[12px] text-white bg-background-blue-accent hover:bg-background-green-accent 
                  rounded-sm px-2 py-1 ${
                    index < categories.length - 1 ? "mr-2" : ""
                  }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-1">
        <div className="flex justify-end">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center font-semibold text-background-blue-accent underline hover:text-background-green-accent"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default LatestArticle;
