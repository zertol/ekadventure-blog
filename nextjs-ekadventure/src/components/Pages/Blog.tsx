"use client";

import React, { useRef, useState } from "react";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import CategoryFilter from "@/components/UI/Categories/CategoryFilter/page";
import PostArticles from "@/components/UI/Blog/PostArticle/PostArticles";
import HorizontalAd from "../Ads/HorizontalAd";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";

interface BlogProps {
  posts: PostType[];
  categories: CategoryType[];
}

const Blog: React.FC<BlogProps> = ({ posts, categories }) => {
  const adRef = useRef<HTMLModElement>(null!);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };

  const filteredPosts = selectedCategory
    ? posts?.filter((post) =>
        post.categories?.some((cat) => cat.slug === selectedCategory)
      ) || []
    : posts || [];

  return (
    <div>
      <HeaderImage
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

      <div className="w-full flex justify-center">
        <div className="w-[768px]">
          <ClientAdWrapper
            headerText="Sponsored Content By Google"
            className="mt-3"
            isCollapsible={false}
          >
            <HorizontalAd adSlot="5553437940" ref={adRef} />
          </ClientAdWrapper>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 my-c-60">
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
              isActive={selectedCategory === category.slug}
              onClick={() => handleCategoryClick(category.slug)}
            />
          ))}
        </div>

        <PostArticles posts={filteredPosts} />
      </div>
    </div>
  );
};

export default Blog;
