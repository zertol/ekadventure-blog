import { SanityDocument } from "next-sanity";

export type CategoryType = SanityDocument & {
    name: string;
    slug: string;
    featuredMedia: ImageType;
    headerMedia: ImageType;
    postCount: string;
};