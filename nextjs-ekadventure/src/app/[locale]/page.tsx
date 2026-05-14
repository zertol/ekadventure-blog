import { fetchAllCategories } from "@/api/controllers/categories";
import { getLatestProducts as getLatestProducts } from "@/api/controllers/ecommerce";
import { fetchAllPages } from "@/api/controllers/pages";
import { fetchLatestPosts } from "@/api/controllers/posts";
import { getLatestYouTubeVideos } from "@/api/controllers/youtube";
import App from "@/components/App";
import Home from "@/components/Pages/Home";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const localParams = await params;

  const pages = await fetchAllPages(localParams);

  const page = pages.Result?.find((page) => page.slug === "home");

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

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;

  const tHome = await getTranslations("Home");

  return (
    <App
      currentPage="home"
      headerImage={{
        text: {
          firstPart: tHome("homeHeaderCaptionFirstPart"),
          secondPart: tHome("homeHeaderCaptionSecondPart"),
        }
      }}
    >
      <Home
        categories={fetchAllCategories(localParams)}
        latestPosts={fetchLatestPosts(localParams)}
        videos={getLatestYouTubeVideos()}
        products={getLatestProducts()}
      />
    </App>
  );
}
