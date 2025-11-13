import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { PostDetailsType } from "../../../types/domain/post-details-type";
import { PostType } from "../../../types/domain/post-type";
import { RelatedPostType } from "../../../types/domain/related-post-type";
import { IPostService } from "../../interfaces/i-post-service";

export class PostService implements IPostService {
    constructor(private cmsClient: ICMSClient) { }

    async fetchAllPosts(): Promise<PostType[]> {
        const result = await this.cmsClient.getRepositories().post.fetchAllPosts();
        return result;
    }

    async fetchLatestPostsByCategories(slug: string): Promise<RelatedPostType> {
        const result = await this.cmsClient.getRepositories().post.fetchLatestPostsByCategories(slug);
        return result;
    }

    async fetchPostDetails(slug: string): Promise<PostDetailsType> {
        const result = await this.cmsClient.getRepositories().post.fetchPostDetails(slug);
        return result;
    }

    async fetchLatestPosts(): Promise<PostType[]> {
        const result = await this.cmsClient.getRepositories().post.fetchLatestPosts();
        return result;
    }
}