import { ImageType } from "./image-type";

export type PageType = {
    featuredMedia: ImageType;
    slug: string;
    title: string;
    order: number;
};