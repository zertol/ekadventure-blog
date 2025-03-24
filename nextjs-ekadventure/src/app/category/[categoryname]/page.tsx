import React from 'react';
import { client } from '../../sanity/client';
import { type SanityDocument } from 'next-sanity';
import Link from 'next/link';
import App from '../../components/App';
import HeaderImage from '../../components/HeaderImage/page';

// Query to get posts by category
const CATEGORY_POSTS_QUERY = `*[
  _type == "post" && 
  references(*[_type == "category" && slug.current == $categoryname]._id)
]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "category": *[_type == "category" && _id in ^.categories[]._ref][0]{
    name,
    slug
  }
}`;

// Query to get category details
const CATEGORY_QUERY = `*[_type == "category" && slug.current == $categoryname][0]`;

export default async function CategoryPage({
  params,
}: {
  params: { categoryname: string };
}) {
  const category = await client.fetch<SanityDocument>(CATEGORY_QUERY, params);
  const posts = await client.fetch<SanityDocument[]>(CATEGORY_POSTS_QUERY, params);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article 
                key={post._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.mainImage && (
                  <div className="h-48 bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      [Post Image]
                    </div>
                  </div>
                )}
                <div className="p-4 md:p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link 
                      href={`/${post.slug.current}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time 
                    dateTime={post.publishedAt} 
                    className="text-gray-600 text-sm block mb-3"
                  >
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                  {post.excerpt && (
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  )}
                  <Link 
                    href={`/${post.slug.current}`}
                    className="inline-block text-blue-600 hover:underline transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        )}
      </div>
    </App>
  );
} 