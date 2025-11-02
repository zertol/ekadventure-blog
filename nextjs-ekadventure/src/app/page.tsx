import React from "react";
import { fetchAllCategories } from "@/api/controllers/categories";
import App from "@/components/App";
import Home from "@/components/Pages/Home";

export default async function HomePage() {
  const [categories] = await Promise.all([fetchAllCategories()]);

  return (
    <App currentPage="home">
      <Home categories={categories.Result ?? []} />
    </App>
  );
}
