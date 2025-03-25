"use client"
import { createContext, useContext, useState } from "react";

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoader = () => useContext(LoaderContext);

const LoaderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = { isLoading, setIsLoading };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider; 