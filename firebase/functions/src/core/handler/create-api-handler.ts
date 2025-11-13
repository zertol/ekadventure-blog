import { Request, Response } from "express";
import { ApiResult } from "../../types/api/api-result";

type Handler<T> = (req: Request, res: Response) => Promise<T> | T;

export const createApiHandler = <T>(handler: Handler<T>) => {
    return async (req: Request, res: Response<ApiResult<T>>) => {
        const apiResult: ApiResult<T> = { Result: null, ErrorMessages: [] };
        res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

        try {
            const result = await handler(req, res);
            apiResult.Result = result ?? null;
            res.status(200).json(apiResult);
        } catch (err) {
            apiResult.ErrorMessages.push((err as Error).message || "Unknown error");
            res.status(500).json(apiResult);
        }
    };
};