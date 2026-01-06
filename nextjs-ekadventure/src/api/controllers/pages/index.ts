import { PageType } from "@/types/page-type";
import { handleApiRequest } from "@/utils/api/handle-api-request";

export const fetchAllPages = async (): Promise<ApiResult<PageType[]>> => {
    return await handleApiRequest<PageType[]>("https://fetchallpages-zsszt3mtmq-uc.a.run.app");
}

export const fetchPrivacyPolicyPage = async (): Promise<ApiResult<PageType>> => {
    return await handleApiRequest<PageType>("https://fetchprivacypolicypage-zsszt3mtmq-uc.a.run.app");
}