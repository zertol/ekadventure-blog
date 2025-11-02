import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api-result";
import { CATEGORIES_QUERY, POSTS_BY_CATEGORY_QUERY } from "../../utils/sanity-queries";
import { SanityError } from "../../types/sanity-error";
import { SanityResult } from "../../types/sanity-result";
import { formatString } from "../../utils/extenstions";
import { Constants } from "../../Constants";
import { ParamsType } from "../../types/params-type";
import { CategoryType } from "../../types/category-type";
import { PostType } from "../../types/post-type";

export const fetchAllCategories = onRequest(
    { secrets: ["SANITY_PROJECT_ID"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<CategoryType[]>>): Promise<void> => {
        const result: ApiResult<CategoryType[]> = {
            Result: null,
            ErrorMessages: []
        };

        try {
            const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(CATEGORIES_QUERY)}`);

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            const sanityResult = (await response.json()) as SanityResult<CategoryType[]>;

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

export const fetchCategoryPosts = onRequest(
    { secrets: ["SANITY_PROJECT_ID"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<PostType[]>>): Promise<void> => {
        const result: ApiResult<PostType[]> = {
            Result: null,
            ErrorMessages: []
        };

        const params: ParamsType = req.body;
        const finalQuery = POSTS_BY_CATEGORY_QUERY.replace(/\$categoryname/g, "'" + params.categoryname + "'");

        try {
            const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            const sanityResult = (await response.json()) as SanityResult<PostType[]>;

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