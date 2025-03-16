import React from 'react';
import App from '../components/App';
import Blog from '../pages/Blog';

export default function BlogPage() {
  return (
    <App currentPage="blog">
      <Blog />
    </App>
  );
} 