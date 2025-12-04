import React from "react";
import { SanityDocument } from "next-sanity";
import LatestArticle from "./LatestArticle";
import { PostType } from "@/types/post-type";

interface LatestArticlesProps {
  posts: PostType[];
  isLinkOnly?: boolean;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({
  posts,
  isLinkOnly = false,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <LatestArticle
          key={post._id}
          title={post.title}
          date={formatDate(post.publishedAt)}
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
