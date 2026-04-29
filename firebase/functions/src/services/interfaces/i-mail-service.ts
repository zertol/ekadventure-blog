import { CreateBatchResponse, CreateEmailResponse, RemoveContactsResponse } from "resend";
import { ContactType } from "../../types/domain/contact-type";
import { SubscriberType } from "../../types/domain/subscriber-type";
import { BroadcastType } from "../../types/domain/broadcast-type";
import { StripeWebhookEvent } from "../../types/ecommerce/stripe-webhook-event-type";

export interface IMailService {
    sendContactMail(contactInfo: ContactType): Promise<CreateEmailResponse>;
    createNewsletterSubscriptionEmail(subscriberInfo: SubscriberType): Promise<CreateEmailResponse>;
    unsubscribe(subscriberInfo: SubscriberType): Promise<RemoveContactsResponse>;
    sendBroadcastEmail(broadcast: BroadcastType): Promise<CreateBatchResponse<any>>;
    sendProductLink(event: StripeWebhookEvent): Promise<CreateEmailResponse | { received: boolean }>;
}