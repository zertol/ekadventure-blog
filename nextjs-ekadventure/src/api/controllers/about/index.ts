import { AboutType } from "@/types/about-type";
import { handleApiRequest } from "@/utils/api/handle-api-request";

export const fetchAboutDetails = async (params: Record<string, any>): Promise<ApiResult<AboutType>> => {
    return await handleApiRequest<AboutType>("https://fetchaboutdetails-zsszt3mtmq-uc.a.run.app",
        {
            method: "POST",
            body: JSON.stringify(params)
        }
    );
}