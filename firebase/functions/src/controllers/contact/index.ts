import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { ContactFormType } from "../../types/domain/contact-form-type";
import { CreateBatchResponse, CreateEmailResponse, UpdateContactResponse } from "resend";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";
import { BroadcastType } from "../../types/domain/broadcast-type";
import { ContactType } from "../../types/domain/contact-type";

export const sendContactMail = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<CreateEmailResponse>(
        async (req: Request<any>, res: Response<ApiResult<CreateEmailResponse>>): Promise<CreateEmailResponse> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.sendContactMail(req.body as ContactFormType);
        }
    )));

export const createNewsletterSubscriptionEmail = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<CreateEmailResponse>(
        async (req: Request<any>, res: Response<ApiResult<CreateEmailResponse>>): Promise<CreateEmailResponse> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.createNewsletterSubscriptionEmail(req.body as ContactType);
        }
    )));

export const sendBroadcastEmail = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<CreateBatchResponse<any>>(
        async (req: Request<any>, res: Response<ApiResult<CreateBatchResponse<any>>>): Promise<CreateBatchResponse<any>> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.sendBroadcastEmail(req.body as BroadcastType);
        }
    )));

export const unsubscribe = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<UpdateContactResponse>(
        async (req: Request<any>, res: Response<ApiResult<UpdateContactResponse>>): Promise<UpdateContactResponse> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.unsubscribe(req.body as ContactType);
        }
    )));