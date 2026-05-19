import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { CheckoutSessionParamsType } from "../../../types/ecommerce/checkout-session-params-type";
import { ProductsResponseType } from "../../../types/ecommerce/product-response-type";
import { ProductType } from "../../../types/ecommerce/product-type";
import * as Helpers from "../../../utils/helpers";
import { IEcommerceService } from "../../interfaces/i-ecommerce-service";
import Stripe from "stripe";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Constants } from "../../../Constants";
import { URLType } from "../../../types/domain/url-type";
import { ProductDownloadTokenType } from "../../../types/ecommerce/product-download-token-type";
import { ekadventureBlogDb } from "../../../cms/firestore/firestore-db";
import { CreateProductParamsType } from "../../../types/ecommerce/create-product-params-type";

type StripeProduct = Awaited<ReturnType<typeof Stripe.prototype.products.list>>["data"][number];

export class EcommerceService implements IEcommerceService {
    private stripe: Stripe.Stripe;

    initStripe() {
        const stripeKey = process.env.STRIPE_SECRET_KEY;

        if (!stripeKey) {
            throw new Error("Stripe Key is not defined check your variables");
        }

        this.stripe = new Stripe(stripeKey);
    }

    async getTotalProducts(): Promise<{ count: number }> {
        let products = await this.stripe.products.list({ active: true, limit: 100 });
        let count = products.data.length;

        while (products.has_more) {
            const lastId = products.data[products.data.length - 1].id;

            products = await this.stripe.products.list({ active: true, limit: 100, starting_after: lastId });
            count += products.data.length;
        }

        return { count };
    }

    async createProduct(product: CreateProductParamsType): Promise<ProductType> {
        try {
            const newProduct = await this.stripe.products.create(product);
            return mapStripeProduct(newProduct);
        } catch (error) {
            throw new Error(`Unable to create new product: ${JSON.stringify(product)}`);
        }
    }

    async updateProductImages(id: string, images: string[]): Promise<ProductType> {
        if (!id) {
            throw new Error("Product Id is required");
        }

        if (!images || images.length == 0) {
            throw new Error("At least one image is required");
        }

        try {
            const product = await this.stripe.products.update(id, { images });
            return mapStripeProduct(product);
        } catch (error) {
            throw new Error(`Unable to update product: ${id} Reason: ${error}`);
        }
    }

    async getLatestProducts(lastProductId?: string): Promise<ProductsResponseType> {
        const products = await this.stripe.products.list({
            limit: 3,
            active: true,
            expand: ["data.default_price"],
            ...(lastProductId && {
                starting_after: lastProductId
            })
        });

        const productsResponse: ProductsResponseType = {
            data: products.data.map((prod) => {
                return mapStripeProduct(prod);
            }),
            has_more: products.has_more
        };

        return productsResponse;
    }

    async getAllProducts(): Promise<ProductType[]> {
        let products = await this.stripe.products.list({ active: true, limit: 100, expand: ["data.default_price"] });

        const allProducts = products.data.map((prod) => {
            return mapStripeProduct(prod);
        });

        while (products.has_more) {
            const lastId = products.data[products.data.length - 1].id;

            products = await this.stripe.products.list({ active: true, limit: 100, starting_after: lastId, expand: ["data.default_price"] });
            products.data.map((prod) => {
                allProducts.push(mapStripeProduct(prod));
            });
        }

        return allProducts;
    }

    async getProductById(id: string): Promise<ProductType> {
        if (!id) {
            throw new Error("Product Id is required");
        }
        const product = await this.stripe.products.retrieve(id, { expand: ["default_price"] });
        return mapStripeProduct(product);
    }

    async createCheckoutSession(params: CheckoutSessionParamsType): Promise<URLType> {
        if (!params.successUrl || !params.cancelUrl) {
            throw new Error("Success and Cancel URLs are required");
        }

        if (!Helpers.isValidProductMetadata(params.metadata)) {
            throw new Error(`Invalid metadata: ${JSON.stringify(params.metadata)}`);
        }

        const url = new URL(params.successUrl);
        const separator = url.search ? "&" : "?";
        const successUrl = `${url.toString()}${separator}session_id={CHECKOUT_SESSION_ID}`;

        const price = await this.stripe.prices.retrieve(params.priceId, {
            expand: ["product"]
        });

        const product = price.product as any;

        const session = await this.stripe.checkout.sessions.create({
            mode: "payment",
            billing_address_collection: "auto",
            line_items: [
                {
                    quantity: params.quantity,
                    ...(params.isQuantityAdjustable && {
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                            maximum: params.maximumQuantity ?? 10
                        }
                    }),
                    price_data: {
                        currency: price.currency,
                        unit_amount: price.unit_amount,
                        product_data: {
                            name: Helpers.localizeMetadata(params.metadata, "item_display_name", params.locale),
                            images: product.images,
                            description: Helpers.localizeMetadata(params.metadata, "item_description", params.locale).split("|")[0]
                        }
                    }
                }
            ],
            success_url: successUrl,
            cancel_url: `${params.cancelUrl}`,
            metadata: Helpers.sanitizeMetadata(params.metadata),
            locale: (params.locale ?? "en")
        });

        if (!session.url) {
            throw new Error("Stripe session URL is null");
        }

        return { url: session.url };
    }

    async generateProductDownloadLink(token: string): Promise<URLType> {
        try {
            if (!token) {
                throw new Error("Token should have a value");
            }

            const tokenRef = ekadventureBlogDb
                .collection("product_download_tokens")
                .doc(token);

            const tokenDoc = await tokenRef.get();

            if (!tokenDoc.exists) {
                console.log("Download token not found");
                throw new Error("Download token not found");
            }

            const tokenData = tokenDoc.data() as ProductDownloadTokenType;

            if (tokenData.used) {
                console.log("Download token already used");
                throw new Error("Download token already used");
            }

            if (tokenData.expiresAt < Date.now()) {
                console.log("Download token expired");
                throw new Error("Download token expired");
            }

            const client = new S3Client({
                endpoint: process.env.R2_ENDPOINT,
                region: "auto",
                credentials: {
                    accessKeyId: process.env.R2_ACCESS_KEY_ID,
                    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
                }
            });

            const bucketName = "ekadventure-images"; // Your bucket name
            const objectKey = `digital-photos/${tokenData.metadata.item_key}`; // Your file path
            const fileName = tokenData.metadata.item_key.split("/").pop();

            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
                ResponseContentDisposition: `attachment; filename="${fileName}"`,
                ResponseContentType: Helpers.getContentType(fileName ?? ""),
                ResponseCacheControl: "no-store, no-cache, must-revalidate, proxy-revalidate"
            });

            const url = await getSignedUrl(client, command, { expiresIn: Math.max(0, Math.floor((tokenData.expiresAt - Date.now()) / 1000)) ?? Constants.DOWNLOAD_LINK_EXPIRES_IN_SECONDS });

            if (!url) {
                console.log(`URL is Empty: ${JSON.stringify(tokenData.metadata)}`);
                throw new Error(`URL is Empty: ${JSON.stringify(tokenData.metadata)}`);
            }

            // mark as used after generating the link
            await tokenRef.update({ used: true });

            return { url: encodeURIComponent(url) };
        } catch (err) {
            console.log(`Failed to retrieve download token: ${err}`);
            throw new Error(`Failed to retrieve download token: ${err}`);
        }
    }

    async verifyProcessedTokenFromSession(sessionId: string): Promise<{ processed: boolean; }> {
        try {
            if (!sessionId) {
                throw new Error("Session ID should have a value");
            }

            const sessionRef = ekadventureBlogDb
                .collection("product_download_tokens")
                .where("sessionId", "==", sessionId)
                .limit(1);

            const sessionDoc = await sessionRef.get();

            if (sessionDoc.empty) {
                console.log("Download token not found from Session ID");
                throw new Error("Download token not found from Session ID");
            }

            const tokenData = sessionDoc.docs[0].data() as ProductDownloadTokenType;

            if (tokenData.used) {
                return { processed: true };
            }
        } catch (err) {
            console.log(`Failed to retrieve download token from Session ID: ${err}`);
            throw new Error(`Failed to retrieve download token from Session ID: ${err}`);
        }

        return { processed: false };
    }
}

/**
 * Helper function to map Stripe product into our own ProductType.
 * It doesn't reside in Helpers.ts because of the need to infer from "stripe" the type of Product since
 * "stripe" doesn't expose it. (check beginning of service code)
 * @param {StripeProduct} product
 * @return {ProductType}
 */
function mapStripeProduct(product: StripeProduct): ProductType {
    if (!Helpers.isValidProductMetadata(product.metadata)) {
        throw new Error(`Invalid metadata: ${JSON.stringify(product.metadata)}`);
    }

    return {
        id: product.id,
        object: product.object,
        active: product.active,
        created: product.created,
        default_price: typeof product.default_price === "string" ? product.default_price : {
            id: product.default_price?.id ?? null,
            unit_amount: product.default_price?.unit_amount ?? 0,
            currency: product.default_price?.currency ?? null
        },
        description: {
            en: product.metadata.item_description_en ?? null,
            fr: product.metadata.item_description_fr ?? null
        },
        images: product.images,
        livemode: product.livemode,
        metadata: Helpers.mapMetadata(product.metadata),
        name: {
            en: product.metadata.item_display_name_en ?? null,
            fr: product.metadata.item_display_name_fr ?? null
        },
        statement_descriptor: product.statement_descriptor ?? null,
        tax_code: typeof product.tax_code === "string" ? product.tax_code : product.tax_code?.id ?? null,
        unit_label: product.unit_label ?? null,
        updated: product.updated,
        url: product.url ?? null
    };
}