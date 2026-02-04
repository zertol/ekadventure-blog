import App from "@/components/App";
import About from "@/components/Pages/About";
import { fetchLatestPosts } from "@/api/controllers/posts";
import { fetchAboutDetails } from "@/api/controllers/about";
import { Metadata } from "next";
import { fetchAllPages } from "@/api/controllers/pages";

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const pages = await fetchAllPages(await params);

  const page = pages.Result?.find(
    (page) => page.slug === "about",
  );

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
    alternates: {
      canonical: `/${page.slug}`,
      languages: {
        en: `/${page.slug}`,
        fr: `/fr/a-propos`,
      },
    },
  };

  return metaData;
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;
  
  const [posts, about] = await Promise.all([
    fetchLatestPosts(localParams),
    fetchAboutDetails(localParams),
  ]);

  return (
    <App currentPage="about">
      <About latestPosts={posts.Result ?? []} about={about.Result} />
    </App>
  );
}
