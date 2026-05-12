import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
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

export const getTotalProducts = async (): Promise<ApiResult<{ count: number }>> => {
    return await handleApiRequest<{ count: number }>("https://gettotalproducts-zsszt3mtmq-uc.a.run.app");
};

export const getProductById = async (params: Record<string, any>): Promise<ApiResult<ProductsResponseType>> => {
    return await handleApiRequest<ProductsResponseType>("https://getproductbyid-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(params),
    });
};

export const getProductsByRoute = async (params?: Record<string, any>): Promise<ApiResult<ProductsResponseType>> => {
    return await handleApiRequest<ProductsResponseType>("/api/products", params && {
        method: "POST",
        body: JSON.stringify(params),
    });
};