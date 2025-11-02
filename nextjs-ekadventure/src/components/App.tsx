"use client";
import React, { ReactNode } from "react";

// Import page components
import Header from "./Layout/Header/page";
import Footer from "./Layout/Footer/page";
interface AppProps {
  currentPage?: string;
  children?: ReactNode;
}

const App: React.FC<AppProps> = ({ currentPage = "home", children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default App;
