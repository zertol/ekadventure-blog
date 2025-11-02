"use client";

import React, { useState } from "react";
import { PostType } from "@/types/post-type";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import CategoryFilter from "@/components/UI/Categories/CategoryFilter/page";
import PostArticles from "@/components/UI/Blog/PostArticle/PostArticles";
import { SanityDocument } from "next-sanity";

interface BlogProps {
  posts: PostType[];
  categories: SanityDocument[];
}

const Blog: React.FC<BlogProps> = ({ posts, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };

  const filteredPosts = selectedCategory
    ? posts?.filter((post) =>
        post.categories?.some((cat) => cat.slug === selectedCategory)
      ) || []
    : posts || [];

  // if (error) {
  //   return <div className="text-center py-8">{error.message}</div>;
  // }

  return (
    <div>
      <HeaderImage
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              Where Adventures Belong
              <br />
              <span className="font-ps text-[28px]">Welcome!</span>
            </h2>
          </div>
        }
      />

      <div className="container mx-auto px-4 my-c-60">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-5 mb-12 justify-center">
          <CategoryFilter
            name="ALL POSTS"
            isActive={selectedCategory === null}
            onClick={() => handleCategoryClick(null)}
          />
          {categories?.map((category) => (
            <CategoryFilter
              key={category._id}
              name={category.name.toUpperCase()}
              isActive={selectedCategory === category.slug.current}
              onClick={() => handleCategoryClick(category.slug.current)}
            />
          ))}
        </div>

        {/* Posts Grid with Load More */}
        <PostArticles posts={filteredPosts} />
      </div>
    </div>
  );
};

export default Blog;
