import { SanityDocument } from "@sanity/client";
import { ImageType } from "./image-type";

export type CategoryType = SanityDocument & {
    name: string;
    slug: string;
    featuredMedia: ImageType;
    headerMedia: ImageType;
    postCount: string;
};