"use client";

import { createContext, useEffect, useState } from "react";
import { client } from "../sanity/client";
import { SanityDocument } from "next-sanity";
import { useLoader } from "./LoaderContext";

type CategoryContextType = {
  categories: any[];
  setCategories: (categories: any[]) => void;
  error: string | null;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  setCategories: () => {},
  error: null,
});

const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setIsLoading } = useLoader();
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await client.fetch<
          SanityDocument[]
        >(`*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(name asc) {
          _id,
          name,
          slug,
          "imageUrl": featuredMedia.asset->url,
          "postCount": count(*[_type == "post" && references(^._id)])
      }`);
        setCategories(categories);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
      } finally {
      }
    };

    fetchCategories();
  }, []);

  const value: CategoryContextType = { categories, setCategories, error };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
