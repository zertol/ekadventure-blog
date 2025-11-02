import { CategoryType } from "@/types/category-type";
import { PostType } from "@/types/post-type";

export const fetchAllCategories = async (): Promise<ApiResult<CategoryType[]>> => {
    const result: ApiResult<CategoryType[]> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<CategoryType[]> = await fetch("https://fetchallcategories-zsszt3mtmq-uc.a.run.app")
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

export const fetchCategoryPosts = async (
    params: Record<string, any>,
): Promise<ApiResult<PostType[]>> => {
    const result: ApiResult<PostType[]> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<PostType[]> = await fetch("https://fetchcategoryposts-zsszt3mtmq-uc.a.run.app",
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
