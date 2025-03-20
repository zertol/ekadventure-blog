import React from 'react';
import HeaderImage from '../components/HeaderImage/page';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <HeaderImage 
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.jpg"
        text={
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About EkAdventure</h1>
            <p className="text-xl md:text-2xl mb-2">
              Learn about our team and <span className="font-semibold">our passion</span> for travel
            </p>
          </div>
        }
      />
      
      <section className="mb-10">
        <h2 className="mb-4">Our Story</h2>
        <div className="max-w-3xl">
          <p className="mb-4">
            EkAdventure was founded in 2020 by a group of passionate travelers who wanted to share their 
            experiences and inspire others to explore the world. What started as a small personal blog 
            has grown into a community of adventure enthusiasts.
          </p>
          <p>
            Our mission is to provide authentic travel stories, practical advice, and stunning photography 
            that captures the essence of each destination we visit.
          </p>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">[Photo]</span>
            </div>
            <h3 className="text-center mb-2">Jane Doe</h3>
            <p className="text-gray-600 text-center mb-3">Founder & Lead Writer</p>
            <p>
              Jane has visited over 30 countries and specializes in adventure travel and 
              off-the-beaten-path destinations.
            </p>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">[Photo]</span>
            </div>
            <h3 className="text-center mb-2">John Smith</h3>
            <p className="text-gray-600 text-center mb-3">Photographer & Content Creator</p>
            <p>
              John is our resident photographer with a keen eye for capturing the beauty 
              of landscapes and cultural moments.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Contact Us</h2>
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg max-w-2xl">
          <p className="mb-4">
            Have questions or want to collaborate? We'd love to hear from you!
          </p>
          <div className="flex items-center gap-2">
            <span>Email us at:</span>
            <a 
              href="mailto:info@ekadventure.com" 
              className="text-blue-600 hover:underline transition-colors"
            >
              info@ekadventure.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
