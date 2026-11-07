import { PortableTextBlock } from "@portabletext/types";
import { ImageType } from "./image-type";

export type SearchResultType = {
    [key: string]: any;
    _id: string;
    _type: string;
    title: string;
    name: string;
    slug: { current: string };
    _updatedAt: string;
    content: PortableTextBlock[];
    featuredMedia: ImageType;
}

export type SearchLocaleKeysResultType = {
    title: Record<string, string>;
}