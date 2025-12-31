import { handleApiRequest } from "@/utils/api/handle-api-request";

export const getLatestVideos = async (): Promise<ApiResult<YouTubePlaylistType>> => {
    return await handleApiRequest<YouTubePlaylistType>("https://getlatestvideos-zsszt3mtmq-uc.a.run.app");
}