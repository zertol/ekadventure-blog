import { PostDetailsType } from "@/types/post-details-type";
import { handleApiRequest } from "@/utils/api/handle-api-request";

export const fetchAllPosts = async (): Promise<ApiResult<PostType[]>> => {
    return await handleApiRequest<PostType[]>("https://fetchallposts-zsszt3mtmq-uc.a.run.app");
}

export const fetchLatestPosts = async (): Promise<ApiResult<PostType[]>> => {
    return await handleApiRequest<PostType[]>("https://fetchlatestposts-zsszt3mtmq-uc.a.run.app");
}

export const fetchLatestPostsByCategories = async (params: Record<string, any>): Promise<ApiResult<RelatedPostType>> => {
    return await handleApiRequest<RelatedPostType>("https://fetchlatestpostsbycategories-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params),
    });
}

export const fetchPostDetails = async (
    params: Record<string, any>,
): Promise<ApiResult<PostDetailsType>> => {
    return await handleApiRequest<PostDetailsType>("https://fetchpostdetails-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params),
    });
}