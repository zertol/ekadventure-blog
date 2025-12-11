import { PortableTextBlock } from "next-sanity";

export type PostDetailsType = {
    _id: string;
    slug: { current: string };
    categories: CategoryType[];
    title: string;
    modifiedDate: Date;
    content: PortableTextBlock[];
    excerpt: PortableTextBlock[];
    stats: Array<{
        label_en: string;
        label_fr: string;
        value_en: string;
        value_fr: string;
    }>;
    statsTitle: {
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