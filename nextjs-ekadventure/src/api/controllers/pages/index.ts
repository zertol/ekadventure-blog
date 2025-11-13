import { genericFetch } from "@/utils/api/generic-fetch";

export const fetchAllPages = async (): Promise<ApiResult<PageType[]>> => {
    const result: ApiResult<PageType[]> = {
        Result: null,
        ErrorMessages: []
    };

    const response: ApiResult<PageType[]> = await genericFetch<PageType[]>("https://fetchallpages-zsszt3mtmq-uc.a.run.app");

    if (response.ErrorMessages && response.ErrorMessages.length > 0) {
        result.ErrorMessages = response.ErrorMessages;
        return result;
    }

    result.Result = response.Result ?? [];
    return result;
}