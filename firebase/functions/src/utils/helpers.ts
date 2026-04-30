import { BroadcastLocaleType, BroadcastType } from "../types/domain/broadcast-type";
import { ProductItemSource, ProductItemType, ProductMetadataType } from "../types/ecommerce/product-metadata-type";
import { Locale } from "./localizer";

// ECommerce
export function isValidProductMetadata(meta: Record<string, string>): meta is ProductMetadataType {
    return (
        typeof meta.item_key === "string" &&
        Object.values(ProductItemType).includes(meta.item_type as ProductItemType) &&
        Object.values(ProductItemSource).includes(meta.item_source as ProductItemSource)
    );
}

export function getContentType(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase();
    const map: Record<string, string> = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        pdf: "application/pdf",
        kml: "application/vnd.google-earth.kml+xml"
    };
    return map[ext ?? ""] ?? "application/octet-stream";
}

export function mapMetadata(metadata: Record<string, string>): ProductMetadataType {
    return {
        item_key: metadata.item_key,
        item_type: metadata.item_type as ProductItemType,
        item_display_name_en: metadata.item_display_name_en ?? null,
        item_display_name_fr: metadata.item_display_name_fr ?? null,
        item_source: metadata.item_source as ProductItemSource,
        item_source_id: metadata.item_source_id ?? null,
        item_description_en: metadata.item_description_en ?? null,
        item_description_fr: metadata.item_description_fr ?? null
    };
}

export function sanitizeMetadata(metadata: Record<string, string | null | undefined>): Record<string, string> {
    return Object.fromEntries(
        Object.entries(metadata)
            .filter(([_, value]) => value !== null && value !== undefined)
    ) as Record<string, string>;
}

export function localizeMetadata(metadata: ProductMetadataType, field: "item_display_name" | "item_description", locale?: string): string {
    locale = locale ?? "en";
    return metadata[`${field}_${locale}` as keyof ProductMetadataType] as string;
}

// Email
export function mapBroadcastDataBasedOnLocale(broadcast: BroadcastType, locale?: Locale): BroadcastLocaleType {
    locale = locale ?? "en";
    switch (locale) {
        case "en":
            return {
                articleBroadcastIntro: broadcast.articleBroadcastIntroEn,
                articleTitle: broadcast.articleTitleEn,
                articleUrl: broadcast.articleUrlEn
            };

        case "fr":
            return {
                articleBroadcastIntro: broadcast.articleBroadcastIntroFr,
                articleTitle: broadcast.articleTitleFr,
                articleUrl: broadcast.articleUrlFr
            };

        default:
            return {
                articleBroadcastIntro: broadcast.articleBroadcastIntroEn,
                articleTitle: broadcast.articleTitleEn,
                articleUrl: broadcast.articleUrlEn
            };
    }
}