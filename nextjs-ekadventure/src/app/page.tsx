import { fetchAllCategories } from "@/api/controllers/categories";
import { fetchAllPages } from "@/api/controllers/pages";
import { fetchLatestPosts } from "@/api/controllers/posts";
import App from "@/components/App";
import Home from "@/components/Pages/Home";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await fetchAllPages();

  const page = pages.Result?.find((page) => page.slug === "home");

  if (!page) {
    return {};
  }

  const metaData: Metadata = {
    title: page.title,
    description: page.metadata.description,
    openGraph: {
      title: page.title,
      description: page.metadata.description,
      images: page.metadata ? [page.metadata.ogImage?.url] : [],
    },
  };

  return metaData;
}

export default async function HomePage() {
  const [categories, latestPosts] = await Promise.all([fetchAllCategories(), fetchLatestPosts()]);

  return (
    <App currentPage="home">
      <Home categories={categories.Result ?? []} latestPosts={latestPosts.Result ?? []} />
    </App>
  );
}
