import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";
import { SearchParamsType } from "../../types/api/search-params-type";

export const search = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<any> => {
            const params: SearchParamsType = req.body;
            return await DIResolutions.getSearchService().search(params.query, params.limit, params.offset);
        }
    )));