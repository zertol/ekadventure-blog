import { CategoryType } from "./category-type";
import { CommentType } from "./comment-type";
import { ImageType } from "./image-type";
import { PortableTextBlock } from "@portabletext/types";
import { MetadataType } from "./metadata-type";

export type PostDetailsType = {
    _id: string;
    slug: { current: string };
    categories: CategoryType[];
    title: string;
    modifiedDate: string;
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