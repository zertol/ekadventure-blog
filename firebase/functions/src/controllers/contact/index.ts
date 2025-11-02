import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api-result";
import { Constants } from "../../Constants";
import { ContactType } from "../../types/contact-type";
import { CreateEmailResponse, Resend } from "resend";

export const sendContactMail = onRequest(
    { secrets: ["RESEND_API_KEY"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<CreateEmailResponse>>): Promise<void> => {
        const result: ApiResult<CreateEmailResponse> = {
            Result: null,
            ErrorMessages: []
        };

        const { name, email, subject, message }: ContactType = req.body;

        try {
            const resend = new Resend(process.env.RESEND_API_KEY);

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

            result.Result = resendResult;
            res.status(200).json(result);
        } catch (err) {
            result.ErrorMessages?.push((err as Error).message);
            res.status(500).json(result);
        }
    }
);