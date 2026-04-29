import { Request, Response } from "express";
import { Constants } from "../../Constants";

export const withApiAuth = (handler: (req: Request, res: Response) => Promise<void> | void) => {
    return async (req: Request, res: Response) => {
        const apiKey = req.headers["x-api-key"];
        const stripeSignature = req.headers["stripe-signature"];

        console.log("Headers: ", req.headers); // Cloud Logging Purposes

        if (apiKey !== process.env.X_API_KEY && !Constants.FIREBASE_CORS_LIST.includes(req.headers.origin || "") && (!stripeSignature || stripeSignature == undefined)) {
            res.status(403).json({ Result: null, ErrorMessages: ["Unauthorized API Call"] });
            return;
        }

        return handler(req, res);
    };
};