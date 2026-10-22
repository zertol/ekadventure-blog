import { ProductDownloadTokenType } from "../../../types/ecommerce/product-download-token-type";

export interface IProductRepository {
    addProductDownloadToken(productDownloadToken: ProductDownloadTokenType, token: string): Promise<void>;
}