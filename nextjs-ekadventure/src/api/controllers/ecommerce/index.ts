import { CheckoutSessionParamsType } from "@/types/ecommerce/checkout-session-params-type";
import { ProductActionsEnum } from "@/types/ecommerce/product-actions-enum";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
import { ProductType } from "@/types/ecommerce/product-type";
import { handleApiRequest } from "@/utils/api/handle-api-request";

export const generateProductDownloadLink = async (params: Record<string, any>): Promise<ApiResult<URLType>> => {
    return await handleApiRequest<URLType>("https://generateproductdownloadlink-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params),
    }, 0);
}

export const getLatestProducts = async (): Promise<ApiResult<ProductsResponseType>> => {
    return await handleApiRequest<ProductsResponseType>("https://getlatestproducts-zsszt3mtmq-uc.a.run.app");
};

export const getAllProducts = async (): Promise<ApiResult<ProductType[]>> => {
    return await handleApiRequest<ProductType[]>("https://getallproducts-zsszt3mtmq-uc.a.run.app");
};

export const getTotalProducts = async (): Promise<ApiResult<{ count: number }>> => {
    return await handleApiRequest<{ count: number }>("https://gettotalproducts-zsszt3mtmq-uc.a.run.app");
};

export const getProductById = async (params: Record<string, any>): Promise<ApiResult<ProductType>> => {
    return await handleApiRequest<ProductType>("https://getproductbyid-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params)
    });
};

export const getProductsByRoute = async (params?: Record<string, any>): Promise<ApiResult<ProductsResponseType>> => {
    const action = ProductActionsEnum.getLatestProducts;
    return await handleApiRequest<ProductsResponseType>("/api/ecommerce", params && {
        method: "POST",
        body: JSON.stringify({ ...params, action })
    });
};

export const createCheckoutSession = async (params?: CheckoutSessionParamsType): Promise<ApiResult<URLType>> => {
    const action = ProductActionsEnum.createCheckoutSession;
    return await handleApiRequest<URLType>("/api/ecommerce", params && {
        method: "POST",
        body: JSON.stringify({ ...params, action })
    });
};

export const verifyProcessedTokenFromSession = async (params: Record<string, any>): Promise<ApiResult<{ processed: boolean }>> => {
    return await handleApiRequest<{ processed: boolean }>("https://verifyprocessedtokenfromsession-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params)
    }, 0);
};