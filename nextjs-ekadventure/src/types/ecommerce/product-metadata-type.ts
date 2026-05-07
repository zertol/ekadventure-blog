export type ProductMetadataType = {
    item_key: string;
    item_type: ProductItemType;
    item_display_name_en: string | null;
    item_display_name_fr: string | null;
    item_source: ProductItemSource;
    item_source_id: string | null; // article, post, or video title/name
    item_description_en: string | null;
    item_description_fr: string | null;
}

export enum ProductItemType {
    Photo = "photo",
    PDF = "pdf"
}

export enum ProductItemSource {
    YouTube = "YouTube",
    Facebook = "Facebook",
    Instagram = "Instagram",
    Blog = "Blog"
}