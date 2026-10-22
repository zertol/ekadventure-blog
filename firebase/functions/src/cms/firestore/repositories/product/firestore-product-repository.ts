import { ProductDownloadTokenType } from "../../../../types/ecommerce/product-download-token-type";
import { ProductMetadataType } from "../../../../types/ecommerce/product-metadata-type";
import { IProductRepository } from "../../../shared/interfaces/i-product-repository";
import { ekadventureBlogDb } from "../../firestore-db";

export class FirestoreProductRepository implements IProductRepository {
    async addProductDownloadToken(productDownloadToken: ProductDownloadTokenType, token: string): Promise<void> {
        try {
            await ekadventureBlogDb.collection("product_download_tokens").doc(token).set(productDownloadToken);
        } catch (err) {
            throw new Error(`Failed to create download token: ${err}`);
        }
    }
}