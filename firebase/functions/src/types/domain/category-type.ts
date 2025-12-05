import { ImageType } from "./image-type";

export type CategoryType = {
    _id: string
    name: string;
    slug: string;
    featuredMedia: ImageType;
    headerMedia: ImageType;
    postCount: string;
};