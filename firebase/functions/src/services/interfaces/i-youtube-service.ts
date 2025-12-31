import { YouTubePlaylistType } from "../../types/domain/youtube-playlist-type";
import { YouTubePlaylistParamsType } from "../../types/domain/youtube-playlist-params-type";

export interface IYouTubeService {
    getLatestYouTubeVideos(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistType>;
    getAllYouTubeVideos(): Promise<YouTubePlaylistType>;
    getYouTubeVideoById(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistType>;
}