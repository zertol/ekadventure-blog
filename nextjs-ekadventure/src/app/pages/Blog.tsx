'use client';

import React, { useState, useContext, useEffect, useMemo } from 'react';
import { CategoryContext } from '../store/CategoryContext';
import { useLoader } from '../store/LoaderContext';
import CategoryFilter from '../components/CategoryFilter/page';
import PostArticle from '../components/PostArticle/page';
import { client } from '../sanity/client';
import { SanityDocument } from 'next-sanity';
import HeaderImage from '../components/HeaderImage/page';

const POSTS_PER_PAGE = 3;

interface Category {
  name: string;
  slug: string;
}

interface Post extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  imageUrl: string;
  categories: Category[];
}

const Blog: React.FC = () => {
  const { categories } = useContext(CategoryContext);
  const { setIsLoading } = useLoader();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(POSTS_PER_PAGE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          publishedAt,
          excerpt,
          "imageUrl": mainImage.asset->url,
          "categories": categories[]-> {
            name,
            "slug": slug.current
          }
        }`;

        const result = await client.fetch<Post[]>(query);
        setPosts(result);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPosts();
  }, [setIsLoading]);

  const filteredPosts = useMemo(() => {
    return selectedCategory
      ? posts.filter(post =>
          post.categories?.some(category => category.slug === selectedCategory)
        )
      : posts;
  }, [selectedCategory, posts]);

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setVisiblePosts(POSTS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return <div className="text-center py-8">{error}</div>;
  }

  return (
    <div>
      <HeaderImage 
        backgroundImage="/images/blog-header.jpg"
        text={
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl md:text-2xl">Discover our latest adventures and stories</p>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-12">
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

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.slice(0, visiblePosts).map((post: Post) => (
            <PostArticle
              key={post._id}
              title={post.title}
              date={formatDate(post.publishedAt)}
              categories={post.categories || []}
              slug={post.slug.current}
              imageUrl={post.imageUrl || '/images/default-post.jpg'}
              excerpt={post.excerpt}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < filteredPosts.length && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="bg-[#6C8AB5] text-white px-8 py-3 rounded-md hover:bg-[#5A7494] transition-all duration-300 transform hover:-translate-y-1"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
