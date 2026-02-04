import { CreateBatchResponse, CreateEmailResponse, ListContactsResponse, RemoveContactsResponse, Resend } from "resend";
import { IMailService } from "../../interfaces/i-mail-service";
import { ContactType } from "../../../types/domain/contact-type";
import { SubscriberType } from "../../../types/domain/subscriber-type";
import { BroadcastType } from "../../../types/domain/broadcast-type";

export class MailService implements IMailService {
    async sendContactMail(contactInfo: ContactType): Promise<CreateEmailResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { name, email, subject, message } = contactInfo;

        const resendResult: CreateEmailResponse = await resend.emails.send({
            from: "Ekadventure Contact <contact@ekadventure.com>",
            to: "e.kadvnture@gmail.com",
            subject: `Contact Form: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>`
        });

        if (resendResult.error) {
            throw new Error(`Resend email error: ${JSON.stringify(resendResult.error)}`);
        }

        return resendResult;
    }

    async createNewsletterSubscriptionEmail(subscriberInfo: SubscriberType): Promise<CreateEmailResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const fetchResult: CreateEmailResponse = await resend.contacts.get({
            email: subscriberInfo.email
        });

        if (fetchResult.data?.id) {
            return fetchResult;
        }

        const createResult: CreateEmailResponse = await resend.contacts.create({
            email: subscriberInfo.email,
            unsubscribed: false
        });

        if (createResult.error) {
            throw new Error(`Resend email error: ${JSON.stringify(createResult.error)}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const addToSegmentResult: CreateEmailResponse = await resend.contacts.segments.add({
            email: subscriberInfo.email,
            segmentId: "d1389b4b-7128-46ac-bfdc-21cfcff0556f"
        });

        if (addToSegmentResult.error) {
            throw new Error(`Resend email error: ${addToSegmentResult.error}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const sendResult: CreateEmailResponse = await resend.emails.send({
            from: "Elie from Ekadventure <hello@ekadventure.com>",
            replyTo: "e.kadvnture@gmail.com",
            to: subscriberInfo.email,
            template: {
                id: "15a867be-40b9-4f6c-b61f-4103216d78c2",
                variables: {
                    contactName: "Fellow Adventurer",
                    siteUrl: "https://ekadventure.com"
                }
            }
        });

        if (sendResult.error) {
            throw new Error(`Resend email error: ${JSON.stringify(sendResult.error)}`);
        }

        return sendResult;
    }

    async sendBroadcastEmail(broadcast: BroadcastType): Promise<CreateBatchResponse<any>> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const listResult: ListContactsResponse = await resend.contacts.list();

        if (listResult.error) {
            throw new Error(`Resend email error Upon Fetching List: ${JSON.stringify(listResult.error)}`);
        }

        const contactsBatch = listResult.data.data.map((contact) => {
            return {
                from: "Ekadventure Blog <blog@ekadventure.com>",
                replyTo: "e.kadvnture@gmail.com",
                to: contact.email,
                template: {
                    id: "03a05155-d2ef-47ff-983f-998c7246a3ea",
                    variables: { contactName: "Fellow Adventurer", ...broadcast }
                }
            };
        });

        const sendResult: CreateBatchResponse<any> = await resend.batch.send(contactsBatch);

        if (sendResult.error) {
            throw new Error(`Resend email error Upon Sending The Broadcast: ${JSON.stringify(sendResult.error)}`);
        }

        return sendResult;
    }

    async unsubscribe(subscriberInfo: SubscriberType): Promise<RemoveContactsResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const removeResult: RemoveContactsResponse = await resend.contacts.remove({
            email: subscriberInfo.email
        });

        if (removeResult.error) {
            throw new Error(`Resend email error: ${JSON.stringify(removeResult.error)}`);
        }

        return removeResult;
    }
}