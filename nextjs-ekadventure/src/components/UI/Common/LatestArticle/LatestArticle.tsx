import React from "react";
import {Link} from "@/i18n/navigation";
import PrimaryButton from "../PrimaryButton/page";
 
interface LatestArticleProps {
  title: string;
  slug: string;
  featuredMedia?: ImageType;
  date: string;
  categories: CategoryType[];
  isLinkOnly?: boolean;
}

const LatestArticle: React.FC<LatestArticleProps> = ({
  title,
  date,
  categories,
  slug,
  featuredMedia,
  isLinkOnly = false,
}) => {
  return isLinkOnly ? (
    <Link
      href={`/${slug}` as any}
      className="inline-flex items-center font-bold text-background-blue-accent underline hover:text-background-green-accent"
    >
      {title}
    </Link>
  ) : (
    <article className="overflow-hidden mb-6">
      {/* Image Container */}
      <div className="flex-start-row space-x-3">
        <div
          className="w-[35%] h-28"
          style={{
            backgroundImage: `url(${featuredMedia?.url || "/images/adventure-header.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex-start-col text-wrap mb-2 w-[65%]">
          <Link href={`/${slug}` as any}>
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
              <PrimaryButton
                key={`${category.slug}-${index}`}
                text={category.name}
                href={`/category/${category.slug}`}
                className={`text-[12px]  ${
                  index < categories.length - 1 ? "mr-2" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-1">
        <div className="flex justify-end">
          <Link
            href={`/${slug}` as any}
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
