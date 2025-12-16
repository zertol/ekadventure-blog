import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { ContactType } from "../../types/domain/contact-type";
import { CreateEmailResponse, RemoveContactsResponse } from "resend";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";
import { SubscriberType } from "../../types/domain/subscriber-type";

export const sendContactMail = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<CreateEmailResponse>(
        async (req: Request<any>, res: Response<ApiResult<CreateEmailResponse>>): Promise<CreateEmailResponse> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.sendContactMail(req.body as ContactType);
        }
    )));

export const createNewsletterSubscriptionEmail = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<CreateEmailResponse>(
        async (req: Request<any>, res: Response<ApiResult<CreateEmailResponse>>): Promise<CreateEmailResponse> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.createNewsletterSubscriptionEmail(req.body as SubscriberType);
        }
    )));

export const unsubscribe = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<RemoveContactsResponse>(
        async (req: Request<any>, res: Response<ApiResult<RemoveContactsResponse>>): Promise<RemoveContactsResponse> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.unsubscribe(req.body as SubscriberType);
        }
    )));