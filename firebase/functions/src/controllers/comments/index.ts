import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { CommentType } from "../../types/comment-type";
import { SanityCommentResult } from "../../types/sanity-comment-result";
import { ApiResult } from "../../types/api-result";
import { SanityError } from "../../types/sanity-error";

export const addComment: any = onRequest(
    {
        secrets: ["SANITY_TOKEN", "SANITY_PROJECT_ID"], cors: ["http://localhost:3000",
            "https://kd-stu.sanity.studio",
            "http://localhost:3333"]
    },
    async (req: Request<any, any, CommentType, any>, res: Response<ApiResult<SanityCommentResult>>): Promise<void> => {
        const result: ApiResult<SanityCommentResult> = {
            Result: null,
            ErrorMessages: []
        };

        try {
            const commentToAdd: CommentType = req.body;

            const response = await fetch(
                `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2024-03-20/data/mutate/production`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.SANITY_TOKEN}`
                    },
                    body: JSON.stringify({
                        mutations: [
                            {
                                create: {
                                    _type: "comment",
                                    comment: commentToAdd.comment,
                                    post: {
                                        _type: "reference",
                                        _ref: commentToAdd.postId
                                    },
                                    parent: commentToAdd.parentId ? {
                                        _type: "reference",
                                        _ref: commentToAdd.parentId
                                    } : undefined,
                                    name: commentToAdd.name,
                                    email: commentToAdd.email,
                                    isAuthor: commentToAdd.isAuthor,
                                    approved: commentToAdd.approved
                                }
                            }
                        ],
                        returnIds: true
                    })
                }
            );

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            result.Result = (await response.json()) as SanityCommentResult;
            res.status(200).json(result);
        } catch (err) {
            result.ErrorMessages?.push((err as Error).message);
            res.status(500).json(result);
        }
    }
);