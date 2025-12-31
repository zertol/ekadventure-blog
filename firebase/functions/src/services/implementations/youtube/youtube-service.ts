import { YouTubePlaylistType } from "../../../types/domain/youtube-playlist-type";
import { YouTubePlaylistParamsType } from "../../../types/domain/youtube-playlist-params-type";
import { IYouTubeService } from "../../interfaces/i-youtube-service";

export class YouTubeService implements IYouTubeService {
    async getLatestVideos(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistType> {
        const channelId: string = "UOdgQ-R9q50rOmIDTVU8b_A";
        const playlistId: string = "UULFOdgQ-R9q50rOmIDTVU8b_A";
        const ytApiKey: string = process.env.YOUTUBE_API_KEY;

        const pageTokenParam: string = params.pageToken ? `&pageToken=${params.pageToken}` : "";

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${ytApiKey}&channelId=${channelId}&part=snippet,contentDetails,status&order=date&maxResults=3${pageTokenParam}`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = (await response.json());
            throw new Error(`YouTube fetch error: ${JSON.stringify(errorData.error)}`);
        }

        const data = await response.json() as YouTubePlaylistType;

        return data;
    }
}