import { CreateBatchResponse, CreateEmailResponse, UpdateContactResponse } from "resend";
import { ContactFormType } from "../../types/domain/contact-form-type";
import { BroadcastType } from "../../types/domain/broadcast-type";
import { StripeWebhookEvent } from "../../types/ecommerce/stripe-webhook-event-type";
import { ContactType } from "../../types/domain/contact-type";

export interface IMailService {
    sendContactMail(contactInfo: ContactFormType): Promise<CreateEmailResponse>;
    createNewsletterSubscriptionEmail(contactInfo: ContactType): Promise<CreateEmailResponse>;
    unsubscribe(contactInfo: ContactType): Promise<UpdateContactResponse>;
    sendBroadcastEmail(broadcast: BroadcastType): Promise<CreateBatchResponse<any>>;
    sendProductLink(event: StripeWebhookEvent): Promise<CreateEmailResponse | { received: boolean }>;
}