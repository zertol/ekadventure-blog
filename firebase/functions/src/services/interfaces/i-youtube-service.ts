import { YouTubePlaylistItemsResponse } from "../../types/domain/youtube-playlist-items-response";
import { YouTubePlaylistParamsType } from "../../types/domain/youtube-playlist-params-type";

export interface IYouTubeService {
    getLatestVideos(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistItemsResponse>;
}