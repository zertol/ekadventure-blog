import { ProductType } from "./product-type";

export type ProductsResponseType = {
    has_more: boolean;
    data: ProductType[];
    next_page: string | null;
}