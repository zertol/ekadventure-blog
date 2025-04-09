"use client";
import React, { ReactNode } from "react";

// Import page components
import Home from "../pages/Home";
import Header from "./Header/page";
import Footer from "./Footer/page";
import CategoryContextProvider from "../store/CategoryContext";
interface AppProps {
  currentPage?: string;
  children?: ReactNode;
}

const App: React.FC<AppProps> = ({ currentPage = "home", children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {currentPage === "home" && !children && <Home />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default App;
