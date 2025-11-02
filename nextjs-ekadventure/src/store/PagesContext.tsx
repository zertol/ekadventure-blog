"use client";

import { createContext, useContext } from "react";

export const PagesContext = createContext<PagesContextType>({
  pages: [],
  error: null
});

interface PagesContextProviderProps {
  children: React.ReactNode,
  pagesProps: PagesContextType
}

const PagesContextProvider = ({ children, pagesProps }: PagesContextProviderProps) => {
  return (
    <PagesContext.Provider value={pagesProps}>{children}</PagesContext.Provider>
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
