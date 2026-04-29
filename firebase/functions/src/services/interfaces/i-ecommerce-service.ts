import { URLType } from "../../types/domain/url-type";
import { CheckoutSessionParamsType } from "../../types/ecommerce/checkout-session-params-type";
import { ProductDownloadLinkType } from "../../types/ecommerce/product-download-link-type";
import { ProductsResponseType } from "../../types/ecommerce/product-response-type";

export interface IEcommerceService {
    initStripe(): void;
    getProducts(): Promise<ProductsResponseType>;
    createCheckoutSession(params: CheckoutSessionParamsType): Promise<URLType>;
    generateProductDownloadLink(item_key: string, expiresIn?: number): Promise<ProductDownloadLinkType>;
}