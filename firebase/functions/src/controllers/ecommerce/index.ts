import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { createApiHandler } from "../../core/handler/create-api-handler";
import { withApiAuth } from "../../core/middleware/auth-middleware";
import { ApiResult } from "../../types/api/api-result";
import { ProductsResponseType } from "../../types/ecommerce/product-response-type";
import { DIResolutions } from "../../utils/di-resolution";
import { CheckoutSessionParamsType } from "../../types/ecommerce/checkout-session-params-type";
import { ParamsType } from "../../types/api/params-type";
import { URLType } from "../../types/domain/url-type";
import { StripeWebhookEvent } from "../../types/ecommerce/stripe-webhook-event-type";

export const getProducts = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<ProductsResponseType> => {
            const EcommerceService = DIResolutions.getEcommerceService();
            EcommerceService.initStripe();

            return await EcommerceService.getProducts();
        }
    )));

export const createCheckoutSession = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<URLType> => {
            const EcommerceService = DIResolutions.getEcommerceService();
            EcommerceService.initStripe();

            return await EcommerceService.createCheckoutSession(req.body as CheckoutSessionParamsType);
        }
    )));

export const sendProductLink = onRequest(
    { secrets: ["RESEND_API_KEY", "X_API_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<any> => {
            const event: StripeWebhookEvent = req.body;
            const mailService = DIResolutions.getMailService();
            return await mailService.sendProductLink(event);
        }
    )));

export const generateProductDownloadLink = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY", "R2_ENDPOINT", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<any>>): Promise<URLType> => {
            const params: ParamsType = req.body;
            const EcommerceService = DIResolutions.getEcommerceService();
            return await EcommerceService.generateProductDownloadLink(params.token);
        }
    )));