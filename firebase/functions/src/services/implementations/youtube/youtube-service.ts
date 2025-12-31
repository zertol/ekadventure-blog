import { YouTubePlaylistType } from "../../../types/domain/youtube-playlist-type";
import { YouTubePlaylistParamsType } from "../../../types/domain/youtube-playlist-params-type";
import { IYouTubeService } from "../../interfaces/i-youtube-service";

export class YouTubeService implements IYouTubeService {
    private channelId: string = "UOdgQ-R9q50rOmIDTVU8b_A";
    private playlistId: string = "UULFOdgQ-R9q50rOmIDTVU8b_A";
    private ytApiKey: string = process.env.YOUTUBE_API_KEY;

    async getLatestYouTubeVideos(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistType> {
        const pageTokenParam: string = params.pageToken ? `&pageToken=${params.pageToken}` : "";
        const maxResults: string = params.maxResults ? `&maxResults=${params.maxResults}` : "&maxResults=3";

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.playlistId}&key=
        ${this.ytApiKey}&channelId=${this.channelId}&part=snippet,contentDetails,status&order=date${maxResults}${pageTokenParam}`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = (await response.json());
            throw new Error(`YouTube fetch error: ${JSON.stringify(errorData.error)}`);
        }

        const data = await response.json() as YouTubePlaylistType;

        return data;
    }

    async getAllYouTubeVideos(): Promise<YouTubePlaylistType> {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.playlistId}&key=
        ${this.ytApiKey}&channelId=${this.channelId}&part=snippet,contentDetails,status&order=date`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = (await response.json());
            throw new Error(`YouTube fetch error: ${JSON.stringify(errorData.error)}`);
        }

        const data = await response.json() as YouTubePlaylistType;

        return data;
    }

    async getYouTubeVideoById(params: YouTubePlaylistParamsType): Promise<YouTubePlaylistType> {
        const videoId: string = params.videoId ? `&videoId=${params.videoId}` : "";

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.playlistId}&key=
        ${this.ytApiKey}&channelId=${this.channelId}&part=snippet,contentDetails,status&order=date${videoId}`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = (await response.json());
            throw new Error(`YouTube fetch error: ${JSON.stringify(errorData.error)}`);
        }

        const data = await response.json() as YouTubePlaylistType;

        return data;
    }
}