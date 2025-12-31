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

type YouTubePlayListItems = {
    snippet: YouTubeItemSnippet;
    status: {
        privacyStatus: string;
    }
}

export type YouTubePlaylistItemsResponse = {
    nextPageToken: string;
    items: YouTubePlayListItems[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}