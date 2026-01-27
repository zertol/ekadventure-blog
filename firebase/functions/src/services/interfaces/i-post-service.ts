import { PostDetailsType } from "../../types/domain/post-details-type";
import { PostType } from "../../types/domain/post-type";
import { RelatedPostType } from "../../types/domain/related-post-type";

export interface IPostService {
    fetchAllPosts(locale: string): Promise<PostType[]>;
    fetchLatestPostsByCategories(slug: string, locale: string): Promise<RelatedPostType>;
    fetchPostDetails(slug: string, locale: string): Promise<PostDetailsType>;
    fetchLatestPosts(locale: string): Promise<PostType[]>;
}