import { handleApiRequest } from "@/utils/api/handle-api-request";

export const handleMailService = async (contactData: ContactFormType | ContactType, action: string): Promise<ApiResult<ContactFormType>> => {
    return await handleApiRequest<ContactFormType>("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...contactData, action })
    });
}