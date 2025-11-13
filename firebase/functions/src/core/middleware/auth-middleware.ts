import { Request, Response } from "express";

export const withApiAuth = (handler: (req: Request, res: Response) => Promise<void> | void) => {
    return async (req: Request, res: Response) => {
        const apiKey = req.headers["x-api-key"];

        if (apiKey !== process.env.X_API_KEY) {
            res.status(403).json({ Result: null, ErrorMessages: ["Unauthorized API Call"] });
            return;
        }

        return handler(req, res);
    };
};