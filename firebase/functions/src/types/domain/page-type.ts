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
    updatedAt: string;
    heroSection: {
        backgroundImage: ImageType;
        buttons: {
            url: string;
            text: string;
            type: ButtonType;
            style: ButtonStyle;
        }[];
        heading: string;
        description: PortableTextBlock[];
    }
}

export enum ButtonType {
    Link = "link",
    Normal = "normal"
}

export enum ButtonStyle {
    Primary = "primary",
    Secondary = "secondary"
}