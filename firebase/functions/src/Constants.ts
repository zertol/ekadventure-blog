export class Constants {
    public static readonly FIREBASE_CORS_LIST = ["https://kd-stu.sanity.studio", "http://localhost:3000", "https://ekadventure.com", "http://127.0.0.1:3000", "kd"];

    public static readonly SANITY_BASE_URL = "https://{0}.api.sanity.io/v2025-10-28/data";

    public static readonly TOKENS = {
        IPageRepository: Symbol("IPageRepository"),
    };
}