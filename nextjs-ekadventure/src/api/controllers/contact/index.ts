import { ContactType } from "@/types/contact-type";
import { handleApiRequest } from "@/utils/api/handle-api-request";

export const sendContactMail = async (contactData: ContactType): Promise<ApiResult<ContactType>> => {
    return await handleApiRequest<ContactType>("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactData),
    });
}