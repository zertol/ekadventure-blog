export type PromotionSettingsType = {
    active: boolean;
    scope: "global" | "products";
    expiresAt?: number;
    productIds: string[];
    banner: {
        message: { en: string; fr: string };
    };
}