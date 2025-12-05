"use client";

import React, { useState } from "react";
import PostArticle from "./page";

interface PostArticlesProps {
  posts: PostType[];
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
        {posts.slice(0, visiblePosts).map((post: PostType) => (
          <PostArticle
            key={post._id}
            title={post.title}
            date={formatDate(post.publishedAt)}
            categories={post.categories || []}
            slug={post.slug.current}
            featuredMedia={post.featuredMedia}
            excerpt={post.excerpt}
          />
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="text-center">
          <button onClick={handleLoadMore} className="primary-button px-6 py-2">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default PostArticles;
