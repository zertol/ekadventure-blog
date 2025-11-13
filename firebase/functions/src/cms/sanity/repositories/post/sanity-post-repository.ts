import { Constants } from "../../../../Constants";
import { PostDetailsType } from "../../../../types/domain/post-details-type";
import { PostType } from "../../../../types/domain/post-type";
import { RelatedPostType } from "../../../../types/domain/related-post-type";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityQueryResult } from "../../../../types/sanity/sanity-query-result";
import { formatString } from "../../../../utils/extensions";
import { IPostRepository } from "../../../shared/interfaces/i-post-repository";
import { SharedRepository } from "../../../shared/shared-repository";
import { LATEST_POSTS_BY_CATEGORIES_QUERY, LATEST_POSTS_QUERY, POST_BY_SLUG_QUERY, POSTS_QUERY } from "../../sanity-queries";

export class SanityPostRepository extends SharedRepository implements IPostRepository {
    async fetchAllPosts(): Promise<PostType[]> {
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(POSTS_QUERY)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PostType[]>) => data.result);
    }

    async fetchLatestPostsByCategories(slug: string): Promise<RelatedPostType> {
        const finalQuery = LATEST_POSTS_BY_CATEGORIES_QUERY.replace(/\$slug/g, "'" + slug + "'");

        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<RelatedPostType>) => data.result);
    }

    async fetchPostDetails(slug: string): Promise<PostDetailsType> {
        const finalQuery = POST_BY_SLUG_QUERY.replace(/\$slug/g, "'" + slug + "'");

        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PostDetailsType>) => data.result);
    }

    async fetchLatestPosts(): Promise<PostType[]> {
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(LATEST_POSTS_QUERY)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PostType[]>) => data.result);
    }
}