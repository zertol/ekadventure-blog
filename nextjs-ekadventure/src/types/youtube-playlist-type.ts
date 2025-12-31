type ItemSnippet = {
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

type PlayListItem = {
    snippet: ItemSnippet;
    status: {
        privacyStatus: string;
    }
}

type YouTubePlaylistType = {
    nextPageToken: string;
    items: PlayListItem[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}