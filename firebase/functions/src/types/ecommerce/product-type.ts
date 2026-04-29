import { ProductMetadataType } from "./product-metadata-type";

export type ProductType = {
    id: string;
    object: string;
    active: boolean;
    created: number;
    default_price: string | PriceType | null;
    description: string;
    images: string[];
    livemode: boolean;
    metadata: ProductMetadataType;
    name: string;
    statement_descriptor: string | null;
    tax_code: string | null;
    unit_label: string | null;
    updated: number;
    url: string | null;
}

export type PriceType = {
    id: string | null;
    unit_amount: number;
    currency: string | null;
}