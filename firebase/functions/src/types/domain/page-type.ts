import { PortableTextBlock } from "@portabletext/types";
import { ImageType } from "./image-type";
import { MetadataType } from "./metadata-type";

export type PageType = {
    featuredMedia: ImageType;
    slug: string;
    title: string;
    order: number;
    metadata: MetadataType;
    content: PortableTextBlock[];
};