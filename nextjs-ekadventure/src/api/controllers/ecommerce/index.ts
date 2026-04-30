import { handleApiRequest } from "@/utils/api/handle-api-request";

export const generateProductDownloadLink = async (params: Record<string, any>): Promise<ApiResult<URLType>> => {
    return await handleApiRequest<URLType>("https://generateproductdownloadlink-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params),
    }, 0);
}