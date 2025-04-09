"use client";

import React, { useState, useContext, useEffect } from "react";
import { useCategories } from "../store/CategoryContext";
import CategoryFilter from "../components/CategoryFilter/page";
import PostArticles from "../components/PostArticle/PostArticles";
import { client } from "../sanity/client";
import { SanityDocument } from "next-sanity";
import HeaderImage from "../components/HeaderImage/page";

interface Category {
  name: string;
  slug: string;
}

const POSTS_QUERY = `*[_type == "post"] | order(date desc) {
  _id,
  title,
  slug,
  "publishedAt": date,
  excerpt,
  "imageUrl": featuredMedia.asset->url,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    name,
    "slug": slug.current
  }
}`;

const Blog: React.FC = () => {
  const { categories } = useCategories();
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await client.fetch(POSTS_QUERY);
        setPosts(fetchedPosts);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };

  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories?.some((cat: Category) => cat.slug === selectedCategory)
      )
    : posts;

  if (error) {
    return <div className="text-center py-8">{error}</div>;
  }

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
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <CategoryFilter
            name="ALL POSTS"
            isActive={selectedCategory === null}
            onClick={() => handleCategoryClick(null)}
          />
          {categories.map((category) => (
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
