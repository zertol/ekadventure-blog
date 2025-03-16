import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <section className="mb-10">
        <h1 className="mb-4">Welcome to EkAdventure Blog</h1>
        <p className="mb-6 max-w-3xl">
          This is the home page of our adventure blog where we share our experiences, 
          travel tips, and exciting stories from around the world.
        </p>
        
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">[Featured Image Placeholder]</p>
          </div>
        </div>
      </section>

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
  );
};

export default Home; 