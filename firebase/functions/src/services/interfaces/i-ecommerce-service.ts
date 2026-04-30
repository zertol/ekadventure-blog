import { URLType } from "../../types/domain/url-type";
import { CheckoutSessionParamsType } from "../../types/ecommerce/checkout-session-params-type";
import { ProductsResponseType } from "../../types/ecommerce/product-response-type";

export interface IEcommerceService {
    initStripe(): void;
    getProducts(): Promise<ProductsResponseType>;
    createCheckoutSession(params: CheckoutSessionParamsType): Promise<URLType>;
    generateProductDownloadLink(token: string, expiresIn?: number): Promise<URLType>;
}