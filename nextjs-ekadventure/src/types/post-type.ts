import { SanityDocument } from "next-sanity";

export type PostType = SanityDocument & {
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    imageUrl: string;
    categories: Array<{
        name: string;
        slug: string;
    }>;
}