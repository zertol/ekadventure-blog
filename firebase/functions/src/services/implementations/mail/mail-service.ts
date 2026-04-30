import { CreateBatchResponse, CreateEmailResponse, GetContactResponse, ListContactsResponse, RemoveContactsResponse, Resend, UpdateContactResponse } from "resend";
import { IMailService } from "../../interfaces/i-mail-service";
import { ContactFormType } from "../../../types/domain/contact-form-type";
import { BroadcastType } from "../../../types/domain/broadcast-type";
import { StripeWebhookEvent } from "../../../types/ecommerce/stripe-webhook-event-type";
import { ekadventureBlogDb } from "../../../cms/firestore/firestore-db";
import { Constants } from "../../../Constants";
import * as Helpers from "../../../utils/helpers";
import { Locale, strings } from "../../../utils/localizer";
import { ContactType } from "../../../types/domain/contact-type";
import { ProductDownloadTokenType } from "../../../types/ecommerce/product-download-token-type";

export class MailService implements IMailService {
    async sendContactMail(contactInfo: ContactFormType): Promise<CreateEmailResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { name, email, subject, message } = contactInfo;

        const resendResult: CreateEmailResponse = await resend.emails.send({
            from: "Ekadventure Contact <contact@ekadventure.com>",
            to: Constants.RESEND_EMAIL_REPLY_TO,
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

    async createNewsletterSubscriptionEmail(contactInfo: ContactType): Promise<CreateEmailResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const fetchResult: GetContactResponse = await resend.contacts.get({
            email: contactInfo.email
        });

        // If contact exists but unsubscribed, mark him as subscribed
        if (fetchResult.data?.id && fetchResult.data.unsubscribed) {
            const updateResult: UpdateContactResponse = await resend.contacts.update({
                email: contactInfo.email,
                unsubscribed: false
            });

            if (updateResult.error) {
                throw new Error(`Resend update contact error: ${JSON.stringify(updateResult.error)}`);
            }

            return {
                data: null,
                error: null
            } as CreateEmailResponse;
        }

        const createResult: CreateEmailResponse = await resend.contacts.create({
            email: contactInfo.email,
            unsubscribed: false
        });

        if (createResult.error) {
            throw new Error(`Resend email error: ${JSON.stringify(createResult.error)}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const addToSegmentResult: CreateEmailResponse = await resend.contacts.segments.add({
            email: contactInfo.email,
            segmentId: "d1389b4b-7128-46ac-bfdc-21cfcff0556f"
        });

        if (addToSegmentResult.error) {
            throw new Error(`Resend email error: ${addToSegmentResult.error}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const locale = contactInfo.preferences.locale;

        try {
            await ekadventureBlogDb.collection("contacts").doc(createResult.data.id).set({
                email: contactInfo.email,
                preferences: {
                    locale: locale ?? "en"
                }
            });
        } catch (err) {
            throw new Error(`Failed to create contact: ${err}`);
        }

        const subject = strings.email.onboarding.subject[locale];
        const greeting = strings.email.onboarding.greeting[locale];
        const unsubscribe = strings.email.onboarding.unsubscribe[locale];
        const body = strings.email.onboarding.body[locale];
        const cta = strings.email.onboarding.cta[locale];
        const footer = strings.email.onboarding.footer[locale];
        const signature = strings.email.onboarding.signature[locale];

        const sendResult: CreateEmailResponse = await resend.emails.send({
            from: Constants.RESEND_HELLO_EMAIL_FROM,
            replyTo: Constants.RESEND_EMAIL_REPLY_TO,
            to: contactInfo.email,
            template: {
                id: "15a867be-40b9-4f6c-b61f-4103216d78c2",
                variables: {
                    SUBJECT: subject,
                    GREETING: greeting,
                    UNSUBSCRIBE: unsubscribe,
                    BODY: body,
                    CTA: cta,
                    FOOTER: footer,
                    SIGNATURE: signature,
                    BLOG_URL: `https://ekadventure.com/${locale}`,
                    UNSUBSCRIBE_URL: `https://ekadventure.com/${locale}/unsubscribe`
                }
            }
        });

        if (sendResult.error) {
            throw new Error(`Resend email error: ${JSON.stringify(sendResult.error)}`);
        }

        return sendResult;
    }

    async sendBroadcastEmail(broadcast: BroadcastType): Promise<CreateBatchResponse<any>> {
        console.log("Preparing to send broadcast email with the following details:", JSON.stringify(broadcast));

        const resend = new Resend(process.env.RESEND_API_KEY);

        const listResult: ListContactsResponse = await resend.contacts.list();

        if (listResult.error) {
            throw new Error(`Resend email error Upon Fetching List: ${JSON.stringify(listResult.error)}`);
        }

        const contactsMap = new Map<string, ContactType>();

        try {
            const contactsSnapshot = await ekadventureBlogDb.collection("contacts").get();
            contactsSnapshot.docs.forEach((doc) => {
                const data = doc.data() as ContactType;
                contactsMap.set(data.email, data);
            });
        } catch (err) {
            throw new Error(`Failed to get contacts: ${err}`);
        }

        const contactsBatch = listResult.data.data.filter((contact) => !contact.unsubscribed).map((contact) => {
            const dbContact = contactsMap.get(contact.email);
            const locale = dbContact?.preferences?.locale ?? "en";

            const broadcastLocale = Helpers.mapBroadcastDataBasedOnLocale(broadcast, locale as Locale);

            const subject = strings.email.broadcast.subject[locale](broadcastLocale.articleTitle);
            const greeting = strings.email.broadcast.greeting[locale];
            const unsubscribe = strings.email.broadcast.unsubscribe[locale];
            const body = strings.email.broadcast.body[locale];
            const cta = strings.email.broadcast.cta[locale];
            const footer = strings.email.broadcast.footer[locale];
            const signature = strings.email.broadcast.signature[locale];

            return {
                from: Constants.RESEND_BROADCAST_EMAIL_FROM,
                replyTo: Constants.RESEND_EMAIL_REPLY_TO,
                to: contact.email,
                template: {
                    id: "03a05155-d2ef-47ff-983f-998c7246a3ea",
                    variables: {
                        SUBJECT: subject,
                        GREETING: greeting,
                        UNSUBSCRIBE: unsubscribe,
                        BODY: body,
                        CTA: cta,
                        FOOTER: footer,
                        SIGNATURE: signature,
                        ARTICLE_URL: broadcastLocale.articleUrl,
                        ARTICLE_INTRO: broadcastLocale.articleBroadcastIntro,
                        ARTICLE_TITLE: broadcastLocale.articleTitle,
                        UNSUBSCRIBE_URL: `https://ekadventure.com/${locale}/unsubscribe`
                    }
                }
            };
        });

        console.log("Constructed contacts batch for broadcast email:", JSON.stringify(contactsBatch));

        const sendResult: CreateBatchResponse<any> = await resend.batch.send(contactsBatch);

        if (sendResult.error) {
            throw new Error(`Resend email error Upon Sending The Broadcast: ${JSON.stringify(sendResult.error)}`);
        }

        return sendResult;
    }

    async unsubscribe(contactInfo: ContactType): Promise<UpdateContactResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const updateResult: UpdateContactResponse = await resend.contacts.update({
            email: contactInfo.email,
            unsubscribed: true
        });

        if (updateResult.error) {
            throw new Error(`Resend update contact error: ${JSON.stringify(updateResult.error)}`);
        }

        return updateResult;
    }

    async sendProductLink(event: StripeWebhookEvent): Promise<CreateEmailResponse | { received: boolean }> {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const token = crypto.randomUUID();
        const session = event.data.object;

        if (!Helpers.isValidProductMetadata(session.metadata)) {
            throw new Error(`Invalid metadata: ${JSON.stringify(session.metadata)}`);
        }

        if (session.payment_status !== "paid") {
            return { data: null, error: null } as CreateEmailResponse;
        }

        try {
            const productDownloadToken: ProductDownloadTokenType = {
                metadata: Helpers.mapMetadata(session.metadata),
                customerDetails: session.customer_details,
                locale: session.locale as Locale,
                expiresAt: Date.now() + (Constants.DOWNLOAD_LINK_EXPIRES_IN_SECONDS * 1000), // Store in Milliseconds to compare later
                createdAt: Date.now(),
                used: false
            };

            await ekadventureBlogDb.collection("product_download_tokens").doc(token).set(productDownloadToken);
        } catch (err) {
            throw new Error(`Failed to create download token: ${err}`);
        }

        const locale = session.locale as Locale;

        const itemLabel = strings.common.productItemLabel[session.metadata.item_type][locale];
        const subject = strings.email.downloadReady.subject[locale](itemLabel);
        const greeting = strings.email.downloadReady.greeting[locale](session.customer_details.name);
        const thankYou = strings.email.downloadReady.thankYou[locale];
        const body = strings.email.downloadReady.body[locale](itemLabel, Constants.DOWNLOAD_LINK_EXPIRES_IN_DAYS.toString());
        const cta = strings.email.downloadReady.cta[locale](itemLabel);
        const footer = strings.email.downloadReady.footer[locale];
        const signature = strings.email.downloadReady.signature[locale];

        const sendResult: CreateEmailResponse = await resend.emails.send({
            from: Constants.RESEND_PRODUCT_EMAIL_FROM,
            replyTo: Constants.RESEND_EMAIL_REPLY_TO,
            to: session.customer_details.email,
            template: {
                id: "b8d038da-4a6c-42fa-a3a4-2cd006bffe78",
                variables: {
                    SUBJECT: subject,
                    GREETING: greeting,
                    THANK_YOU: thankYou,
                    BODY: body,
                    CTA: cta,
                    FOOTER: footer,
                    SIGNATURE: signature,
                    PRODUCT_LINK: `https://ekadventure.com/download?token=${token}`
                }
            }
        });

        if (sendResult.error) {
            throw new Error(`Resend email error: ${JSON.stringify(sendResult.error)}`);
        }

        return sendResult;
    }
}