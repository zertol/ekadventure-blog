import { PostDetailsType } from "../../types/domain/post-details-type";
import { PostType } from "../../types/domain/post-type";
import { RelatedPostType } from "../../types/domain/related-post-type";

export interface IPostService {
    fetchAllPosts(): Promise<PostType[]>;
    fetchLatestPostsByCategories(slug: string): Promise<RelatedPostType>;
    fetchPostDetails(slug: string): Promise<PostDetailsType>;
    fetchLatestPosts(): Promise<PostType[]>;
}