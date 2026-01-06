import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { PageType } from "../../types/domain/page-type";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions as DIResolution } from "../../utils/di-resolution";

export const fetchAllPages = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"] },
    withApiAuth(createApiHandler<PageType[]>(
        async (req: Request<any>, res: Response<ApiResult<PageType[]>>): Promise<PageType[]> => {
            return await DIResolution.getPageService().fetchAllPages();
        }
    )));

export const fetchPrivacyPolicyPage = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"] },
    withApiAuth(createApiHandler<PageType>(
        async (req: Request<any>, res: Response<ApiResult<PageType>>): Promise<PageType> => {
            return await DIResolution.getPageService().fetchPrivacyPolicyPage();
        }
    )));