import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";
import { PostType } from "../../types/domain/post-type";
import { ParamsType } from "../../types/api/params-type";
import { PostDetailsType } from "../../types/domain/post-details-type";
import { RelatedPostType } from "../../types/domain/related-post-type";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";

export const fetchAllPosts = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"] },
    withApiAuth(createApiHandler<PostType[]>(
        async (req: Request<any>, res: Response<ApiResult<PostType[]>>): Promise<PostType[]> => {
            const params: ParamsType = req.body;
            return await DIResolutions.getPostService().fetchAllPosts(params.locale);
        }
    )));

export const fetchLatestPostsByCategories = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"] },
    withApiAuth(createApiHandler<RelatedPostType>(
        async (req: Request<any>, res: Response<ApiResult<RelatedPostType>>): Promise<RelatedPostType> => {
            const params: ParamsType = req.body;
            return await DIResolutions.getPostService().fetchLatestPostsByCategories(params.slug, params.locale);
        }
    )));

export const fetchPostDetails = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"] },
    withApiAuth(createApiHandler<PostDetailsType>(
        async (req: Request<any>, res: Response<ApiResult<PostDetailsType>>): Promise<PostDetailsType> => {
            const params: ParamsType = req.body;
            return await DIResolutions.getPostService().fetchPostDetails(params.slug, params.locale);
        }
    )));

export const fetchLatestPosts = onRequest(
    { secrets: ["SANITY_PROJECT_ID", "X_API_KEY"] },
    withApiAuth(createApiHandler<PostType[]>(
        async (req: Request<any>, res: Response<ApiResult<PostType[]>>): Promise<PostType[]> => {
            const params: ParamsType = req.body;
            return await DIResolutions.getPostService().fetchLatestPosts(params.locale);
        }
    )));