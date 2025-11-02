import React from "react";
import App from "@/components/App";
import About from "@/components/Pages/About";
import { fetchLatestPosts } from "@/api/controllers/posts";
import { fetchAboutDetails } from "@/api/controllers/about";

export default async function AboutPage() {
   const [posts, about] = await Promise.all([
        fetchLatestPosts(),
        fetchAboutDetails()
      ]);

  return (
    <App currentPage="about">
      <About latestPosts={posts.Result ??  []} about={about.Result} />
    </App>
  );
}