import { PortableTextBlock } from "@portabletext/react";

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
    };
};

export enum ButtonType {
    Link = "link",
    Normal = "normal"
};

export enum ButtonStyle {
    Primary = "primary",
    Secondary = "secondary"
};