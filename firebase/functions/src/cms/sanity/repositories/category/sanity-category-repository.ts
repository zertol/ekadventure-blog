import { Constants } from "../../../../Constants";
import { CategoryType } from "../../../../types/domain/category-type";
import { PostType } from "../../../../types/domain/post-type";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityQueryResult } from "../../../../types/sanity/sanity-query-result";
import { formatString } from "../../../../utils/extensions";
import { ICategoryRepository } from "../../../shared/interfaces/i-category-repository";
import { CATEGORIES_QUERY, POSTS_BY_CATEGORY_QUERY } from "../../sanity-queries";

export class SanityCategoryRepository implements ICategoryRepository {
    async fetchAllCategories(): Promise<CategoryType[]> {
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(CATEGORIES_QUERY)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<CategoryType[]>) => data.result);
    }

    async fetchCategoryPosts(categoryName: string): Promise<PostType[]> {
        const finalQuery = POSTS_BY_CATEGORY_QUERY.replace(/\$categoryname/g, "'" + categoryName + "'");
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PostType[]>) => data.result);
    }
}