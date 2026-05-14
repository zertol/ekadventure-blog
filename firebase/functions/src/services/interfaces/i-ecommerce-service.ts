import { URLType } from "../../types/domain/url-type";
import { CheckoutSessionParamsType } from "../../types/ecommerce/checkout-session-params-type";
import { CreateProductParamsType } from "../../types/ecommerce/create-product-params-type";
import { ProductsResponseType } from "../../types/ecommerce/product-response-type";
import { ProductType } from "../../types/ecommerce/product-type";

export interface IEcommerceService {
    initStripe(): void;
    getTotalProducts(): Promise<{ count: number }>;
    createProduct(product: CreateProductParamsType): Promise<ProductType>;
    updateProductImages(id: string, images: string[]): Promise<ProductType>;
    getLatestProducts(lastProductId?: string): Promise<ProductsResponseType>;
    getAllProducts(): Promise<ProductType[]>;
    getProductById(id: string): Promise<ProductType>;
    createCheckoutSession(params: CheckoutSessionParamsType): Promise<URLType>;
    generateProductDownloadLink(token: string, expiresIn?: number): Promise<URLType>;
}