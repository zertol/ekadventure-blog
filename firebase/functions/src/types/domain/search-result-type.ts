import { PortableTextBlock } from "@portabletext/types";

export type SearchResultType = {
    [key: string]: any;
    _id: string;
    _type: string;
    title: string;
    name: string;
    slug: { current: string };
    _updatedAt: string;
    content: PortableTextBlock[];
}