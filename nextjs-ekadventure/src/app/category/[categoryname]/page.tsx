import React from 'react';
import { client } from '../../sanity/client';
import { type SanityDocument } from 'next-sanity';
import Link from 'next/link';
import App from '../../components/App';
import HeaderImage from '../../components/HeaderImage/page';
import PostArticles from '../../components/PostArticle/PostArticles';

// Query to get posts by category
const CATEGORY_POSTS_QUERY = `*[
  _type == "post" && 
  references(*[_type == "category" && slug.current == $categoryname]._id)
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  "imageUrl": mainImage.asset->url,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    name,
    "slug": slug.current
  }
}`;

// Query to get category details
const CATEGORY_QUERY = `*[_type == "category" && slug.current == $categoryname][0]`;

async function getCategory(categoryname: string) {
  return await client.fetch<SanityDocument>(CATEGORY_QUERY, { categoryname });
}

async function getCategoryPosts(categoryname: string) {
  return await client.fetch<SanityDocument[]>(CATEGORY_POSTS_QUERY, { categoryname });
}

export default async function CategoryPage({
  params,
}: {
  params: { categoryname: string };
}) {
  const [category, posts] = await Promise.all([
    getCategory(params.categoryname),
    getCategoryPosts(params.categoryname)
  ]);

  if (!category) {
    return (
      <App currentPage="category">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl md:text-2xl mb-2">
              Explore our posts about <span className="font-semibold">{category.name}</span>
            </p>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to all posts
          </Link>
        </div>

        {posts.length > 0 ? (
          <PostArticles posts={posts} />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        )}
      </div>
    </App>
  );
} 