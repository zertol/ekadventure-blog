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
  const initializedRef = useRef(false);

  // useEffect(() => {
  //   if (initializedRef.current) return;

  //   try {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //     initializedRef.current = true;
  //     console.log("AdSense initialized");
  //   } catch (e) {
  //     console.error("Adsbygoogle push error:", e);
  //   }
  // }, []);

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
