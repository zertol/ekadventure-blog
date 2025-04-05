"use client";

import React, { useState, useEffect, use } from "react";
import { client } from "../../sanity/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import App from "../../components/App";
import HeaderImage from "../../components/HeaderImage/page";
import PostArticles from "../../components/PostArticle/PostArticles";
import { useLoader } from "../../store/LoaderContext";
import { useParams } from "next/navigation";

// Query to get posts by category
const CATEGORY_POSTS_QUERY = `*[
  _type == "post" && 
  references(*[_type == "category" && slug.current == $categoryname]._id)
] | order(publishedAt desc) {
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

// Query to get category details
const CATEGORY_QUERY = `*[_type == "category" && slug.current == $categoryname][0]`;

const CategoryPage = () => {
  // Use the useParams hook from next/navigation instead
  const params = useParams();
  const categoryname = params.categoryname as string;

  const { setIsLoading } = useLoader();
  const [category, setCategory] = useState<SanityDocument | null>(null);
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        const [categoryData, postsData] = await Promise.all([
          client.fetch<SanityDocument>(CATEGORY_QUERY, {
            categoryname: categoryname,
          }),
          client.fetch<SanityDocument[]>(CATEGORY_POSTS_QUERY, {
            categoryname: categoryname,
          }),
        ]);

        setCategory(categoryData);
        setPosts(postsData || []);
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError("Failed to load category data. Please try again later.");
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    if (categoryname) {
      fetchCategoryData();
    }
  }, [categoryname, setIsLoading]);

  if (!isLoaded) {
    return null; // Let the Loader component handle the loading state
  }

  if (error) {
    return (
      <App currentPage="category">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </App>
    );
  }

  if (!category) {
    return (
      <App currentPage="category">
        <div className="container mx-auto px-4 py-56 flex-center-col h-full">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link
            href="/blog"
            className="text-white bg-background-blue-accent rounded-sm hover:bg-background-green-accent px-3 py-2"
          >
            ← Back to blog
          </Link>
        </div>
      </App>
    );
  }

  return (
    <App currentPage="category">
      <HeaderImage
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.jpg"
        text={
          <div>
            <h2 className="font-bold italic">
              Where Every Day Is An{" "}
              <span className="font-ps text-[28px]">Adventure</span>
            </h2>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-white text-[12px] bg-background-blue-accent rounded-full hover:bg-background-green-accent px-3 py-2"
          >
            ← Back to Blog
          </Link>
        </div>

        <div className="mb-8 flex-center-col">
          <h2 className="font-bold text-center mb-4 uppercase">
            {category.name}
          </h2>
          <span className="block w-24 h-1 bg-black"></span>
        </div>

        {posts.length > 0 ? (
          <PostArticles posts={posts} />
        ) : (
          <div className="text-center py-12 ">
            <h1 className="text-text-dark mb-2">
              No posts found in this category!
            </h1>
            <Link
              href="/blog"
              className="text-white bg-background-blue-accent rounded-sm hover:bg-background-green-accent px-3 py-2"
            >
              ← Back to blog
            </Link>
          </div>
        )}
      </div>
    </App>
  );
};

export default CategoryPage;
