import React from "react";
import { SanityDocument } from "next-sanity";
import LatestArticle from "./LatestArticle";

interface LatestArticlesProps {
  posts: SanityDocument[];
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ posts }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex-center-col">
      <h3 className="font-bold font-ps bg-background-green-accent text-white px-16 py-2 mb-7">
        My Latest Adventures
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <LatestArticle
            key={post._id}
            title={post.title}
            date={formatDate(post.publishedAt)}
            categories={post.categories}
            slug={post.slug.current}
            imageUrl={post.imageUrl}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
