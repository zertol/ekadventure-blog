"use client";

import React, { createContext, useContext } from "react";
import { usePages } from "./PagesContext";
import LoadingSpinner from "../components/LoadingSpinner/page";

interface LoadingContextType {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading } = usePages();

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export default LoadingProvider;
