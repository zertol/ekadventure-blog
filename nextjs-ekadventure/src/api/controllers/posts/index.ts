import { PostType } from "@/types/post-type";
import { PostDetailsType } from "@/types/post-details-type";
import { RelatedPostType } from "@/types/related-post-type";

export const fetchAllPosts = async (): Promise<ApiResult<PostType[]>> => {
    const result: ApiResult<PostType[]> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<PostType[]> = await fetch("https://fetchallposts-zsszt3mtmq-uc.a.run.app")
            .then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result ?? [];
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}

export const fetchLatestPosts = async (): Promise<ApiResult<PostType[]>> => {
    const result: ApiResult<PostType[]> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<PostType[]> = await fetch("https://fetchlatestposts-zsszt3mtmq-uc.a.run.app")
            .then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result ?? [];
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}

export const fetchLatestPostsByCategories = async (params: Record<string, any>): Promise<ApiResult<RelatedPostType>> => {
    const result: ApiResult<RelatedPostType> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<RelatedPostType> = await fetch("https://fetchlatestpostsbycategories-zsszt3mtmq-uc.a.run.app",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params)
            }
        ).then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result;
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}

export const fetchPostDetails = async (
    params: Record<string, any>,
): Promise<ApiResult<PostDetailsType>> => {
    const result: ApiResult<PostDetailsType> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<PostDetailsType> = await fetch("https://fetchpostdetails-zsszt3mtmq-uc.a.run.app",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params)
            }
        ).then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result;
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}