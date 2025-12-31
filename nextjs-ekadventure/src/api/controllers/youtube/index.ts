import { handleApiRequest } from "@/utils/api/handle-api-request";
import { YouTubeParams } from "lightgallery/plugins/video/lg-video-utils";

export const getLatestYouTubeVideos = async (): Promise<ApiResult<YouTubePlaylistType>> => {
    return await handleApiRequest<YouTubePlaylistType>("https://getlatestyoutubevideos-zsszt3mtmq-uc.a.run.app");
}

export const getAllYouTubeVideos = async (): Promise<ApiResult<YouTubePlaylistType>> => {
    return await handleApiRequest<YouTubePlaylistType>("https://getallyoutubevideos-zsszt3mtmq-uc.a.run.app");
}

export const getYouTubeVideoById = async (
    params: Record<string, any>,
): Promise<ApiResult<YouTubePlaylistType>> => {
    return await handleApiRequest<YouTubePlaylistType>("https://getyoutubevideobyid-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params),
    });
}

export const getYouTubeVideosByRoute = async (params?: YouTubeParams): Promise<ApiResult<YouTubePlaylistType>> => {
    return await handleApiRequest<YouTubePlaylistType>("/api/youtube", {
        method: "POST",
        body: JSON.stringify(params),
    });
}