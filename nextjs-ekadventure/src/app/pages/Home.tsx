import React from 'react';
import HeaderImage from '../components/HeaderImage/page';

const Home: React.FC = () => {
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