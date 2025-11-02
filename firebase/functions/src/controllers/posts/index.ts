import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api-result";
import { PostType } from "../../types/post-type";
import { LATEST_POSTS_BY_CATEGORIES_QUERY, LATEST_POSTS_QUERY, POST_BY_SLUG_QUERY, POSTS_QUERY } from "../../utils/sanity-queries";
import { SanityError } from "../../types/sanity-error";
import { SanityResult } from "../../types/sanity-result";
import { formatString } from "../../utils/extenstions";
import { Constants } from "../../Constants";
import { ParamsType } from "../../types/params-type";
import { PostDetailsType } from "../../types/post-details-type";
import { RelatedPostType } from "../../types/related-post-type";

export const fetchAllPosts = onRequest(
    { secrets: ["SANITY_PROJECT_ID"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<PostType[]>>): Promise<void> => {
        const result: ApiResult<PostType[]> = {
            Result: null,
            ErrorMessages: []
        };

        try {
            const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(POSTS_QUERY)}`);

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            const sanityResult = (await response.json()) as SanityResult<PostType[]>;

            const responseData = sanityResult.result;

            res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

            result.Result = responseData || [];
            res.status(200).json(result);
        } catch (err) {
            result.ErrorMessages?.push((err as Error).message);
            res.status(500).json(result);
        }
    }
);

export const fetchLatestPostsByCategories = onRequest(
    { secrets: ["SANITY_PROJECT_ID"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<RelatedPostType>>): Promise<void> => {
        const result: ApiResult<RelatedPostType> = {
            Result: null,
            ErrorMessages: []
        };

        const params: ParamsType = req.body;
        const finalQuery = LATEST_POSTS_BY_CATEGORIES_QUERY.replace(/\$slug/g, "'" + params.slug + "'");

        try {
            const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            const sanityResult = (await response.json()) as SanityResult<RelatedPostType>;

            const responseData = sanityResult.result;

            res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

            result.Result = responseData;
            res.status(200).json(result);
        } catch (err) {
            result.ErrorMessages?.push((err as Error).message);
            res.status(500).json(result);
        }
    }
);

export const fetchPostDetails = onRequest(
    { secrets: ["SANITY_PROJECT_ID"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<PostDetailsType>>): Promise<void> => {
        const result: ApiResult<PostDetailsType> = {
            Result: null,
            ErrorMessages: []
        };

        const params: ParamsType = req.body;
        const finalQuery = POST_BY_SLUG_QUERY.replace(/\$slug/g, "'" + params.slug + "'");

        try {
            const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            const sanityResult = (await response.json()) as SanityResult<PostDetailsType>;

            const responseData = sanityResult.result;

            res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

            result.Result = responseData;
            res.status(200).json(result);
        } catch (err) {
            result.ErrorMessages?.push((err as Error).message);
            res.status(500).json(result);
        }
    }
);

export const fetchLatestPosts = onRequest(
    { secrets: ["SANITY_PROJECT_ID"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<PostType[]>>): Promise<void> => {
        const result: ApiResult<PostType[]> = {
            Result: null,
            ErrorMessages: []
        };

        try {
            const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(LATEST_POSTS_QUERY)}`);

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            const sanityResult = (await response.json()) as SanityResult<PostType[]>;

            const responseData = sanityResult.result;

            res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

            result.Result = responseData || [];
            res.status(200).json(result);
        } catch (err) {
            result.ErrorMessages?.push((err as Error).message);
            res.status(500).json(result);
        }
    }
);