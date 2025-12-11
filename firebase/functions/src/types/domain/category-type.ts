import { ImageType } from "./image-type";
import { MetadataType } from "./metadata-type";

export type CategoryType = {
    _id: string
    name: string;
    slug: string;
    featuredMedia: ImageType;
    headerMedia: ImageType;
    postCount: string;
    metadata: MetadataType;
};