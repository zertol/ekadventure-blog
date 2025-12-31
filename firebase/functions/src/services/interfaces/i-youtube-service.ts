import { YouTubePlaylistType } from "../../types/domain/youtube-playlist-type";
import { YouTubePlaylistParamsType } from "../../types/domain/youtube-playlist-params-type";

export interface IYouTubeService {
    getLatestVideos(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistType>;
}