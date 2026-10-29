import { fetchAllCategories } from "@/api/controllers/categories";
import { getLatestProducts as getLatestProducts } from "@/api/controllers/ecommerce";
import { fetchPageBySlug } from "@/api/controllers/pages";
import { fetchLatestPosts } from "@/api/controllers/posts";
import { getLatestYouTubeVideos } from "@/api/controllers/youtube";
import App from "@/components/App";
import Home from "@/components/Pages/Home";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 86400; // Revalidate every 24 hours

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "home"});

  const metaData: Metadata = {
    title: page.Result?.title,
    description: page.Result?.metadata?.description,
    openGraph: {
      title: page.Result?.title,
      description: page.Result?.metadata?.description,
      images: page.Result?.metadata ? [page.Result?.metadata?.ogImage?.url] : [],
    },
  };

  return metaData;
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;

  const tHome = await getTranslations("Home");

  return (
    <App
      currentPage="home">
      <Home
        categories={fetchAllCategories(localParams)}
        latestPosts={fetchLatestPosts(localParams)}
        videos={getLatestYouTubeVideos()}
        products={getLatestProducts()}
        page={fetchPageBySlug({locale: localParams.locale, slug: "home"})}
      />
    </App>
  );
}
