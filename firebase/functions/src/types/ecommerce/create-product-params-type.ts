import { ProductMetadataType } from "./product-metadata-type";

export type CreateProductParamsType = {
    name: string;
    description: string;
    active: boolean;
    images: string[];
    metadata: ProductMetadataType;
    default_price_data: {
        currency: string;
        unit_amount: number;
    };
}