import { ProductMetadataType } from "./product-metadata-type";

export type CheckoutSessionParamsType = {
    priceId: string;
    productId: string;
    quantity: number;
    isQuantityAdjustable: boolean;
    maximumQuantity?: number;
    metadata: ProductMetadataType;
    successUrl: string;
    cancelUrl: string;
    locale?: LocaleType;
}