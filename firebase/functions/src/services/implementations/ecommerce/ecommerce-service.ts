import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { CheckoutSessionParamsType } from "../../../types/ecommerce/checkout-session-params-type";
import { ProductDownloadLinkType } from "../../../types/ecommerce/product-download-link-type";
import { ProductsResponseType } from "../../../types/ecommerce/product-response-type";
import { ProductType } from "../../../types/ecommerce/product-type";
import * as Helpers from "../../../utils/helpers";
import { IEcommerceService } from "../../interfaces/i-ecommerce-service";
import Stripe from "stripe";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Constants } from "../../../Constants";
import { URLType } from "../../../types/domain/url-type";

type StripeProduct = Awaited<ReturnType<typeof Stripe.prototype.products.list>>["data"][number];

export class EcommerceService implements IEcommerceService {
    private stripe: Stripe.Stripe;

    initStripe() {
        const stripeKey = process.env.STRIPE_SECRET_KEY_LOCAL;

        if (!stripeKey) {
            throw new Error("Stripe Key is not defined check your variables");
        }

        this.stripe = new Stripe(stripeKey);
    }

    async getProducts(): Promise<ProductsResponseType> {
        const products = await this.stripe.products.list({
            limit: 3,
            active: true,
            expand: ["data.default_price"]
        });

        const productsResponse: ProductsResponseType = {
            data: products.data.map((prod) => {
                return mapStripeProduct(prod);
            }),
            has_more: products.has_more
        };

        return productsResponse;
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
                            description: Helpers.localizeMetadata(params.metadata, "item_description", params.locale)
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

    async generateProductDownloadLink(itemKey: string, expiresIn?: number): Promise<ProductDownloadLinkType> {
        const client = new S3Client({
            endpoint: process.env.R2_ENDPOINT,
            region: "auto",
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
            }
        });

        const bucketName = "ekadventure-images"; // Your bucket name
        const objectKey = `digital-photos/${itemKey}`; // Your file path
        const fileName = itemKey.split("/").pop();

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
            ResponseContentDisposition: `attachment; filename=${fileName}`,
            ResponseContentType: Helpers.getContentType(fileName ?? "")
        });

        const url = await getSignedUrl(client, command, { expiresIn: expiresIn ?? Constants.DOWNLOAD_LINK_EXPIRES_IN });

        if (!url) {
            throw new Error("Downloadable URL is null");
        }

        return { url: encodeURIComponent(url) };
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
        description: product.description ?? "",
        images: product.images,
        livemode: product.livemode,
        metadata: Helpers.mapMetadata(product.metadata),
        name: product.name,
        statement_descriptor: product.statement_descriptor ?? null,
        tax_code: typeof product.tax_code === "string" ? product.tax_code : product.tax_code?.id ?? null,
        unit_label: product.unit_label ?? null,
        updated: product.updated,
        url: product.url ?? null
    };
}