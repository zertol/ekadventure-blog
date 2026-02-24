import App from "@/components/App";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getAllYouTubeVideos,
  getYouTubeVideoById,
} from "@/api/controllers/youtube";
import DOMPurify from "isomorphic-dompurify";
import { formatStringToHtml } from "@/utils/data/helpers";

export async function generateMetadata({
  params,
}: {
  params: { videoId: string };
}): Promise<Metadata> {
  const { videoId } = await params;
  const videoResult = await getYouTubeVideoById({
    videoId: videoId,
  });
  const video = videoResult.Result;

  if (!video || !video.items || video.items?.length === 0) {
    return {};
  }

  const metaData: Metadata = {
    title: video.items[0].snippet.title,
    description: video.items[0].snippet.description,
    openGraph: {
      title: video.items[0].snippet.title,
      description: video.items[0].snippet.description,
      videos: [
        `https://youtube.com/watch?v=${video.items[0].snippet.resourceId.videoId}`,
      ],
    },
  };

  return metaData;
}

export async function generateStaticParams() {
  const videos = await getAllYouTubeVideos();

  if (!videos.Result || !videos.Result.items) {
    return [];
  }

  return (
    videos.Result &&
    videos.Result.items.map((video: PlayListItem) => ({
      videoId: video.snippet.resourceId.videoId,
    }))
  );
}

export default async function VideoPage({
  params,
}: {
  params: { videoId: string };
}) {
  const { videoId } = await params;

  let videoResult;
  try {
    [videoResult] = await Promise.all([
      getYouTubeVideoById({
        videoId: videoId,
      }),
    ]);
  } catch (error) {
    console.error("Error fetching video:", error);
    return notFound();
  }

  if (!videoResult.Result || videoResult.Result.items?.length === 0) {
    return notFound();
  }

  const video = videoResult.Result;

  return (
    <App currentPage="video">
      {video && (
        <div className="container px-c-25 xl:px-0 xl:max-w-[768px] mt-28 mb-c-90 mx-auto">
          <div className="mt-c-60 w-full text-center">
            <h2 className="font-bold mb-4">
              <img
                className="inline-block w-6 h-6 mr-2"
                alt="🎥"
                src="https://s.w.org/images/core/emoji/15.0.3/svg/1f3a5.svg"
              />
              {video.items[0].snippet.title}
            </h2>

            <iframe
              src={`https://www.youtube.com/embed/${video.items[0].snippet.resourceId.videoId}`}
              title="Detailed Video of the Adventure"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[375px] box-shadow-post-detail-image mb-4"
            ></iframe>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                formatStringToHtml(video.items[0].snippet.description)
              ),
            }}
          ></div>
        </div>
      )}
    </App>
  );
}
