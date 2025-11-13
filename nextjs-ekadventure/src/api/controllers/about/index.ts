import { handleApiRequest } from "@/utils/api/handle-api-request";

export const fetchAboutDetails = async (): Promise<ApiResult<AboutType>> => {
    return await handleApiRequest<AboutType>("https://fetchaboutdetails-zsszt3mtmq-uc.a.run.app");
}