import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { PostDetailsType } from "../../../types/domain/post-details-type";
import { PostType } from "../../../types/domain/post-type";
import { RelatedPostType } from "../../../types/domain/related-post-type";
import { IPostService } from "../../interfaces/i-post-service";

export class PostService implements IPostService {
    constructor(private cmsClient: ICMSClient) { }

    async fetchAllPosts(locale: string): Promise<PostType[]> {
        const result = await this.cmsClient.getRepositories().post.fetchAllPosts(locale);
        return result;
    }

    async fetchLatestPostsByCategories(slug: string, locale: string): Promise<RelatedPostType> {
        const result = await this.cmsClient.getRepositories().post.fetchLatestPostsByCategories(slug, locale);
        return result;
    }

    async fetchPostDetails(slug: string, locale: string): Promise<PostDetailsType> {
        const result = await this.cmsClient.getRepositories().post.fetchPostDetails(slug, locale);
        return result;
    }

    async fetchLatestPosts(locale: string): Promise<PostType[]> {
        const result = await this.cmsClient.getRepositories().post.fetchLatestPosts(locale);
        return result;
    }
}