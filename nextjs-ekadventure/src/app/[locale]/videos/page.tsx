import App from "@/components/App";
import { fetchAllPages } from "@/api/controllers/pages";
import { Metadata } from "next";
import { getLatestYouTubeVideos } from "@/api/controllers/youtube";
import Videos from "@/components/Pages/Videos";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await fetchAllPages({});

  const page = pages.Result?.find((page) => page.slug === "videos");

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

export default async function VideosPage() {
  const [videos] = await Promise.all([getLatestYouTubeVideos()]);

  return (
    videos.Result && (
      <App currentPage="videos">
        <Videos ytPlaylist={videos.Result}  />
      </App>
    )
  );
}
