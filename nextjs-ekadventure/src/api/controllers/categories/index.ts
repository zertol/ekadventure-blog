import { handleApiRequest } from "@/utils/api/handle-api-request";

export const fetchAllCategories = async (): Promise<ApiResult<CategoryType[]>> => {
    return await handleApiRequest<CategoryType[]>("https://fetchallcategories-zsszt3mtmq-uc.a.run.app");
}

export const fetchCategoryPosts = async (
    params: Record<string, any>,
): Promise<ApiResult<PostType[]>> => {
    return await handleApiRequest<PostType[]>("https://fetchcategoryposts-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params),
    });
}
