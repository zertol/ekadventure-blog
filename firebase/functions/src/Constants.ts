export class Constants {
    public static readonly FIREBASE_CORS_LIST = ["https://kd-stu.sanity.studio", "http://localhost:3000", "https://stripe.com"];

    public static readonly SANITY_BASE_URL = "https://{0}.api.sanity.io/v2025-10-28/data";

    public static readonly S3_BUCKET_NAME = "ekadventure_images";
    public static readonly S3_DIGITAL_PHOTOS_DIR = "digital-photos";

    // Ecommerce
    public static readonly DOWNLOAD_LINK_EXPIRES_IN_DAYS = 3;
    public static readonly DOWNLOAD_LINK_EXPIRES_IN_SECONDS = this.DOWNLOAD_LINK_EXPIRES_IN_DAYS * 24 * 60 * 60; // 3 days

    // Resend Email
    public static readonly RESEND_HELLO_EMAIL_FROM = "Elie - Ekadventure <hello@ekadventure.com>";
    public static readonly RESEND_BROADCAST_EMAIL_FROM = "Ekadventure Blog <blog@ekadventure.com>";
    public static readonly RESEND_PRODUCT_EMAIL_FROM = "Ekadventure Shop <shop@ekadventure.com>";
    public static readonly RESEND_EMAIL_REPLY_TO = "e.kadvnture@gmail.com";
}