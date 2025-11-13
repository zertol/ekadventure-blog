import { CreateEmailResponse, Resend } from "resend";
import { IMailService } from "../../interfaces/i-mail-service";
import { ContactType } from "../../../types/domain/contact-type";

export class MailService implements IMailService {
    async sendContactMail(contactInfo: ContactType): Promise<CreateEmailResponse> {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { name, email, subject, message } = contactInfo;

        const resendResult: CreateEmailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
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
}
