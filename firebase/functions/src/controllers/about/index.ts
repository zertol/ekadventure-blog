import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { Constants } from "../../Constants";
import { AboutType } from "../../types/domain/about-type";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";

export const fetchAboutDetails = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"], cors: Constants.FIREBASE_CORS_LIST },
    withApiAuth(createApiHandler(
        async (req: Request<any>, res: Response<ApiResult<AboutType>>): Promise<AboutType> => {
            return await DIResolutions.getAboutService().fetchAboutDetails();
        }
    ))
);