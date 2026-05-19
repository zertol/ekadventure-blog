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
import { ProductType } from "../../types/ecommerce/product-type";
import { CreateProductParamsType } from "../../types/ecommerce/create-product-params-type";
import { UpdateProductParamsType } from "../../types/ecommerce/update-product-params-type";

export const createProduct = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<ProductType>>): Promise<ProductType> => {
            const params: CreateProductParamsType = req.body;
            const EcommerceService = DIResolutions.getEcommerceService();

            return await EcommerceService.createProduct(params);
        }
    )));

export const updateProductImages = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<ProductType>>): Promise<ProductType> => {
            const params: UpdateProductParamsType = req.body;
            const EcommerceService = DIResolutions.getEcommerceService();

            return await EcommerceService.updateProductImages(params.id, params.images);
        }
    )));

export const getLatestProducts = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<ProductsResponseType>>): Promise<ProductsResponseType> => {
            const params: ParamsType = req.body;
            const EcommerceService = DIResolutions.getEcommerceService();

            return await EcommerceService.getLatestProducts(params?.lastProductId);
        }
    )));

export const getAllProducts = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<ProductType[]>>): Promise<ProductType[]> => {
            const EcommerceService = DIResolutions.getEcommerceService();

            return await EcommerceService.getAllProducts();
        }
    )));

export const getProductById = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<ProductType>>): Promise<ProductType> => {
            const params: ParamsType = req.body;
            const EcommerceService = DIResolutions.getEcommerceService();

            return await EcommerceService.getProductById(params.id);
        }
    )));

export const getTotalProducts = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<{ count: number }>>): Promise<{ count: number }> => {
            const EcommerceService = DIResolutions.getEcommerceService();

            return await EcommerceService.getTotalProducts();
        }
    )));

export const createCheckoutSession = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<URLType>>): Promise<URLType> => {
            const EcommerceService = DIResolutions.getEcommerceService();

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
        async (req: Request<any>, res: Response<ApiResult<URLType>>): Promise<URLType> => {
            const params: ParamsType = req.body;
            const EcommerceService = DIResolutions.getEcommerceService();
            return await EcommerceService.generateProductDownloadLink(params.token);
        }
    )));

export const verifyProcessedTokenFromSession = onRequest(
    { secrets: ["X_API_KEY", "STRIPE_SECRET_KEY"] },
    withApiAuth(createApiHandler<any>(
        async (req: Request<any>, res: Response<ApiResult<{ processed: boolean }>>): Promise<{ processed: boolean }> => {
            const params: ParamsType = req.body;
            const EcommerceService = DIResolutions.getEcommerceService();

            return await EcommerceService.verifyProcessedTokenFromSession(params.sessionId);
        }
    )));