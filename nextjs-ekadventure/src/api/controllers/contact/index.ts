import { ContactType } from "@/types/contact-type";

export const sendContactMail = async (contactData: ContactType): Promise<ApiResult<ContactType>> => {
    const result: ApiResult<ContactType> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<ContactType> = await fetch("https://sendcontactmail-zsszt3mtmq-uc.a.run.app",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactData)
            }
        ).then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result;
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}