import { ContactType } from "@/types/contact-type";
import { handleApiRequest } from "@/utils/api/handle-api-request";

export const sendContactMail = async (contactData: ContactType): Promise<ApiResult<ContactType>> => {
    return await handleApiRequest<ContactType>("https://sendcontactmail-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(contactData),
    });
}