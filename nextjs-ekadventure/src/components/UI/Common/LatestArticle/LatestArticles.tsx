import React from "react";
import LatestArticle from "./LatestArticle";
import { formatDate } from "@/utils/data/helpers";
import { useLocale } from "next-intl";

interface LatestArticlesProps {
  posts: PostType[];
  isLinkOnly?: boolean;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({
  posts,
  isLinkOnly = false,
}) => {
  const locale = useLocale();
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <LatestArticle
          key={post._id}
          title={post.title}
          date={formatDate(post.publishedAt, locale)}
          categories={post.categories}
          slug={post.slug.current}
          featuredMedia={post.featuredMedia}
          isLinkOnly={isLinkOnly}
        />
      ))}
    </div>
  );
};

export default LatestArticles;
