import { CreateEmailResponse } from "resend";
import { ContactType } from "../../types/domain/contact-type";

export interface IMailService {
    sendContactMail(contactInfo: ContactType): Promise<CreateEmailResponse>;
}