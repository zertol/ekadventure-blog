import { handleApiRequest } from "@/utils/api/handle-api-request";

export const handleMailService = async (contactData: ContactType | SubscriberType, action: string): Promise<ApiResult<ContactType>> => {
    return await handleApiRequest<ContactType>("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...contactData, action }),
    });
}