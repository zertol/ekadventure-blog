import { ProductMetadataType } from "./product-metadata-type";
import Stripe from "stripe";

type StripeLocale = Parameters<typeof Stripe.prototype.checkout.sessions.create>[0]["locale"];

export type CheckoutSessionParamsType = {
    priceId: string;
    quantity: number;
    isQuantityAdjustable: boolean;
    maximumQuantity?: number;
    metadata: ProductMetadataType;
    successUrl: string;
    cancelUrl: string;
    locale?: StripeLocale;
}