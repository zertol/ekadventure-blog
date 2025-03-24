import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryArticleProps {
  title: string;
  slug: string;
  imageUrl: string;
}

const CategoryArticle: React.FC<CategoryArticleProps> = ({ title, slug, imageUrl }) => {
  return (
    <Link href={`/category/${slug}`}>
      <article className="relative h-[450px] overflow-hidden group cursor-pointer">
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
        
        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white z-10">
          <h3 className="text-3xl font-bold text-center px-4 relative">
            <span className="relative inline-block">
              {title}
              {/* group-hover applies styles when hovering over any parent element with the 'group' class */}
              {/* In this case, when hovering the article (which has group class), the span's width animates from 0 to full */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default CategoryArticle; 