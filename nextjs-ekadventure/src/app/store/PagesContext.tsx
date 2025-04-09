"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type PageType = {
  imageUrl: string;
  slug: string;
  title: string;
  order: number;
};

type PagesContextType = {
  pages: PageType[];
  error: string | null;
  registerComponent: () => void;
  markReady: () => void;
  isLoading: boolean;
  setReadyComponents: (count: number) => void;
  setExpectedCount: (count: number) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const PagesContext = createContext<PagesContextType>({
  pages: [],
  error: null,
  registerComponent: () => {},
  markReady: () => {},
  isLoading: false,
  setReadyComponents: () => {},
  setExpectedCount: () => {},
  setIsLoading: () => {},
});

interface PagesContextProviderProps {
  children: React.ReactNode;
  initialPages: PageType[];
}

const PagesContextProvider = ({
  children,
  initialPages,
}: PagesContextProviderProps) => {
  const [readyComponents, setReadyComponents] = useState(0);
  const [expectedCount, setExpectedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const registerComponent = useCallback(() => {
    console.log("Component registered");
    setExpectedCount((count) => count + 1);
  }, []);

  const markReady = useCallback(() => {
    console.log("Component marked as ready");
    setReadyComponents((count) => count + 1);
  }, []);

  // Update loading state based on component readiness
  useEffect(() => {
    setIsLoading(true);
    if (readyComponents === expectedCount && expectedCount > 0) {
      setIsLoading(false);
    }
  }, [readyComponents, expectedCount]);

  // Reset on route change

  const value: PagesContextType = {
    pages: initialPages,
    error: null,
    registerComponent,
    markReady,
    isLoading,
    setReadyComponents,
    setExpectedCount,
    setIsLoading,
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
