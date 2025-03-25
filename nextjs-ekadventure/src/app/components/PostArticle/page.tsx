import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  name: string;
  slug: string;
}

interface PostArticleProps {
  title: string;
  date: string;
  categories: Category[];
  slug: string;
  imageUrl: string;
  excerpt?: string;
}

const PostArticle: React.FC<PostArticleProps> = ({
  title,
  date,
  categories,
  slug,
  imageUrl,
  excerpt
}) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories and Date */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex-1 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Link 
                key={`${category.slug}-${index}`}
                href={`/category/${category.slug}`}
                className="text-sm text-[#6C8AB5] hover:underline"
              >
                {category.name}
                {index < categories.length - 1 && <span className="ml-2">•</span>}
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500 whitespace-nowrap">{date}</span>
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-[#6C8AB5] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {excerpt}
          </p>
        )}

        {/* Read More Link */}
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-[#6C8AB5] hover:underline"
        >
          Read More
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default PostArticle; 