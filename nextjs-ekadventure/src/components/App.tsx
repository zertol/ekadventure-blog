"use client";
import React, { ReactNode, useEffect, useRef } from "react";

// Import page components
import Header from "./Layout/Header/page";
import Footer from "./Layout/Footer/page";
import CookieConsent from "./UI/Common/CookieConsent/page";

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
      <CookieConsent />
    </div>
  );
};

export default App;
