"use client";

import React, { useState } from "react";
import PostArticle from "./page";
import { SanityDocument } from "next-sanity";

interface PostArticlesProps {
  posts: SanityDocument[];
  postsPerPage?: number;
}

const PostArticles: React.FC<PostArticlesProps> = ({
  posts,
  postsPerPage = 3,
}) => {
  const [visiblePosts, setVisiblePosts] = useState(postsPerPage);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + postsPerPage);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {posts.slice(0, visiblePosts).map((post: SanityDocument) => (
          <PostArticle
            key={post._id}
            title={post.title}
            date={formatDate(post.publishedAt)}
            categories={post.categories || []}
            slug={post.slug.current}
            imageUrl={post.imageUrl || "/images/profile-avatar.webp"}
            excerpt={post.excerpt}
          />
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-background-blue-accent text-white px-6 py-2 rounded-md hover:bg-background-green-accent transition-all duration-300 shadow-md"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default PostArticles;
