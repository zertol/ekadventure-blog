import App from "@/components/App";
import Blog from "@/components/Pages/Blog";
import { fetchAllPosts } from "@/api/controllers/posts";
import { fetchAllCategories } from "@/api/controllers/categories";
import { fetchAllPages } from "@/api/controllers/pages";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const pages = await fetchAllPages(await params);

  const page = pages.Result?.find((page) => page.slug === "blog");

  if (!page) {
    return {};
  }

  const metaData: Metadata = {
    title: page.title,
    description: page.metadata?.description,
    openGraph: {
      title: page.title,
      description: page.metadata?.description,
      images: page.metadata ? [page.metadata?.ogImage?.url] : [],
    },
  };

  return metaData;
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;

  const [posts, categories] = await Promise.all([
    fetchAllPosts(localParams),
    fetchAllCategories(localParams),
  ]);

  return (
    posts.Result && (
      <App currentPage="blog">
        <Blog posts={posts.Result} categories={categories.Result ?? []} />
      </App>
    )
  );
}
