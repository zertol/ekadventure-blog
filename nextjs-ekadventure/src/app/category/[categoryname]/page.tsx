"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "../../sanity/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import App from "../../components/App";
import HeaderImage from "../../components/HeaderImage/page";
import PostArticles from "../../components/PostArticle/PostArticles";

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
  const { categoryname } = useParams();
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await client.fetch<SanityDocument[]>(
          `*[_type == "post" && references(*[_type == "category" && slug.current == $categoryname]._id)] | order(_createdAt desc)`,
          { categoryname }
        );
        setPosts(posts);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      }
    };

    fetchPosts();
  }, [categoryname]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <App currentPage="category">
      <HeaderImage
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.webp"
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
            {categoryname}
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
