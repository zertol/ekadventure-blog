import { handleApiRequest } from "@/utils/api/handle-api-request";

export const fetchAllPages = async (): Promise<ApiResult<PageType[]>> => {
    return await handleApiRequest<PageType[]>("https://fetchallpages-zsszt3mtmq-uc.a.run.app");
}