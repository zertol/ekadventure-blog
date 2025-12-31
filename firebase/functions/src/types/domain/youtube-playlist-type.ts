type YouTubeItemSnippet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        standard: {
            url: string;
            width: number;
            height: number;
        };
        maxres: {
            url: string;
            width: number;
            height: number;
        }
    };
    resourceId: {
        videoId: string;
    }
}

type PlayListItems = {
    snippet: YouTubeItemSnippet;
    status: {
        privacyStatus: string;
    }
}

export type YouTubePlaylistType = {
    nextPageToken: string;
    items: PlayListItems[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}