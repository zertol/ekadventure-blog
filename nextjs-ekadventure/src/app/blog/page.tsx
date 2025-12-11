import App from "@/components/App";
import Blog from "@/components/Pages/Blog";
import { fetchAllPosts } from "@/api/controllers/posts";
import { fetchAllCategories } from "@/api/controllers/categories";
import { fetchAllPages } from "@/api/controllers/pages";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await fetchAllPages();

  const page = pages.Result?.find((page) => page.slug === "blog");

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

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    fetchAllPosts(),
    fetchAllCategories(),
  ]);

  return (
    posts.Result && (
      <App currentPage="blog">
        <Blog posts={posts.Result} categories={categories.Result ?? []} />
      </App>
    )
  );
}
