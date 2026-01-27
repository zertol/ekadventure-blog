import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { Constants } from "../../Constants";
import { ParamsType } from "../../types/api/params-type";
import { CategoryType } from "../../types/domain/category-type";
import { PostType } from "../../types/domain/post-type";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";

export const fetchAllCategories = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"], cors: Constants.FIREBASE_CORS_LIST },
    withApiAuth(createApiHandler(
        async (req: Request<any>, res: Response<ApiResult<CategoryType[]>>): Promise<CategoryType[]> => {
            const params: ParamsType = req.body;
            return await DIResolutions.getCategoryService().fetchAllCategories(params.locale);
        }
    )));

export const fetchCategoryPosts = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"], cors: Constants.FIREBASE_CORS_LIST },
    withApiAuth(createApiHandler(
        async (req: Request<any>, res: Response<ApiResult<PostType[]>>): Promise<PostType[]> => {
            const params: ParamsType = req.body;
            return await DIResolutions.getCategoryService().fetchCategoryPosts(params.categoryname, params.locale);
        }
    )));