import { SanityDocument } from "@sanity/client";
import { CommentType } from "./comment-type";

export type PostDetailsType = SanityDocument & {
    categories: [];
    title: string;
    modifiedDate: Date;
    content: any;
    googleMapsHowTo: any;
    googleMapsHowToTitle: any;
    youtubeEmbedUrl: any;
    whereToStay: any;
    whereToEat: any;
    capturedMoments: any;
    imageUrl: any;
    comments: CommentType[];
};