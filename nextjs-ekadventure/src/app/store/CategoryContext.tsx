"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { SanityDocument } from "next-sanity";
import { client } from "../sanity/client";
import { usePages } from "./PagesContext";

interface CategoryContextType {
  categories: SanityDocument[];
  setCategories: (categories: SanityDocument[]) => void;
  error: Error | null;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategories must be used within a CategoryContextProvider"
    );
  }
  return context;
};

export const CategoryContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [categories, setCategoriesState] = useState<SanityDocument[]>([]);

  const [error, setError] = useState<Error | null>(null);
  const { registerComponent, markReady } = usePages();

  const setCategories = useCallback((newCategories: SanityDocument[]) => {
    setCategoriesState(newCategories);
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      registerComponent();
      const query = `*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(name asc) {
          _id,
          name,
          slug,
          "imageUrl": featuredMedia.asset->url,
          "postCount": count(*[_type == "post" && references(^._id)])
      }`;
      const result = await client.fetch(query);
      setCategories(result);
      markReady();
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch categories")
      );
    }
  }, [setCategories, registerComponent, markReady]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const value = useMemo(
    () => ({
      categories,
      setCategories,
      error,
    }),
    [categories, setCategories, error]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
