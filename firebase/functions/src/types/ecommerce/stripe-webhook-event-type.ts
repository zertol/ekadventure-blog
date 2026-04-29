import { ProductMetadataType } from "./product-metadata-type";
// base event wrapper - generic so data.object can vary
type StripeEvent<T> = {
    id: string;
    type: string;
    livemode: boolean;
    data: {
        object: T;
    };
};

// reusable building blocks
type StripeAddress = {
    city: string | null;
    country: string | null;
    line1: string | null;
    line2: string | null;
    postal_code: string | null;
    state: string | null;
};

type StripeCustomerDetails = {
    email: string;
    name: string | null;
    phone: string | null;
    address: StripeAddress | null;
};

// specific event object shapes
type StripeCheckoutSessionObject = {
    id: string;
    payment_status: "paid" | "unpaid" | "no_payment_required";
    status: "complete" | "expired" | "open";
    currency: string;
    amount_total: number;
    customer_details: StripeCustomerDetails;
    metadata: Record<string, string>;
    locale: string | null;
};

// future event types go here
// type StripeRefundObject = { ... }

// concrete event types
export type StripeCheckoutSessionEvent = StripeEvent<StripeCheckoutSessionObject>;
// export type StripeRefundEvent = StripeEvent<StripeRefundObject>;

// union of all supported events
export type StripeWebhookEvent = StripeCheckoutSessionEvent;