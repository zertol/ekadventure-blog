import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { ApiResult } from "../../types/api-result";
import { PageType } from "../../types/page-type";
import { PAGES_QUERY } from "../../utils/sanity-queries";
import { SanityError } from "../../types/sanity-error";
import { SanityResult } from "../../types/sanity-result";
import { formatString } from "../../utils/extenstions";
import { Constants } from "../../Constants";

export const fetchAllPages = onRequest(
    { secrets: ["SANITY_PROJECT_ID"], cors: Constants.FIREBASE_CORS_LIST },
    async (req: Request<any>, res: Response<ApiResult<PageType[]>>): Promise<void> => {
        const apiResult: ApiResult<PageType[]> = {
            Result: null,
            ErrorMessages: []
        };

        try {
            const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(PAGES_QUERY)}`);

            if (!response.ok) {
                const errorData = (await response.json()) as SanityError;
                throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
            }

            const sanityResult = (await response.json()) as SanityResult<PageType[]>;

            const responseData = sanityResult.result;

            res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

            apiResult.Result = responseData || [];
            res.status(200).json(apiResult);
        } catch (err) {
            apiResult.ErrorMessages?.push((err as Error).message);
            res.status(500).json(apiResult);
        }
    }
);