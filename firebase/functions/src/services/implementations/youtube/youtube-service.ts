import { YouTubePlaylistItemsResponse } from "../../../types/domain/youtube-playlist-items-response";
import { YouTubePlaylistParamsType } from "../../../types/domain/youtube-playlist-params-type";
import { IYouTubeService } from "../../interfaces/i-youtube-service";

export class YouTubeService implements IYouTubeService {
    async getLatestVideos(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistItemsResponse> {
        const channelId: string = "UOdgQ-R9q50rOmIDTVU8b_A";
        const playlistId: string = "UULFOdgQ-R9q50rOmIDTVU8b_A";
        const ytApiKey: string = process.env.YOUTUBE_API_KEY;

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${ytApiKey}&channelId=${channelId}&part=snippet,contentDetails,status&order=date&maxResults=3&pageToken=${params.pageToken}`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = (await response.json());
            throw new Error(`YouTube fetch error: ${JSON.stringify(errorData.error)}`);
        }

        const data = await response.json() as YouTubePlaylistItemsResponse;

        return data;
    }
}