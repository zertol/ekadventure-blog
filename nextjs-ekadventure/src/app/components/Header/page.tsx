import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-2xl md:text-3xl font-bold hover:text-gray-300 transition-colors">
          EkAdventure Blog
        </Link>
        <nav>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-300 transition-colors">About</Link></li>
            <li><Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 