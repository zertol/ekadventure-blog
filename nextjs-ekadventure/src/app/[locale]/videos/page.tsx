import App from "@/components/App";
import { fetchAllPages, fetchPageBySlug } from "@/api/controllers/pages";
import { Metadata } from "next";
import { getLatestYouTubeVideos } from "@/api/controllers/youtube";
import Videos from "@/components/Pages/Videos";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "videos"});

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

export default async function VideosPage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;
  const [videos, page] = await Promise.all([getLatestYouTubeVideos(), fetchPageBySlug({locale: localParams.locale, slug: "videos"})]);

  const tVideos = await getTranslations("Videos");
  
  return (
    videos.Result && (
      <App currentPage="videos">
        <Videos ytPlaylist={videos.Result} page={page.Result} />
      </App>
    )
  );
}
