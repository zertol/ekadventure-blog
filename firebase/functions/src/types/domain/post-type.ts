import { ImageType } from "./image-type";
import { CategoryType } from "./category-type";

export type PostType = {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    featuredMedia: ImageType;
    categories: CategoryType[];
}