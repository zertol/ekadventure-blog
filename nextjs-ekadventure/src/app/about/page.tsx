import App from "@/components/App";
import About from "@/components/Pages/About";
import { fetchLatestPosts } from "@/api/controllers/posts";
import { fetchAboutDetails } from "@/api/controllers/about";
import { Metadata } from "next";
import { fetchAllPages } from "@/api/controllers/pages";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await fetchAllPages();

  const page = pages.Result?.find((page) => page.slug === "about");

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

export default async function AboutPage() {
  const [posts, about] = await Promise.all([
    fetchLatestPosts(),
    fetchAboutDetails(),
  ]);

  return (
    <App currentPage="about">
      <About latestPosts={posts.Result ?? []} about={about.Result} />
    </App>
  );
}
