import { SanityDocument } from "@sanity/client";
import { CommentType } from "./comment-type";

export type PostDetailsType = SanityDocument & {
    categories: [];
    title: string;
    modifiedDate: Date;
    content: any;
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
    googleMapsHowTo: any;
    googleMapsHowToTitle: any;
    youtubeEmbedUrl: any;
    whereToStay: any;
    whereToEat: any;
    hikingPass: any;
    otherHikes: any;
    otherAttractions: any;
    capturedMoments: any;
    imageUrl: any;
    comments: CommentType[];
};