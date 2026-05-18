"use client";
import React, { ReactNode, useEffect, useRef } from "react";

// Import page components
import Header from "./Layout/Header/page";
import Footer from "./Layout/Footer/page";
import CookieConsent from "./UI/Common/CookieConsent/page";
import HeaderImage, { HeaderImageProps } from "./UI/Common/HeaderImage/page";

interface AppProps {
  currentPage?: string;
  children?: ReactNode;
  headerImage?: HeaderImageProps;
}

const App: React.FC<AppProps> = ({ currentPage = "home", headerImage, children }) => {

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {headerImage && <HeaderImage {...headerImage} /> }
      <main className="flex-grow flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default App;
