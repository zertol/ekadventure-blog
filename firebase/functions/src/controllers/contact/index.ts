import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { ContactType } from "../../types/domain/contact-type";
import { CreateEmailResponse } from "resend";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";

export const sendContactMail = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<CreateEmailResponse>(
        async (req: Request<any>, res: Response<ApiResult<CreateEmailResponse>>): Promise<CreateEmailResponse> => {
            const mailService = DIResolutions.getMailService();
            return await mailService.sendContactMail(req.body as ContactType);
        }
    )));