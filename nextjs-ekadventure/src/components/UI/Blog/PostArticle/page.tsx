"use-client";

import React from "react";
import {Link} from "@/i18n/navigation";
import PostCategories from "@/components/UI/Categories/PostCategory/PostCategories";
import { PortableText } from "next-sanity";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/utils/data/helpers";

const PostArticle: React.FC<PostType> = ({
  title,
  publishedAt: date,
  categories,
  slug: {current: slug},
  featuredMedia,
  excerpt,
  totalComments
}) => {

  const locale = useLocale()

  const tUI = useTranslations("UI");
  const tComments = useTranslations("Comments");

  return (
    <article className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Link href={`/${slug}` as any}>
          <img
            src={featuredMedia?.url}
            alt={featuredMedia?.alt || "Post Featured Image"}
            className="object-cover transition-transform duration-300 hover:scale-105 h-full w-full"
          />
        </Link>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h4 className="font-bold mb-1 leading-5">{title}</h4>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex-1 flex flex-row flex-wrap">
            <span className="text-[12px] mr-1 text-gray-500 whitespace-nowrap capitalize">
              {formatDate(date, locale)}
            </span>
            <span className="text-[12px] mr-1 text-gray-500 whitespace-nowrap">
              /
            </span>
            <span className="text-[12px] text-gray-500 whitespace-nowrap">
              {totalComments == 0 ? tComments("noComments") : totalComments === 1 ? tComments("oneComment") : tComments("nbComments", {0: totalComments}) }
            </span>
          </div>
          <div className="gap-2 flex flex-row flex-wrap">
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
            href={`/${slug}` as any}
            className="inline-flex items-center font-semibold text-background-blue-accent hover:underline hover:text-background-green-accent"
          >
            {tUI("readMore")}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostArticle;
