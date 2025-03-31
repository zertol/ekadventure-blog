'use client';

import React, { useState, useContext, useEffect } from 'react';
import { CategoryContext } from '../store/CategoryContext';
import { useLoader } from '../store/LoaderContext';
import CategoryFilter from '../components/CategoryFilter/page';
import PostArticles from '../components/PostArticle/PostArticles';
import { client } from '../sanity/client';
import { SanityDocument } from 'next-sanity';
import HeaderImage from '../components/HeaderImage/page';

interface Category {
  name: string;
  slug: string;
}

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
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

const Blog: React.FC = () => {
  const { categories } = useContext(CategoryContext);
  const { setIsLoading } = useLoader();
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await client.fetch(POSTS_QUERY);
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [setIsLoading]);

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };

  const filteredPosts = selectedCategory
    ? posts.filter(post => 
        post.categories?.some((cat: Category) => cat.slug === selectedCategory)
      )
    : posts;

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

        {/* Posts Grid with Load More */}
        <PostArticles posts={filteredPosts} />
      </div>
    </div>
  );
};

export default Blog;
