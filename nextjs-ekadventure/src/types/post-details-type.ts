import { PortableTextBlock } from "@portabletext/react";

export type PostDetailsType = {
    _id: string;
    slug: { current: string };
    categories: CategoryType[];
    title: string;
    modifiedDate: string;
    content: PortableTextBlock[];
    excerpt: PortableTextBlock[];
    stats: Array<Record<string, string> & {
        label_en: string;
        label_fr: string;
        value_en: string;
        value_fr: string;
    }>;
    statsTitle: Record<string, string> & {
        title_en: string;
        title_fr: string;
        name_en: string;
        name_fr: string;
    };
    googleMapsHowTo: PortableTextBlock[];
    googleMapsHowToTitle: string;
    youtubeEmbedUrl: any;
    whereToStay: PortableTextBlock[];
    whereToEat: PortableTextBlock[];
    hikingPass: PortableTextBlock[];
    otherHikes: PortableTextBlock[];
    otherAttractions: PortableTextBlock[];
    capturedMoments: ImageType[];
    featuredMedia: ImageType;
    comments: CommentType[];
    metadata: MetadataType;
};