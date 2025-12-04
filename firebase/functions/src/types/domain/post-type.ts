import { SanityDocument } from "@sanity/client";
import { ImageType } from "./image-type";
import { CategoryType } from "./category-type";

export type PostType = SanityDocument & {
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    featuredMedia: ImageType;
    categories: CategoryType[];
}