import { SearchResultType } from "@/types/search-result-type";
import { handleApiRequest } from "@/utils/api/handle-api-request";

export const search = async (params: Record<string, any>): Promise<ApiResult<SearchResultType[]>> => {
    return await handleApiRequest<SearchResultType[]>("/api/search", {
        method: "POST",
        body: JSON.stringify(params),
    });
}