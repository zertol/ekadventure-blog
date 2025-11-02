import React from 'react';
import App from '@/components/App';
import Blog from '@/components/Pages/Blog';
import { fetchAllPosts } from '@/api/controllers/posts';
import { fetchAllCategories } from '@/api/controllers/categories';

export default async function BlogPage() {
   const [posts, categories] = await Promise.all([
      fetchAllPosts(),
      fetchAllCategories()
    ]);

  return (
    posts.Result &&
    <App currentPage="blog">
      <Blog posts={posts.Result} categories={categories.Result ?? []} />
    </App>
  );
}