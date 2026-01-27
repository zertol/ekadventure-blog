import { PortableTextBlock } from "@portabletext/react";

export type PageType = {
    featuredMedia: ImageType;
    slug: string;
    title: string;
    order: number;
    metadata: MetadataType;
    content: PortableTextBlock[];
    updatedAt: string;
};