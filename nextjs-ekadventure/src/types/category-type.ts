import { SanityDocument } from "next-sanity";

export type CategoryType = SanityDocument & {
    name: string;
    slug: { current: string };
    imageUrl: string;
    postCount: string;
};