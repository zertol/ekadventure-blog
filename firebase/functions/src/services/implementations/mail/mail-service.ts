import { CreateEmailResponse, RemoveContactsResponse, Resend } from "resend";
import { IMailService } from "../../interfaces/i-mail-service";
import { ContactType } from "../../../types/domain/contact-type";
import { SubscriberType } from "../../../types/domain/subscriber-type";

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
            throw new Error(`Resend email error: ${resendResult.error}`);
        }

        return resendResult;
    }

    async createNewsletterSubscriptionEmail(subscriberInfo: SubscriberType): Promise<CreateEmailResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const fetchResult: CreateEmailResponse = await resend.contacts.get({
            email: subscriberInfo.email
        });

        if (fetchResult.data?.id) {
            throw new Error(`It looks like you are already subscribed with the email: ${subscriberInfo.email}`);
        }

        const createResult: CreateEmailResponse = await resend.contacts.create({
            email: subscriberInfo.email,
            unsubscribed: false
        });

        if (createResult.error) {
            throw new Error(`Resend email error: ${createResult.error}`);
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
            throw new Error(`Resend email error: ${sendResult.error}`);
        }

        return sendResult;
    }

    async unsubscribe(subscriberInfo: SubscriberType): Promise<RemoveContactsResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const removeResult: RemoveContactsResponse = await resend.contacts.remove({
            email: subscriberInfo.email
        });

        if (removeResult.error) {
            throw new Error(`Resend email error: ${removeResult.error}`);
        }

        return removeResult;
    }
}