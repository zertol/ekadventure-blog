export type PromotionSettingsType = {
    active: boolean;
    allow_substack_promotion_codes: boolean;
    scope: "global" | "products";
    expiresAt?: number;
    productIds: string[];
    banner: {
        message: { en: string; fr: string };
    };
}