import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { CommentType } from "../../types/domain/comment-type";
import { SanityMutateResult } from "../../types/sanity/sanity-mutate-result";
import { ApiResult } from "../../types/api/api-result";
import { Constants } from "../../Constants";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { DIResolutions } from "../../utils/di-resolution";

export const addComment: any = onRequest(
    {
        secrets: ["SANITY_TOKEN", "SANITY_PROJECT_ID", "X_API_KEY"], cors: Constants.FIREBASE_CORS_LIST
    },
    withApiAuth(createApiHandler(
        async (req: Request<any, any, CommentType, any>, res: Response<ApiResult<SanityMutateResult>>): Promise<void> => {
            const commentToAdd: CommentType = req.body;
            return await DIResolutions.getCommentService().addComment(commentToAdd);
        }
    )));