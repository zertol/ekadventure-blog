import React, { ReactNode } from 'react';

// Import page components
import Home from '../pages/Home';
import Header from './Header/page';
import Footer from './Footer/page';

interface AppProps {
  currentPage?: string;
  children?: ReactNode;
}

const App: React.FC<AppProps> = ({ currentPage = 'home', children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-8 flex-grow">
        {/* Content will be rendered by Next.js routing */}
        {currentPage === 'home' && !children && <Home />}
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default App; 