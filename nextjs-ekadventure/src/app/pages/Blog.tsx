import React, { useState, useEffect } from 'react';
import { client } from '../sanity/client';
import { type SanityDocument } from 'next-sanity';
import Link from 'next/link';
import HeaderImage from '../components/HeaderImage/page';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const POSTS_QUERY = `*[
          _type == "post"
          && defined(slug.current)
        ]|order(publishedAt desc){_id, title, slug, publishedAt, excerpt, mainImage}`;
        
        const options = { next: { revalidate: 30 } };
        const result = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
        
        setPosts(result);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <HeaderImage 
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.jpg"
        text={
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl md:text-2xl mb-2">
              Discover our latest <span className="font-semibold">adventures</span> and travel tales
            </p>
          </div>
        }
      />
      
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article 
              key={post._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.mainImage && (
                <div className="h-48 bg-gray-200">
                  {/* Image would be rendered here with Sanity's image URL builder */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    [Post Image]
                  </div>
                </div>
              )}
              <div className="p-4 md:p-6">
                <h2 className="mb-2">
                  <Link 
                    href={`/${post.slug.current}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time 
                  dateTime={post.publishedAt} 
                  className="text-gray-600 block mb-3"
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
        
        {posts.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No blog posts found.</p>
          </div>
        )}
      </section>
      
      <section>
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
          <h2 className="mb-4">Looking for something specific?</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="search" 
              placeholder="Search blog posts..." 
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="button" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
