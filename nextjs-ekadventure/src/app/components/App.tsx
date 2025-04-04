"use client";

import React, { ReactNode } from 'react';

// Import page components
import Home from '../pages/Home';
import Header from './Header/page';
import Footer from './Footer/page';
import CategoryContextProvider from '../store/CategoryContext';
interface AppProps {
  currentPage?: string;
  children?: ReactNode;
}

const App: React.FC<AppProps> = ({ currentPage = 'home', children }) => {
  // The HeaderImage is included within each page component
  // So we don't need to render it here.
  // The post detail page is the only exception that doesn't use the HeaderImage

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <CategoryContextProvider>
        <main className="flex-grow">
          {/* Content will be rendered by Next.js routing */}
          {currentPage === 'home' && !children && <Home />}
          {children}
        </main>
      </CategoryContextProvider>
      
      <Footer />
    </div>
  );
};

export default App; 