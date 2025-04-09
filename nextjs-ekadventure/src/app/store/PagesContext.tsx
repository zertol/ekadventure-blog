"use client";

import { createContext, useContext } from "react";
import { SanityDocument } from "next-sanity";

type PageType = {
  imageUrl: string;
  slug: string;
  title: string;
  order: number;
};

type PagesContextType = {
  pages: PageType[];
  error: string | null;
};

export const PagesContext = createContext<PagesContextType>({
  pages: [],
  error: null,
});

interface PagesContextProviderProps {
  children: React.ReactNode;
  initialPages: PageType[];
}

const PagesContextProvider = ({
  children,
  initialPages,
}: PagesContextProviderProps) => {
  const value: PagesContextType = {
    pages: initialPages,
    error: null,
  };

  return (
    <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
  );
};

export const usePages = () => {
  const context = useContext(PagesContext);
  if (context === undefined) {
    throw new Error("usePages must be used within a PagesContextProvider");
  }
  return context;
};

export default PagesContextProvider;
