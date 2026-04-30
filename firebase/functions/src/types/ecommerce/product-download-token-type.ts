import { Locale } from "../../utils/localizer";
import { ProductMetadataType } from "./product-metadata-type";

export type ProductDownloadTokenType = {
    metadata: ProductMetadataType;
    customerDetails: Record<string, any>;
    locale: Locale;
    expiresAt: number;
    createdAt: number;
    used: boolean;
}