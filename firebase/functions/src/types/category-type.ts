import { SanityDocument } from "@sanity/client";

export type CategoryType = SanityDocument & {
    name: string;
    slug: { current: string };
    imageUrl: string;
    postCount: string;
};