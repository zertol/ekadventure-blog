import React, { useState, useEffect } from 'react';
import HeaderImage from '../components/HeaderImage/page';
import CategoryArticle from '../components/CategoryArticle/page';
import { type SanityDocument } from 'next-sanity';
import { client } from '../sanity/client';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES_QUERY = `*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(name asc) {
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

const Home: React.FC = () => {
  const [categories, setCategories] = useState<SanityDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // ... existing fetch calls ...

        // Add categories fetch
        const categoriesResult = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY);
        setCategories(categoriesResult);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <HeaderImage 
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.jpg"
        text={
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EkAdventure Blog</h1>
            <p className="text-xl md:text-2xl mb-2">
              Explore the world with us - one <span className="font-semibold">adventure</span> at a time
            </p>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-12">
        <section className="mb-10">
          <h2 className="mb-6">Explore Our Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="mb-3">Latest Adventures</h3>
              <p>Check out our most recent travel stories and experiences.</p>
              <div className="mt-4">
                <a href="/blog" className="inline-block text-blue-600 hover:underline">
                  View adventures →
                </a>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="mb-3">Travel Tips</h3>
              <p>Discover useful advice and recommendations for your next journey.</p>
              <div className="mt-4">
                <a href="/blog" className="inline-block text-blue-600 hover:underline">
                  Read tips →
                </a>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="mb-3">Photo Gallery</h3>
              <p>Browse through our collection of stunning photographs from our travels.</p>
              <div className="mt-4">
                <a href="/blog" className="inline-block text-blue-600 hover:underline">
                  View gallery →
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="mb-6">Subscribe to Our Newsletter</h2>
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
            <p className="mb-4">Stay updated with our latest adventures and travel tips.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
        </div>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {categories.map((category) => (
                <div key={category._id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <CategoryArticle
                    title={category.name}
                    slug={category.slug.current}
                    imageUrl={category.imageUrl || '/images/default-category.jpg'}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Build a Blog Section */}
        <section className="relative h-[400px] flex items-center justify-center mb-6">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/adventure-header.jpg"
              alt="Mountain landscape"
              fill
              className="object-cover brightness-75"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center text-white">
            <h2 className="text-4xl font-bold mb-6 italic">Want to build a Blog like this?</h2>
            <Link 
              href="/contact"
              className="inline-block bg-[#6C8AB5] text-white px-8 py-3 rounded-md hover:bg-[#5A7494] transition-all duration-300 transform hover:-translate-y-1"
            >
              Start sharing your experience
            </Link>
          </div>
        </section>
      
    </div>
  );
};

export default Home; 